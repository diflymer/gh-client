import Project from './components/Project/';
import s from './Projects.module.scss'
import { ProjectModel } from '../../../../../store/models/gitHub'
import { observer } from 'mobx-react-lite';

type ProjectsProps = {
    projects: ProjectModel[]
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {

    return (
        <div className={s.projects}>
            {projects.map(project => <Project key={project.id} project={project} />)}
        </div>
    )
}

export default observer(Projects);
