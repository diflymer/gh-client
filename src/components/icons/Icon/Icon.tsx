import * as React from 'react'
import cn from 'classnames'
import s from './Icon.module.scss'

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
    className,
    color,
    children,
    width = 24,
    height = 24,
    ...props
}) => (
    <svg
        {...props}
        className={cn(color && s[`icon_color-${color}`], className)}
        width={width}
        height={height}
        fill='none'
        {...props}
    >
        {children}
    </svg>
)

export default Icon;
