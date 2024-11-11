import React from 'react';
import s from './MultiDropdown.module.scss'
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import cn from 'classnames';
import { set } from 'mobx';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {

  let [opened, setOpened] = React.useState(false);
  let [values, setValues] = React.useState(props.value);
  let [options, setOptions] = React.useState(props.options);

  const toggleSelect = () => {
    if (props.disabled === undefined || props.disabled === false) {
      setOpened(prev => !prev);
    }
  }

  const openSelect = () => {
    if (props.disabled === undefined || props.disabled === false) {
      setOpened(true);
    }
  }

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpened(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getValues = (values: Option) => {
    return values;
  }

  const chooseOption = (option: Option) => {
    if (values !== option) {
      props.onChange(option);
      setValues(option);
      setOpened(false);
    }
  }

  React.useEffect(() => {
    setValues(props.value);
  }, [props.value]);

  React.useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  React.useEffect(() => {
    if (props.disabled) {
      setOpened(false);
    }
  }, [props.disabled]);


  let [inputValue, setInputValue] = React.useState("")

  const changeInputValue = (value: string) => {
    setInputValue(value);
  }

  React.useEffect(() => {
    setOptions(props.options.filter(option => option.value.toLowerCase().includes(inputValue.toLowerCase())));
  }, [inputValue]);

  const multiDropdownclass = cn(
    s['multidropdown'],
    props.className
  )

  return (
    <div className={multiDropdownclass} ref={dropdownRef}>
      <Input value={opened ? inputValue : (values ? props.getTitle(values) : '')} placeholder={props.getTitle(values)} onChange={changeInputValue} disabled={props.disabled || false}
        afterslot={<ArrowDownIcon color="secondary" onClick={toggleSelect} />} onClick={openSelect} />
      {opened &&
        <>
          <div className={s['select-options']}>
            {options.map(
              option =>
                <div className={cn(s['option'], getValues(values)?.value === option.value && s['option-selected'])} key={option.key} onClick={() => { chooseOption(option) }}>
                  {option.value}
                </div>
            )}
          </div>
        </>
      }
    </div>
  )
};

export default MultiDropdown;
