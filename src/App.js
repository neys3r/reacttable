import React, { useState } from "react";

import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 

import "./App.css";

function App() {

  const [data, setData] = useState([]);
  const [keyword, setKeybord] = useState("");

  const fetchData = () => {
    // Llamada al API REST
    const url = `https://api.github.com/search/repositories?q=${keyword}`;
    fetch(url)
    .then((response)=> response.json())
    .then((responseData) => {
      setData(responseData.items);
    })

  }
  const handleChange = (e) => {
    setKeybord(e.target.value);
  }

  const btnClick = (value) => {
    alert(value);
  }

  const columns =[
    {
    Header: "Name",
    accessor: "full_name"
  },{
    Header: "URL",
    accessor: "html_url"
  },{
    Header: "Owner",
    accessor: "owner.login"
  },{
    id: "button",
    sortable: false,
    filterable: false,
    with: 100,
    accessor: "full_name",
    Cell: ({value}) => (
      <button
      onClick={() => {
        btnClick(value);
      }}
      >
        Press me
      </button>
    )
  }
];

  

  return (
    <div className="App">
      <input type='text' onChange={handleChange}/>
      <button onClick={fetchData} value={keyword}>
        fetch
      </button>
      <ReactTable
      data={data} 
      columns={columns}
      filterable={true}
      defaultPageSize={10}
      />

    </div>
  );
}

export default App;
