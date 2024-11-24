import apiClient from "config/axiosConfig";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { RepoModel, RepoApi, normalizeRepo, changeRepoToProject, ProjectModel } from "store/models/gitHub";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = '_repo' | '_meta'
export default class RepoStore implements ILocalStore {

    private _repo: RepoModel | {} = {};
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
            const response = await apiClient<RepoApi>({
                method: 'get',
                url: `https://api.github.com/repos/${owner}/${repo}`,
            });

            runInAction(() => {
                this._repo = normalizeRepo(response.data);
                this._meta = Meta.success;
            })

            //Сохранение посещения репозитория
            let lastSeenRepos: ProjectModel[] = [];

            if (localStorage.getItem('lastSeenRepos')) {

                lastSeenRepos = JSON.parse(localStorage.getItem('lastSeenRepos')!);

                if (lastSeenRepos.find(item => item.id === (this._repo as ProjectModel).id)) {
                    return
                }

                if (lastSeenRepos!.length === 5) {
                    lastSeenRepos.shift();
                }

            }

            lastSeenRepos.push(changeRepoToProject(this._repo as RepoModel));

            localStorage.setItem('lastSeenRepos', JSON.stringify(lastSeenRepos));

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