import * as React from 'react'
import s from './Text.module.scss';
import cn from 'classnames';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-14-wlh';
    /** Html-тег */
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
};

const Text: React.FC<TextProps> = ({ className, view = 'p-14', tag: Tag = 'p', weight, children, color, maxLines }) => {

    return (
        <Tag className={cn(className, s.text, s[`text_view-${view}`], s[`text_color-${color}`], s[`text_weight-${weight}`], maxLines && s['text_ellipsis'])}
            style={{ WebkitLineClamp: maxLines }}>
            {children}
        </Tag>
    )
}

export default Text;