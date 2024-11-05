import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import s from './ProjectPage.module.scss';

import ArrowRightIcon from '../../../components/icons/ArrowRightIcon';
import Text from '../../../components/Text';
import ProjectAvatar from './components/ProjectAvatar';
import LinkIcon from './components/LinkIcon';
import Topics from './components/Topics/Topics';
import Stats from './components/Stats';
import Contributors from './components/Contributors';
import Langs from './components/Langs';
import Readme from './components/Readme';

const ProjectPage = () => {

    const params = useParams();

    useEffect(() => {
        const fetch = async () => {
            const result = await axios({
                method: 'get',
                url: `https://api.github.com/repos/${params.owner}/${params.repo}`,
            });


            setProject({
                id: result.data.id,
                title: result.data.name,
                imgURL: result.data.owner.avatar_url,
                homepage: result.data.homepage,
                topics: result.data.topics,
                stats: {
                    stars: result.data.stargazers_count,
                    watchers: result.data.watchers_count,
                    forks: result.data.forks_count,
                },
                contributorsURL: result.data.contributors_url,
                languagesURL: result.data.languages_url,
                desc: result.data.description,
            })
        }

        fetch();

    }, [])

    let [project, setProject] = useState<{
        id: number,
        title: string,
        imgURL: string,
        homepage: string,
        topics: string[],
        stats: {
            stars: number | null,
            watchers: number | null,
            forks: number | null
        },
        contributorsURL: string,
        languagesURL: string,
        desc: string
    }>({
        id: 0,
        title: '',
        imgURL: '',
        homepage: '',
        topics: [],
        stats: {
            stars: null,
            watchers: null,
            forks: null
        },
        contributorsURL: '',
        languagesURL: '',
        desc: ''
    });

    const nav = useNavigate()

    return (
        <div className={s.page}>
            <div className={s['page-header']}>
                <ArrowRightIcon className={s['page-header-arrow-right']} onClick={() => nav('/')} width="32" height="32" viewBox="0 0 32 32" />
                <ProjectAvatar imgURL={project.imgURL} />
                <Text view='title'>{project.title}</Text>
            </div>
            <div className={s['page-body']}>
                {project.homepage &&
                    <div className={s.link}>
                        <LinkIcon />
                        <a href={project.homepage}>
                            <Text view='p-16' weight='bold' className={s['link-text']}>{project.homepage.substring(8)}</Text>
                        </a>
                    </div>
                }
                <Topics topics={project.topics} />
                <Stats stats={project.stats} />
                <div className={s['contributors-langs']}>
                    {project.contributorsURL && <Contributors contributorsURL={project.contributorsURL} />}
                    {project.languagesURL && <Langs langsURL={project.languagesURL} />}
                </div>
            </div>
            <Readme />
        </div>
    )
}

export default ProjectPage;
