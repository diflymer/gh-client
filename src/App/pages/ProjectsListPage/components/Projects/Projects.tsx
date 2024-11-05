import Project from './components/Project/';
import s from './Projects.module.scss'
import { ProjectType } from './components/Project/Project';

type ProjectsProps = {
    projects: ProjectType[]
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {

    return (
        <div className={s.projects}>
            {projects.map(project => <Project key={project.id} project={project} />)}
        </div>
    )
}

export default Projects;
