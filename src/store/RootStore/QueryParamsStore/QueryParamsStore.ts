import { action, makeObservable, observable, set } from 'mobx';
import * as qs from 'qs';
import { NavigateFunction } from 'react-router-dom';

type PrivateFields = '_params'

export default class QueryParamsStore {

    private _params: qs.ParsedQs = {};
    private _search: string = '';
    private _navigate: NavigateFunction | null = null;

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable,
            setSearch: action,
            setNavigate: action,
            setParam: action
        })
    }

    setNavigate(navigate: NavigateFunction) {
        if (!this._navigate) {
            this._navigate = navigate;
        }

    }

    getParam(key: string) {
        return this._params[key];
    }

    setParam(key: string, value: string) {
        set(this._params, key, value);
        if (this._navigate) {
            this._navigate(`${location.pathname}?${qs.stringify(this._params)}`);
        }
    }

    setSearch(search: string) {
        search = search.startsWith('?') ? search.slice(1) : search;

        if (this._search !== search) {
            this._search = search;
            this._params = qs.parse(search)
        }

    }
}