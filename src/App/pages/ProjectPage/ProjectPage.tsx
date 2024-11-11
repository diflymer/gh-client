import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import s from './ProjectPage.module.scss';

import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Text from 'components/Text';
import ProjectAvatar from './components/ProjectAvatar';
import LinkIcon from './components/LinkIcon';
import Topics from './components/Topics/Topics';
import Stats from './components/Stats';
import Contributors from './components/Contributors';
import Langs from './components/Langs';
import Readme from './components/Readme';
import RepoStore from 'store/RepoStore';
import { useLocalStore } from 'utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const ProjectPage = () => {

    const repoStore = useLocalStore(() => new RepoStore());

    const params = useParams();

    useEffect(() => {
        repoStore.getRepo(params.owner!, params.repo!)
    }, [])

    const nav = useNavigate()

    return (
        repoStore.meta === 'initial' || repoStore.meta === 'loading' ?
            <div>Loading</div>
            :
            <div className={s.page}>
                <div className={s['page-header']}>
                    <ArrowRightIcon className={s['page-header-arrow-right']} onClick={() => nav('/')} width="32" height="32" viewBox="0 0 32 32" />
                    <ProjectAvatar imgURL={toJS(repoStore.repo.imgUrl)} />
                    <Text view='title'>{toJS(repoStore.repo.title)}</Text>
                </div>
                <div className={s['page-body']}>
                    {repoStore.repo.homepage &&
                        <div className={s.link}>
                            <LinkIcon />
                            <a href={repoStore.repo.homepage}>
                                <Text view='p-16' weight='bold' className={s['link-text']}>{repoStore.repo.homepage.substring(8)}</Text>
                            </a>
                        </div>
                    }
                    <Topics topics={toJS(repoStore.repo.topics)} />
                    <Stats stats={toJS(repoStore.repo.stats)} />
                    <div className={s['contributors-langs']}>
                        {repoStore.repo.contributorsUrl && <Contributors contributorsURL={repoStore.repo.contributorsUrl} />}
                        {repoStore.repo.languagesUrl && <Langs langsURL={repoStore.repo.languagesUrl} />}
                    </div>
                </div>
                <Readme />
            </div>
    )
}

export default observer(ProjectPage);
