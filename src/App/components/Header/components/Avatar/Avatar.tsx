import s from './Avatar.module.scss'
import avatarImage from '../../../../../assets/images/avatarDefault.png'

const Avatar = () => {
    return (
        <div className={s['div-img']}>
            <img src={avatarImage} alt="avatar" />
        </div>
    )
}

export default Avatar;
