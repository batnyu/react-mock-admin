import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeMethods
} from "react";
import MonacoEditor from "react-monaco-editor";
import "./MonacoEditorContainer.css";

const MonacoEditorContainer = forwardRef((props, ref) => {
  const monacoRef = useRef(null);

  const options = {
    selectOnLineNumbers: true,
    scrollBeyondLastLine: false
  };

  useEffect(() => {
    window.addEventListener("resize", ref.current.handleResize);
    return () => {
      window.removeEventListener("resize", ref.current.handleResize);
    };
  });

  useImperativeMethods(ref, () => ({
    handleResize() {
      const {
        clientWidth: width,
        clientHeight: height
      } = monacoRef.current.containerElement;
      // console.log("width", width, "height", height);
      monacoRef.current.editor.layout({ width, height });
    }
  }));

  function editorDidMount(editor, monaco) {
    // console.log("editorDidMount", editor);
    editor.layout();
    // editor.layout({ width: 10000, height: 10000 });
    editor.focus();
  }

  function onChange(newValue, e) {
    console.log("onChange", newValue, e);
    // dispatch({ type: "update_code", payload: newValue });
  }

  return (
    <MonacoEditor
      ref={monacoRef}
      language="json"
      theme="vs-dark"
      value={props.code}
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
});

export default MonacoEditorContainer;
