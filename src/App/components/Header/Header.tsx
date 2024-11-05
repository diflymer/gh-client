import type { FC } from 'react';
import s from './Header.module.scss';
import Logo from './components/Logo';
import Text from '../../../components/Text';
import Avatar from './components/Avatar/Avatar';

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s['left-part']}>
                <Logo />
                <Text view='p-20' weight='bold'>GitHub Client</Text>
            </div>
            <div className={s['right-part']}>
                <Avatar />
            </div>
        </header>
    )
}

export default Header;
