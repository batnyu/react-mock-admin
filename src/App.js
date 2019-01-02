import React from "react";
import "./App.css";
import MonacoEditorContainer from "./components/MonacoEditorContainer";

export default function App() {
  return (
    <div className="App">
      <div className="item1" />
      <div className="item2" />
      <div className="item3">
        <MonacoEditorContainer />
      </div>
    </div>
  );
}
