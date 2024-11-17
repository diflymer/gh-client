import React from 'react';
import s from './Button.module.scss';
import cn from 'classnames';
import Loader from '../Loader';
import Text from '../Text';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { loading = false, children, className, disabled = false, ...rest } = props;

  const buttonClasses =
    cn(
      className,
      s.btn,
      s['btn_bg'],
      !loading && !disabled && s['btn_bg-hover'],
      !loading && !disabled && s['btn_bg-active'],
      disabled && s['btn_bg-disabled']
    );

  return (
    <button {...rest} className={buttonClasses} disabled={disabled || loading}>
      {loading &&
        <Loader size='s' className={s['btn_loader']} />
      }
      <Text view='button'>{children}</Text>
    </button>

  )
};

export default Button;
