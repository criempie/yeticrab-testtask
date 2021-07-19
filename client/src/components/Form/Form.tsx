import React, { useRef } from 'react';
import './index.css';
import InputText from '../Input/InputText';
import Button from '../Button/Button';
import axios from 'axios';

type InputSettings = {
  placeholder?: string,
  name: string,
  label: string,
  width?: number,
}

interface FormProps {
  inputsSettings: Array<InputSettings>;
  id?: number;
  onSubmit: () => void;
  type: "patch" | "post";
}

function Form({ inputsSettings, id, onSubmit, type }: FormProps) {
  const inputRefs = useRef([]);
  inputRefs.current = [];

  const getRef = (el: any) => {
    if (el) {
      // @ts-ignore
      inputRefs.current.push(el)
    }
  }

  const getValuesFromInputs = () => {
    let objValues: {[key: string]: any} = {};
    inputRefs.current.forEach((ref: React.Ref<HTMLInputElement>) => {
      // @ts-ignore
      if (ref.value) objValues[ref.name] = ref.value
    })

    return objValues
  }

  async function patchRequest(obj: { [key: string]: any } & { id: number | undefined }) {
    axios.patch('api/items', obj)
      .then(res => console.log(res.data))
      .catch(e => console.log(e))
  }

  async function postRequest(obj: {[key: string]: any}) {
    axios.post("api/items", obj)
      .then(res => console.log(res.data))
      .catch(e => console.log(e))
  }

  return (
    <>
      {inputsSettings.map((setting: InputSettings, i) => buildInput(setting, getRef))}
      <Button text='Готово' name='submit' onClick={() => {
        if (type === "patch") {
          patchRequest(Object.assign(getValuesFromInputs(), {id}));
          onSubmit();
        } else if (type === "post") {
          postRequest(getValuesFromInputs());
          onSubmit();
        }
      }} />
    </>
  )
}

function buildInput(setting: InputSettings, ref: any) {
  return (
    <div className='label-input-container'>
      <label className='label'>{setting.label}</label>
      <InputText placeholder={setting.placeholder}
                 style={{width: setting.width!}}
                 name={setting.name}
                 ref={ref}/>
    </div>
  )
}

export default Form