import React from 'react';
import Text from '../Text';
import cn from 'classnames';
import s from './Card.module.scss';

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    image: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = (props) => {
    const cardClassName = cn(
        props.className,
        s['card']
    )
    return (
        <div className={cardClassName} onClick={props.onClick}>
            <div className={s['card-header']}>
                <img src={props.image} alt="" />
            </div>
            <div className={s['card-body']}>
                <div className={s['card-text']}>
                    {props.captionSlot &&
                        <Text view='p-14-wlh' weight='medium' color='secondary'>{props.captionSlot}</Text>
                    }
                    <Text view='p-20' color='primary' maxLines={2} weight='medium'>{props.title}</Text>
                    <Text view='p-16' color='secondary' maxLines={3}>{props.subtitle}</Text>
                </div>
                {props.contentSlot || props.actionSlot &&
                    <div className={s['card-action']}>
                        {props.contentSlot &&
                            <Text view='p-18' color='primary' weight='bold'>{props.contentSlot}</Text>
                        }
                        {props.actionSlot}
                    </div>
                }
            </div>
        </div>
    )
};

export default Card;
