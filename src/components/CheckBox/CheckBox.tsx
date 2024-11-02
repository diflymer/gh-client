import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import s from "./CheckBox.module.scss"
import cn from "classnames"

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({onChange, className, ...props}) => {

  React.useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  let [checked, setChecked] = React.useState(props.checked || false);

  const toggleCheck = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className={cn( s['input-check'], className )} onClick={props.disabled ? () => {} : toggleCheck} data-disabled={props.disabled || false} >
      <input hidden={true} type="checkbox" checked={checked} {...props} />
      {checked &&
        <CheckIcon color={props.disabled ? "primary" : "accent"} width={40} height={40} opacity={props.disabled ? 0.2 : 1} strokeWidth={3.33}/>
      }
    </div>
  )
};

export default CheckBox;
