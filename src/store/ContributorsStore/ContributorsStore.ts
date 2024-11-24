
import apiClient from "config/axiosConfig";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { ContributorModel, ContributorApi, normalizeContributors } from "store/models/gitHub";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";


type PrivateFields = '_conts' | '_meta'
export default class ContributorsStore implements ILocalStore {

    private _conts: ContributorModel[] = [];
    private _meta: Meta = Meta.initial;

    get conts(): ContributorModel[] {
        return this._conts
    }

    get meta(): Meta {
        return this._meta;
    }

    constructor() {
        makeObservable<ContributorsStore, PrivateFields>(this, {
            _conts: observable,
            _meta: observable,
            conts: computed,
            meta: computed,
            getContributors: action
        })
    }

    async getContributors(contributorsUrl: string): Promise<void> {

        this._meta = Meta.loading;

        try {
            const response = await apiClient<ContributorApi[]>({
                method: 'get',
                url: contributorsUrl
            });


            runInAction(() => {
                this._conts = response.data.map(normalizeContributors);
                this._meta = Meta.success;
            })


        } catch (e) {

            console.error(e);

            runInAction(() => {
                this._conts = [];
                this._meta = Meta.error;
            })
        }

    }

    destroy(): void {

    }
}