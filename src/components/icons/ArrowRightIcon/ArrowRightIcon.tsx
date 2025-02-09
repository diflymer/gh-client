import * as React from 'react'
import Icon, { IconProps } from '../Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
    return (
        <Icon {...props} width="32" height="32" viewBox="0 0 32 32">
            <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    );
}

export default ArrowRightIcon;
