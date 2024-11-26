import { ILocalStore } from "../../utils/useLocalStore";
import { Meta } from "../../utils/meta";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";
import { normalizeProject, ProjectApi, ProjectModel } from '../models/gitHub'
import rootStore from "../RootStore";
import apiClient from "config/axiosConfig";

export type PrivateFields = '_projects' | '_meta' | '_currentPage' | '_lastPage';

export default class ProjectsListStore implements ILocalStore {

    private readonly _perPage: number = 12;

    private _projects: ProjectModel[] = [];
    private _meta: Meta = Meta.initial;

    //Пагинация
    private _currentPage: number = rootStore.query.getParam('page') ? Number(rootStore.query.getParam('page')) : 1;
    private _lastPage: number = 1;

    constructor() {
        makeObservable<ProjectsListStore, PrivateFields>(this,
            {
                _projects: observable,
                _meta: observable,
                _currentPage: observable,
                _lastPage: observable,
                projects: computed,
                meta: computed,
                currentPage: computed,
                lastPage: computed,
                getRepos: action,
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


    async getRepos(refresh: boolean = true) {

        if (refresh) {
            rootStore.query.setParam('page', '1');
        }

        this._meta = Meta.loading;

        try {

            //Проверка параметров
            const type = rootStore.query.getParam('type') === undefined ? 'all' : rootStore.query.getParam('type');
            const org = rootStore.query.getParam('search') === undefined ? 'ktsstudio' : rootStore.query.getParam('search');


            const response = await apiClient<ProjectApi[]>({
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
                this.getRepos(false);
            }

        }
    )
}