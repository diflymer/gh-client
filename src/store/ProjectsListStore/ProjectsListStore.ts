import axios from "axios";
import { ILocalStore } from "../../utils/useLocalStore";
import { Meta } from "../../utils/meta";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";
import { normalizeProject, ProjectApi, ProjectModel } from '../models/gitHub'
import rootStore from "../RootStore";
import { ParsedQs } from "qs";

export type PrivateFields = '_projects' | '_meta' | '_currentPage' | '_lastPage' | '_search';

export default class ProjectsListStore implements ILocalStore {

    private readonly _perPage: number = 9;

    private _projects: ProjectModel[] = [];
    private _meta: Meta = Meta.initial;

    //Пагинация
    private _currentPage: number = rootStore.query.getParam('page') ? Number(rootStore.query.getParam('page')) : 1;
    private _lastPage: number = 1;

    //Поиск
    private _search: string | ParsedQs | string[] | ParsedQs[] = rootStore.query.getParam('search') === undefined ? '' : rootStore.query.getParam('search')!;

    constructor() {
        makeObservable<ProjectsListStore, PrivateFields>(this,
            {
                _projects: observable,
                _meta: observable,
                _currentPage: observable,
                _lastPage: observable,
                _search: observable,
                projects: computed,
                meta: computed,
                currentPage: computed,
                lastPage: computed,
                search: computed,
                getRepos: action,
                onChangeSearch: action,
                onSearchButtonClick: action
            })
    }


    get projects(): ProjectModel[] {
        return this._projects;
    }

    get meta(): Meta {
        return this._meta;
    }

    get currentPage(): number {
        return this._currentPage;
    }

    get lastPage(): number {
        return this._lastPage;
    }

    get search(): string | ParsedQs | string[] | ParsedQs[] {
        return this._search;
    }

    onChangeSearch(v: string) {
        this._search = v;
        rootStore.query.setParam('search', v);
    }

    onSearchButtonClick() {
        rootStore.query.setParam('page', '1');
        // this.getRepos();
    }

    async getRepos() {

        this._meta = Meta.loading;

        try {

            //Проверка параметров
            const type = rootStore.query.getParam('type') === undefined ? 'all' : rootStore.query.getParam('type');
            const org = this._search === '' ? 'ktsstudio' : this._search;

            const response = await axios<ProjectApi[]>({
                method: 'get',
                // url: `https://api.github.com/orgs/ktsstudio/repos`,
                url: `https://api.github.com/orgs/${org}/repos?per_page=${this._perPage}&page=${this._currentPage}&type=${type}`
            });

            runInAction(() => {

                //Обработка страниц для пагинации
                const linkHeader = response.headers['link'];
                if (linkHeader) {
                    // Разбиваем Link заголовок на части
                    const links = linkHeader.split(', ');
                    // Находим ссылку с rel="last"
                    const lastPageLink = links.find((link: any) => link.includes('rel="last"'));
                    if (lastPageLink) {
                        // Извлекаем номер последней страницы из URL
                        const match = lastPageLink.match(/&page=(\d+)/);
                        if (match) {
                            this._lastPage = parseInt(match[1], 10);  // Возвращаем номер последней страницы как число
                        }
                    }
                } else {
                    this._lastPage = 1;
                }

                this._projects = [...response.data.map(normalizeProject)]
                this._meta = Meta.success;
            });

        } catch (e) {
            console.error(e);

            runInAction(() => {
                this._meta = Meta.error;
                this._projects = [];
                this._currentPage = 1;
                this._lastPage = 1;
            })
        }

    }

    destroy(): void {

        this._qrReaction();
    }

    private readonly _qrReaction: IReactionDisposer = reaction(
        () => {
            return rootStore.query.getParam('page');
        },
        (page) => {

            if (typeof page === 'string') {
                this._currentPage = parseInt(page, 10) || 1;
                this.getRepos();
            }

        }
    )
}