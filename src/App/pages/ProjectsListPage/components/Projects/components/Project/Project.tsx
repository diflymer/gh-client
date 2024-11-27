import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../../../../../../components/Card';
import Star from './components/Star';
import s from './Project.module.scss'
import { ProjectModel } from '../../../../../../../store/models/gitHub'
import { observer } from 'mobx-react-lite';

type ProjectProps = { project: ProjectModel }

const Project: React.FC<ProjectProps> = ({ project }) => {

    const nav = useNavigate()
    const location = useLocation();

    const toNextPage = (fullname: string) => {

        //Сохраняем гет параметры
        sessionStorage.setItem('prevUrl', location.pathname + location.search);

        nav(`/project/${fullname}`)
    }

    return (
        <Card className={s.project} image={project.imgUrl} title={project.title} subtitle={project.desc} onClick={() => toNextPage(project.fullName)}
            captionSlot={
                <div className={s.caption}>
                    <div className={s.star}>
                        <Star />
                        <span>{project.stars}</span>
                    </div>
                    <span>Updated {project.updatedAt}</span>
                </div>
            }
        />
    )
}

export default observer(Project);
