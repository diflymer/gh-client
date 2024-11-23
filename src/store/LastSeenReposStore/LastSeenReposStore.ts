import { ILocalStore } from "../../utils/useLocalStore";
import { Meta } from "../../utils/meta";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";
import { ProjectModel } from '../models/gitHub'

type PrivateFields = '_lastSeenProjects' | '_meta';

export default class ProjectsListStore implements ILocalStore {

    private _lastSeenProjects: ProjectModel[] = localStorage.getItem('lastSeenRepos') ? JSON.parse(localStorage.getItem('lastSeenRepos')!) : [];
    private _meta: Meta = Meta.initial;

    constructor() {
        makeObservable<ProjectsListStore, PrivateFields>(this,
            {
                _lastSeenProjects: observable,
                _meta: observable,
                lastSeenProjects: computed,
                meta: computed,
            })
    }


    get lastSeenProjects(): ProjectModel[] {
        return this._lastSeenProjects;
    }

    get meta(): Meta {
        return this._meta;
    }

    destroy(): void {

    }

}