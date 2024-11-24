
import apiClient from "config/axiosConfig";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { LangModel } from "store/models/gitHub";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";


type PrivateFields = '_langs' | '_meta'
export default class LangsStore implements ILocalStore {

    private _langs: LangModel[] = [];
    private _meta: Meta = Meta.initial;

    get langs(): LangModel[] {
        return this._langs
    }

    get meta(): Meta {
        return this._meta;
    }

    constructor() {
        makeObservable<LangsStore, PrivateFields>(this, {
            _langs: observable,
            _meta: observable,
            langs: computed,
            meta: computed,
            getLangs: action
        })
    }

    async getLangs(langsUrl: string): Promise<void> {

        try {
            const response = await apiClient({
                method: 'get',
                url: langsUrl
            });

            let sum = 0;
            for (let key in response.data) {
                sum += response.data[key];
            }

            let langs: LangModel[] = [];
            for (let key in response.data) {
                langs.push({
                    name: key,
                    value: response.data[key],
                    percentage: +(response.data[key] / sum * 100).toFixed(1),
                });
            }

            runInAction(() => {
                this._langs = langs;
                this._meta = Meta.success;
            })


        } catch (e) {

            console.error(e);

            runInAction(() => {
                this._langs = [];
                this._meta = Meta.error;
            })
        }

    }

    destroy(): void {

    }
}