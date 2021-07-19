import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';
import './fonts/Geometria/stylesheet.css';
import Table, { column } from './components/Table/Table';
import Row from './components/Table/Row';
import SearchLine from "./components/SearchLine/SearchLine";
import FilterNumber from "./components/Filter/FilterNumber";
import FilterDate from "./components/Filter/FilterDate";
import Button from "./components/Button/Button";
import ModalWindow from './components/ModalWindow/ModalWindow';
import InputText from './components/Input/InputText';
import Form from './components/Form/Form';

let columns: Array<column> = [
    {title: "№", name: "requestNumber"},
    {title: "Время получения заявки", name: "receiveTime", parsingFunction: (date: string): string => date.split("T").join(" ")},
    {title: "Название фирмы", name: "companyName"},
    {title: "ФИО", name: "fullName"},
    {title: "Контактный телефон перевозчика", name: "phoneNumber"},
    {title: "Комментарии", name: "comments"},
    {title: "ATI код сети перевозчика", name: "atiCode"},
    {title: "", name: "edit", width: 32},
    {title: "", name: "trash", width: 37},
];

const inputsSettings = [
  {
    placeholder: "ООО Яйца",
    name: "companyName",
    label: "Название фирмы клиента"
  },
  {
    placeholder: "Иванов Иван Иванович",
    name: "fullName",
    label: "ФИО перевозчика"
  },
  {
    placeholder: "+79310000000",
    name: "phoneNumber",
    label: "Контактный телефон перевозчика"
  },
  {
    placeholder: "Комментарий",
    name: "comments",
    label: "Комментарии"
  },
  {
    placeholder: "12345",
    name: "atiCode",
    label: "ATI код сети перевозчика"
  }
]

function App() {
  const [rows, setRows] = useState([
    {
      "companyName": "Яица",
      "fullName": "Иванов Иван Иванович",
      "phoneNumber": "+79433251128",
      "comments": "Привет",
      "atiCode": "https://ati.su/firms/12345/info",
      "id": 1626512494971,
      "requestNumber": 6,
      "receiveTime": "2021-07-17T09:01:34"
    }
  ]);

  const [modalWindowFlag, setModalWindowFlag] = useState(false);
  const [modalWindowEditWithId, setModalWindowEditWithId] = useState<number>(0);

   useEffect(() => {
    axios.get('api/items')
      .then(req => setRows(req.data))
      .catch(e => console.log("get api/items error: ", e))
  }, [])

  return (
    <div className="App">

      {modalWindowFlag &&
        <ModalWindow onBlur={() => setModalWindowFlag(false)}>
          <img className='icon'
               src='./icons/cancel.svg'
               style={{position: "absolute", right: "5%"}}
               onClick={() => setModalWindowFlag(false)}/>
          <h1>Создание новой заявки</h1>
          <Form inputsSettings={inputsSettings}
                onSubmit={() => setModalWindowFlag(false)}
                type='post' />
        </ModalWindow>
      }

      {Boolean(modalWindowEditWithId) &&
        <ModalWindow onBlur={() => setModalWindowEditWithId(0)}>
          <img className='icon'
               src='./icons/cancel.svg'
               style={{position: "absolute", right: "5%"}}
               onClick={() => setModalWindowEditWithId(0)}/>
          <h1>Редактирование заявки</h1>

          <Form inputsSettings={inputsSettings}
                onSubmit={() => setModalWindowEditWithId(0)}
                type='patch'
                id={modalWindowEditWithId} />

        </ModalWindow>
      }

      <header className='header'>
        <Button text="Создать новую заявку" onClick={() => setModalWindowFlag(true)} />
      </header>

      <div style={{paddingLeft: "3em", paddingRight: "3em"}}>
        <div className='inline-container'>
          <SearchLine />
          <FilterNumber />
          <FilterDate />
        </div>

        <Table columns={columns} eventListener={tableEventListener}>
          { rows.map((row: any) => <Row columns={columns} row={row} key={row.id} />) }
        </Table>
      </div>

  </div>
  );

  interface patchChangesInterface {
    id : number;
    companyName?: string;
    fullName?: string;
    phoneNumber?: string;
    comments?: string;
    atiCode?: number;
  }

  async function patchChanges(changedObject: patchChangesInterface) {
    console.log(changedObject)
    let request = axios.patch('api/items', changedObject);
    let response = await request;

    return response.data;
  }

  async function deleteRequest(id: any) {
    let request = axios.delete(`api/items/${id}`)
    let response = await request;

    return response.data
  }

  async function modalWindowWithIdEventListener(event : React.SyntheticEvent) {
    let element = event.target as HTMLInputElement;
    let id = modalWindowEditWithId;
    let requestBody = {id};

    if (element.className === "modal-window-container" || element.name === "cancel") {
      requestBody = null!;
      setModalWindowEditWithId(0);
    } else if (element.tagName === "input" && element.value) {
      // @ts-ignore
      requestBody[element.name] = element.value;
    } else if (element.name === "submit") {
      console.log(await patchChanges(requestBody));
    }
  }

  function tableEventListener(event: React.SyntheticEvent) {
    let element = event.target as HTMLElement;

    if (element.id) {
      let [action, id] = element.id.split(";");
      if (action === "edit") {
        setModalWindowEditWithId(Number(id))
      } else if (action === "delete") {
        console.log(deleteRequest(id))
      }

    }
  }

}







export default App;
