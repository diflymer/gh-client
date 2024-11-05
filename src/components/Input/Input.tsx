import React from 'react';
import s from './Input.module.scss';
import cn from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterslot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {

    const inputClassname = cn(
      props.className,
      s['input-field']
    )

    return (
      <div className={inputClassname}>
        <input type='text' {...props} ref={ref} value={props.value}
          placeholder={props.placeholder || ''} disabled={props.disabled}
          onChange={(e) => props.onChange(e.target.value)} />
        {props.afterslot}
      </div>

    )
  });

export default Input;
