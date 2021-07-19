import React from 'react';
import './index.css';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  style?: any;
  name?: string;
}

function Button({ text, onClick, style, name }: ButtonProps) {

  return (
    <button className='button'
            onClick={onClick}
            style={style}
            name={name}>
      {text}
    </button>
  )
}

export default Button