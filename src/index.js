import React from "react";
import ReactDOM from "react-dom";
import Table from "./component/Table"

import "./styles.scss";
let col ={
  slide: 3,
  show: 3,
  speed: "",
}
function App() {
  return (
    <div className="App">
     <Table {...col}/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
