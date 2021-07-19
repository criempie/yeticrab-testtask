import React from 'react';
import './index.css';

interface InputTextProps {
  placeholder?: string;
  name?: string;
  style?: {[key: string]: string | number};
  onChange?: (value: string) => void;
  type?: "number";
}

const InputText = React.forwardRef(function({ placeholder, name, style, onChange, type }: InputTextProps, ref: React.Ref<any>) {

  return (
    <input type={type}
           placeholder={placeholder}
           className='input'
           name={name}
           style={style}
           onChange={(event) => onChange?.(event.target.value.trim())}
           ref={ref} />
  )
})

export default InputText