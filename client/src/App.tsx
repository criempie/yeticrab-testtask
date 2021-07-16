import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './fonts/Geometria/stylesheet.css';
import Table, { column } from './components/Table/Table';
import Row from './components/Table/Row';
import SearchLine from "./components/SearchLine/SearchLine";
import FilterNumber from "./components/Filter/FilterNumber";
import FilterDate from "./components/Filter/FilterDate";

let columns: Array<column> = [
    {title: "№", name: "requestNumber"},
    {title: "Время получения заявки", name: "receiveTime"},
    {title: "Название фирмы", name: "companyName"},
    {title: "ФИО", name: "fullName"},
    {title: "Контактный телефон перевозчика", name: "phoneNumber"},
    {title: "Комментарии", name: "comments"},
    {title: "ATI код сети перевозчика", name: "atiCode"},
    {title: "", name: "edit", width: 32},
    {title: "", name: "trash", width: 37},
];

let rows: any = [
    {
        requestNumber: "123",
        receiveTime: "21.03.21 18:02",
        companyName: "companyName1",
        fullName: "Иванов Иван Иванович",
        phoneNumber: "+79233438821",
        comments: "Круто",
        atiCode: "https://ati.su/firms/12345/info"
    },
    {
        requestNumber: "124",
        receiveTime: "24.03.21 12:32",
        companyName: "companyName2",
        fullName: "Зубенко Михаил Петрович",
        phoneNumber: "+76223433821",
        comments: "Класс",
        atiCode: "https://ati.su/firms/12323/info"
    }
]

// axios.defaults.headers.common['mode'] = 'no-cors';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/json';


function App() {
  useEffect(() => {
    axios.get('api/items')
      .then(req => console.log(req))
  }, [])

  return (
    <div className="App">
        <header className='header'></header>

        <br />
        <br />
        <br />

        <div style={{paddingLeft: "3em", paddingRight: "3em"}}>
            <div className='inline-container'>
                <SearchLine />
                <FilterNumber />
                <FilterDate />
            </div>

            <Table columns={columns}>
                { rows.map((row: any) => <Row columns={columns} row={row} />) }
            </Table>
        </div>

    </div>
  );
}

export default App;
