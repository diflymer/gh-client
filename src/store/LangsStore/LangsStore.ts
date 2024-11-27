
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


            let langsFromObj: any = []

            for (let key in response.data) {
                langsFromObj.push({
                    name: key,
                    value: response.data[key]
                });
            }

            langsFromObj.sort((a: any, b: any) => b.value - a.value);
            langsFromObj = langsFromObj.slice(0, 5);

            let sum = 0;
            for (let lang of langsFromObj) {
                sum += lang.value;
            }

            for (let lang of langsFromObj) {
                lang.percentage = ((lang.value / sum) * 100).toFixed(1);
            }

            runInAction(() => {
                this._langs = langsFromObj;
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