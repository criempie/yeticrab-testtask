import React from 'react';
import './index.css';

interface InputTextProps {
  placeholder?: string;
  name?: string;
  style?: {[key: string]: string | number};
}

const InputText = React.forwardRef(function({ placeholder, name, style }: InputTextProps, ref: React.Ref<any>) {

  return (
    <input type='text'
           placeholder={placeholder}
           className='input'
           name={name}
           style={style}
           ref={ref} />
  )
})

export default InputText