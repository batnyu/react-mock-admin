import React from "react";
import "./App.css";
import ExplorerEditor from "./components/ExplorerEditor/ExplorerEditor";

export default function App() {
  return (
    <div className="App">
      <div className="item1" />
      <div className="item2" />
      <div className="item3">
        <ExplorerEditor />
      </div>
    </div>
  );
}
