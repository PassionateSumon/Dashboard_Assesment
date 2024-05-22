import React, { useEffect, useState } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function Component1({ setCurrApi }) {
  const currReadyPage = (params) => {
    setCurrApi(params.api);
  };
  const nf = "Not found";
  let myData = [];
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 50, 100];
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "title", editable: true, filter: true },
    { field: "author_name", editable: true, filter: true },
    { field: "first_publish_year", editable: true, filter: true },
    { field: "subject", editable: true, filter: true },
    { field: "ratings_average", editable: true, filter: true },
  ]);

  useEffect(() => {
    async function callApi() {
      try {
        const response = await fetch(import.meta.env.VITE_URL1);
        const data = await response.json();
        data.docs.forEach((i) => {
          const tempData = {};

          tempData.title = i?.title || nf;
          tempData.first_publish_year = i
            ? i.first_publish_year
              ? i.first_publish_year
              : nf
            : nf;
          tempData.ratings_average = i
            ? i.ratings_average
              ? i.ratings_average
              : nf
            : nf;
          tempData.subject = i
            ? Array.isArray(i.subject) && i.subject.length > 0
              ? i.subject[0]
              : nf
            : nf;

          tempData.author_name = i
            ? Array.isArray(i.author_name)
              ? i.author_name.length > 0
                ? i.author_name[0]
                : nf
              : typeof i.author_name === "string" && i.author_name !== ""
              ? i.author_name
              : nf
            : nf;

          myData.push(tempData);
        });

        setRowData(myData);
        console.log(myData);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    callApi();
  }, []);

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          onGridReady={currReadyPage}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </>
  );
}

function Component2({ setCurrApi }) {
  const currReadyPage = (params) => {
    setCurrApi(params.api);
  };
  const nf = "Not found";
  let myData = [];
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 50, 100];
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "author_birth_date", editable: true, filter: true },
    { field: "author_top_work", editable: true, filter: true },
  ]);

  useEffect(() => {
    async function callApi() {
      try {
        const response = await fetch(import.meta.env.VITE_URL2);
        const data = await response.json();
        data.docs.forEach((i) => {
          const tempData = {};
          tempData.author_top_work = i
            ? typeof i.top_work === "string"
              ? i.top_work
              : nf
            : nf;
          tempData.author_birth_date = i
            ? typeof i.birth_date === "string"
              ? i.birth_date
              : nf
            : nf;
          console.log(typeof i.top_work);
          console.log(typeof i.birth_date);
          myData.push(tempData);
        });
        console.log(myData);
        setRowData(myData);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    callApi();
  }, []);

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          onGridReady={currReadyPage}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </>
  );
}

function App() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [currApi, setCurrApi] = useState(null);

  function handleFirst() {
    if (show2) {
      setShow2(false);
      setShow1(true);
    } else {
      setShow1(true);
    }
  }
  function handleSecond() {
    if (show1) {
      setShow1(false);
      setShow2(true);
    } else {
      setShow2(true);
    }
  }
  const downloadCSV = () => {
    if (currApi) {
      currApi.exportDataAsCsv();
    }
  };
  return (
    <>
      <h1 className="bg-transparent mb-5 text-2xl font-bold ">DASHBOARD</h1>
      <button
        onClick={downloadCSV}
        className="bg-green-600 text-xl text-white p-2 mb-5 font-medium rounded-md w-28"
      >
        Download
      </button>
      <div className="flex items-start flex-row gap-4">
        <div className="flex items-center flex-col">
          <button
            onClick={handleFirst}
            className="bg-cyan-800 rounded-md p-3 mb-4 text-xl w-[100%] font-semibold text-white"
          >
            First
          </button>
          <button
            onClick={handleSecond}
            className="bg-cyan-800 rounded-md p-3 mb-4 text-xl w-[100%] font-semibold text-white"
          >
            Second
          </button>
        </div>

        <div className="w-[100%]">
          {show1 && <Component1 setCurrApi={setCurrApi} />}
          {show2 && <Component2 setCurrApi={setCurrApi} />}
        </div>
      </div>
    </>
  );
}
export default App;
