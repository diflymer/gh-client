import apiClient from "config/axiosConfig";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";
import { Params } from "react-router-dom";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";

type PrivateFields = '_metaBranches' | '_metaCommits' | '_branches' | '_currentBranch';

type Branch = {
    name: string;
};

type Commit = {
    sha: string;
    commit: {
        message: string;
        author: {
            name: string;
            date: string;
        };
    };
};

export default class GitGraphStore implements ILocalStore {

    private _commits: Commit[] = [];
    private _branches: Branch[] = [];
    private _currentBranch = '';
    private _metaBranches: Meta = Meta.initial;
    private _metaCommits: Meta = Meta.initial;

    private _owner: string;
    private _repo: string;

    get commits() {
        return this._commits
    }

    get branches() {
        return this._branches
    }

    get currentBranch() {
        return this._currentBranch
    }

    get metaBranches(): Meta {
        return this._metaBranches;
    }

    get metaCommits(): Meta {
        return this._metaCommits;
    }

    constructor(params: Readonly<Params<string>>) {
        makeObservable<GitGraphStore, PrivateFields>(this, {
            // _commits: observable,
            _branches: observable,
            _metaBranches: observable,
            _metaCommits: observable,
            _currentBranch: observable,
            commits: computed,
            branches: computed,
            metaBranches: computed,
            metaCommits: computed,
            currentBranch: computed,
            getBranches: action,
            getCommits: action,
            chooseBranch: action
        })

        this._owner = params.owner!;
        this._repo = params.repo!;
    }

    chooseBranch(branch: string) {
        console.log(branch);
        this._currentBranch = branch;
    }

    async getBranches() {

        this._metaBranches = Meta.loading;

        try {

            let response = await apiClient({
                method: 'get',
                url: `https://api.github.com/repos/${this._owner}/${this._repo}/branches`
            });


            runInAction(() => {
                this._branches = response.data;
                const hasMainBranch = response.data.find((branch: { name: string; }) => branch.name === 'master' || branch.name === 'main')
                if (hasMainBranch) {
                    this._currentBranch = hasMainBranch.name;
                } else {
                    this._currentBranch = response.data[0].name;
                }
                this._metaBranches = Meta.success;
            })

        } catch (e) {
            console.error(e);

            runInAction(() => {
                this._branches = [];
                this._metaBranches = Meta.error;
            })

        }

    }

    async getCommits(branch = 'master') {

        this._metaCommits = Meta.loading;

        try {

            let response = await apiClient({
                method: 'get',
                url: `https://api.github.com/repos/${this._owner}/${this._repo}/commits?sha=${branch}`
            });

            runInAction(() => {
                this._commits = response.data;
                this._metaCommits = Meta.success;
            })

        } catch (e) {
            console.error(e);

            runInAction(() => {
                this._commits = [];
                this._metaCommits = Meta.error;
            })

        }

    }

    destroy(): void {

        this._branchReaction();
    }

    private readonly _branchReaction: IReactionDisposer = reaction(
        () => {
            return this.currentBranch;
        },
        (branch) => {
            this.getCommits(branch);
        }
    )

}