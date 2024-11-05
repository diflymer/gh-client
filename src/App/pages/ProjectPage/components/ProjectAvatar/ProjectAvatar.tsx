import type { FC } from 'react';
import s from './ProjectAvatar.module.scss';

type ProjectAvatarProps = {
    imgURL: string;
}

const ProjectAvatar: FC<ProjectAvatarProps> = ({ imgURL }) => {
    return (
        <div className={s.img}>
            <img src={imgURL} alt="avatar" />
        </div>
    )
}

export default ProjectAvatar;
