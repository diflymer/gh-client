import Text from "components/Text";
import s from "./ProjectsListPage.module.scss"
import MultiDropdown, { Option } from "components/MultiDropdown";
import Input from "components/Input";
import Button from "components/Button";
import SearchIcon from "./components/SearchIcon";
import Projects from "./components/Projects";
import { useEffect } from "react";
import Paginator from "./components/Paginator";
import { observer } from "mobx-react-lite";
import { useLocalStore } from "utils/useLocalStore";
import ProjectsListStore from "store/ProjectsListStore";
import rootStore from "store/RootStore";
import { mddTypes } from "utils/multidropdownTypes";
import LastSeenRepos from "./components/LastSeenRepos";

const ProjectsListPage = () => {

    const projectsListStore = useLocalStore(() => new ProjectsListStore())

    useEffect(() => {
        projectsListStore.getRepos();
    }, [])

    const optionsForMultiDropDown = {
        options: mddTypes,
        value: mddTypes.find(t => t.key === rootStore.query.getParam('type')) || null,
        onChange: (option: Option) => { rootStore.query.setParam('type', option.key) },
        getTitle: (value: Option) => value ? value.value : 'Type'
    }

    return (
        projectsListStore.meta === 'initial' || projectsListStore.meta === 'loading' ?
            <div>Loading</div>
            :
            <div className={s['page']}>
                <div className={s['title']}>
                    <Text view="title" weight="bold">List of organization repositories</Text>
                </div>
                <div className={s['section']}>

                    <div className={s['content']}>

                        <div className={s['content-header']}>
                            <MultiDropdown className={s['content-header-mdd']} options={optionsForMultiDropDown.options} value={optionsForMultiDropDown.value!} onChange={optionsForMultiDropDown.onChange} getTitle={optionsForMultiDropDown.getTitle} />
                            <div className={s['search-field']}>
                                <Input value={projectsListStore.search as string} onChange={(v) => projectsListStore.onChangeSearch(v)} placeholder="Enter organization name" />
                                <Button onClick={() => projectsListStore.getRepos()}><SearchIcon /></Button>
                            </div>
                        </div>

                        <Projects projects={projectsListStore.projects} />

                    </div>
                    {projectsListStore.lastPage > 1 &&
                        <Paginator currentPage={projectsListStore.currentPage} lastPage={projectsListStore.lastPage} />
                    }
                    <LastSeenRepos />
                </div>
            </div>
    )
}

export default observer(ProjectsListPage);
