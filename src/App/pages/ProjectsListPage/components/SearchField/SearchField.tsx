import Input from "components/Input";
import SearchIcon from "./components/SearchIcon"
import s from './SearchField.module.scss';
import { FC } from "react";
import { observer } from "mobx-react-lite";
import SearchFieldStore from "store/SearchFieldStore";
import { useLocalStore } from "utils/useLocalStore";
import React from "react";
import Loader from "components/Loader";

type SearchFieldProps = {
    getRepos: () => Promise<void>
}

const SearchField: FC<SearchFieldProps> = ({ getRepos }) => {

    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            searchFieldStore.setOrgsOpened(false)
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const searchFieldStore = useLocalStore(() => new SearchFieldStore())

    return (
        <div className={s['search-field']} ref={dropdownRef}>
            <Input value={searchFieldStore.search as string}
                onChange={(v) => searchFieldStore.onChangeSearch(v)} placeholder="Enter organization name"
                onClick={() => {
                    searchFieldStore.setOrgsOpened(true)
                }}
                afterslot={<SearchIcon />} />
            {searchFieldStore.meta === 'loading' ?
                <div className={s['select-orgs']} >
                    <Loader />
                </div>
                :
                searchFieldStore.orgs.length > 0 &&
                (searchFieldStore.meta === 'success' || searchFieldStore.meta === 'initial') &&
                searchFieldStore.orgsOpened &&
                <div className={s['select-orgs']}>
                    {searchFieldStore.orgs.map(
                        org =>
                            <div className={s['org']} key={org} onClick={() => {
                                searchFieldStore.onChoose(org)
                                getRepos()
                            }}>{org}</div>
                    )}

                </div>

            }

        </div>
    )
}

export default observer(SearchField);
