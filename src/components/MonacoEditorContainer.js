import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import "./MonacoEditorContainer.css";

export default function MonacoEditorContainer(props) {
  const [code, setCode] = useState(`[
    {
      "relationship": [
        -1710253456,
        true,
        -991187584.7965393,
        "closer",
        false,
        false
      ],
      "science": false,
      "come": "wait",
      "chamber": 1168256162.1645274,
      "fierce": false,
      "obtain": 1327776437.0676212
    },
    "pine",
    "claws",
    true,
    false,
    "meal"
  ]`);
  const options = {
    selectOnLineNumbers: true
  };
  const monacoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const {
        clientWidth: width,
        clientHeight: height
      } = monacoRef.current.containerElement;
      console.log("width", width, "height", height);
      // monacoRef.current.editor.layout({ width, height });
      monacoRef.current.editor.layout();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  function editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    // const {
    //   clientWidth: width,
    //   clientHeight: height
    // } = monacoRef.current.containerElement;
    // editor.layout({ width, height });
    editor.focus();
  }

  function onChange(newValue, e) {
    console.log("onChange", newValue, e);
    setCode(newValue);
  }

  return (
    <MonacoEditor
      ref={monacoRef}
      language="json"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
}
