import React, { useEffect, useState } from 'react';
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
import Form from './components/Form/Form';

let columns: Array<column> = [
    {title: "№", name: "requestNumber"},
    {title: "Время получения заявки", name: "receiveTime", parsingFunction: (date: string): string => date.split("T").join(" ")},
    {title: "Название фирмы", name: "companyName"},
    {title: "ФИО", name: "fullName"},
    {title: "Контактный телефон перевозчика", name: "phoneNumber"},
    {title: "Комментарии", name: "comments"},
    {title: "ATI код сети перевозчика", name: "atiCode", parsingFunction: (atiCode: number): string => `https://ati.su/firms/${atiCode}/info`},
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
      "comments": "Привет как дела что делашеь как погода",
      "atiCode": "121241",
      "id": 1626512494971,
      "requestNumber": 1,
      "receiveTime": "2021-07-17T09:01:34"
    },
    {
      "companyName": "Пососи",
      "fullName": "Зубенко Михаил Петрович",
      "phoneNumber": "+79433251128",
      "comments": "как дела",
      "atiCode": "121241",
      "id": 23425235235,
      "requestNumber": 2,
      "receiveTime": "2021-07-17T09:01:34"
    },
    {
      "companyName": "ак дела",
      "fullName": "Петров Иван Иванович",
      "phoneNumber": "+79433251128",
      "comments": "Привет ",
      "atiCode": "121241",
      "id": 75756723254,
      "requestNumber": 3,
      "receiveTime": "2021-07-17T09:01:34"
    }
  ]);

  const [rowsFiltered, setRowsFiltered] = useState(rows);

  const [modalWindowFlag, setModalWindowFlag] = useState(false);
  const [modalWindowEditWithId, setModalWindowEditWithId] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [intervalRequestNumber, setIntervalRequestNumber] = useState<[number, number]>([0, Infinity]);


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
               alt='cancel'
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
               alt='cancel'
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
          <SearchLine onChange={value => {
            setSearchValue(value);
            filterRows(value, intervalRequestNumber);
          }} />
          <FilterNumber getInterval={(from, to) => {
            setIntervalRequestNumber([from, to]);
            filterRows(searchValue, [from, to]);
          }} />
          <FilterDate />
        </div>

        <Table columns={columns} eventListener={tableEventListener}>
          { rowsFiltered.map((row: any) => <Row columns={columns} row={row} key={row.id} />) }
        </Table>
      </div>

  </div>
  );

  async function deleteRequest(id: any) {
    let request = axios.delete(`api/items/${id}`)
    let response = await request;

    return response.data
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

  function filterRows(findName: string, intervalRequestNumber: [number, number]) {
    let newRows = rows.slice();

    if (findName) {
      newRows = (newRows.filter(obj => obj.fullName.toLowerCase().indexOf(findName.toLocaleLowerCase()) !== -1));
    }

    if (intervalRequestNumber[1] < Infinity && intervalRequestNumber[0] > 0) {
      newRows = newRows.filter(obj => obj.requestNumber >= intervalRequestNumber[0] && obj.requestNumber <= intervalRequestNumber[1])
    }

    setRowsFiltered(newRows);
  }
}



export default App;
