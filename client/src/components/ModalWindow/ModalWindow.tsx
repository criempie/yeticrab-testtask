import React from 'react';
import './index.css';

interface ModalWindowProps {
  children: React.ReactChild[];
  onBlur?: (event: React.SyntheticEvent) => void;
}

function ModalWindow({ onBlur, children }: ModalWindowProps) {
  return (
    <div className='modal-window-container' onClick={onBlur}>
      <div className='modal-window' onClick={(e) => e.stopPropagation()}>
        { children }
      </div>
    </div>
  )
}

export default ModalWindow