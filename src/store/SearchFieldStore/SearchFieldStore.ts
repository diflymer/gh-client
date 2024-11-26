import { ILocalStore } from "../../utils/useLocalStore";
import { Meta } from "../../utils/meta";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import rootStore from "../RootStore";
import { ParsedQs } from "qs";
import apiClient from "config/axiosConfig";
import debounce from 'lodash.debounce';

export type PrivateFields = '_meta' | '_search' | '_orgs' | '_orgsOpened';

export default class SearchFieldStore implements ILocalStore {

    private _orgsCount = 5;

    private debouncedSearch: () => void;

    private _orgs: string[] = [];
    private _meta: Meta = Meta.initial;

    private _orgsOpened: Boolean = true;

    //Поиск
    private _search: string | ParsedQs | string[] | ParsedQs[] = rootStore.query.getParam('search') === undefined ? '' : rootStore.query.getParam('search')!;

    constructor() {
        makeObservable<SearchFieldStore, PrivateFields>(this,
            {
                _meta: observable,
                _search: observable,
                _orgs: observable,
                _orgsOpened: observable,
                meta: computed,
                orgs: computed,
                search: computed,
                orgsOpened: computed,
                getOrgs: action,
                onChangeSearch: action,
                onSearch: action,
                onChoose: action,
                setOrgsOpened: action
            })
        this.debouncedSearch = debounce(this.onSearch.bind(this), 1000);
    }


    get orgs(): string[] {
        return this._orgs;
    }

    get meta(): Meta {
        return this._meta;
    }

    get search(): string | ParsedQs | string[] | ParsedQs[] {
        return this._search;
    }

    get orgsOpened(): Boolean {
        return this._orgsOpened;
    }

    setOrgsOpened(v: Boolean) {
        this._orgsOpened = v;
    }

    onChoose(org: string) {
        runInAction(() => {
            this._orgsOpened = false;
            this._search = org;
        })

        rootStore.query.setParam('search', org);
        this.debouncedSearch();
    }

    onChangeSearch(v: string) {
        this._search = v;
        rootStore.query.setParam('search', v);
        this.debouncedSearch();
    }

    onSearch() {
        console.log('searching');
        this.getOrgs();
    }

    async getOrgs() {

        this._meta = Meta.loading;

        try {

            const response = await apiClient({
                method: 'get',
                url: `https://api.github.com/search/users?q=type:org+${this._search}+in:login&per_page=${this._orgsCount}`,
            });

            runInAction(() => {

                if (response.data.total_count !== 0) {
                    this._orgs = response.data.items.map((item: any) => item.login);
                    console.log(this._orgs);
                    this._meta = Meta.success;
                } else {
                    this._meta = Meta.error;
                    this._orgs = [];
                }
            })

        } catch (e) {
            console.error(e);
            this._meta = Meta.error;
            this._orgs = [];
        }
    }

    destroy(): void {

    }

}