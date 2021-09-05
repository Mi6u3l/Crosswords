import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Puzzle } from "./components/puzzle";

export const App = () => {
  return <Puzzle />;
};

ReactDOM.render(<App />, document.getElementById("app"));
