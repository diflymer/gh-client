import { useNavigate } from 'react-router-dom';
import Card from '../../../../../../../components/Card';
import Star from './components/Star';
import s from './Project.module.scss'

export type ProjectType = {
    id: number,
    title: string,
    desc: string,
    imgURL: string,
    stars: number,
    updated_at: string,
    full_name: string
}

type ProjectProps = { project: ProjectType }

const Project: React.FC<ProjectProps> = ({ project }) => {

    const date = new Date(project.updated_at).toLocaleDateString('en-GB', {
        day: 'numeric',    // День без ведущего нуля
        month: 'short'     // Короткое название месяца
    });;

    const nav = useNavigate()

    return (
        <Card className={s.project} image={project.imgURL} title={project.title} subtitle={project.desc} onClick={() => nav(`/project/${project.full_name}`)}
            captionSlot={
                <div className={s.caption}>
                    <div className={s.star}>
                        <Star />
                        <span>{project.stars}</span>
                    </div>
                    <span>Updated {date}</span>
                </div>
            }
        />
    )
}

export default Project;
