import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { RepoModel, RepoApi, normalizeRepo } from "store/models/gitHub";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";


type PrivateFields = '_repo' | '_meta'
export default class RepoStore implements ILocalStore {

    private _repo: RepoModel | {} = {}
    private _meta: Meta = Meta.initial;

    get repo(): RepoModel {
        return this._repo as RepoModel;
    }

    get meta(): Meta {
        return this._meta;
    }

    constructor() {
        makeObservable<RepoStore, PrivateFields>(this, {
            _repo: observable,
            _meta: observable,
            repo: computed,
            meta: computed,
            getRepo: action,
        })
    }

    async getRepo(owner: string, repo: string) {

        try {
            const response = await axios<RepoApi>({
                method: 'get',
                url: `https://api.github.com/repos/${owner}/${repo}`,
            });

            runInAction(() => {
                this._repo = normalizeRepo(response.data);
                this._meta = Meta.success;
            })


        } catch (e) {

            console.error(e);

            runInAction(() => {
                this._repo = {}
                this._meta = Meta.error;
            })
        }

    }

    destroy(): void {

    }
}