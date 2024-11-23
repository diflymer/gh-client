import Project from './components/Project/';
import s from './Projects.module.scss'
import { ProjectModel } from '../../../../../store/models/gitHub'
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

type ProjectsProps = {
    projects: ProjectModel[],
    className?: string
}

const Projects: React.FC<ProjectsProps> = ({ projects, className }) => {

    return (
        <div className={cn(s.projects, className)}>
            {projects.map(project => <Project key={project.id} project={project} />)}
        </div>
    )
}

export default observer(Projects);
