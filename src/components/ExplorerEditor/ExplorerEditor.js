import React, { useRef, useState } from "react";
import "./ExplorerEditor.css";
import MonacoEditorContainer from "../MonacoEditorContainer/MonacoEditorContainer";
import SplitPane from "react-split-pane";
import Explorer from "../Explorer/Explorer";

export default function ExplorerEditor() {
  const monacoEditorContainerRef = useRef();
  const [code, setCode] = useState("//Choose a mock to open");

  function handleCodeChange(code) {
    setCode(JSON.stringify(code, null, 4));
    console.log(code);
  }

  return (
    <SplitPane
      split="vertical"
      minSize={150}
      defaultSize={"30%"}
      onDragFinished={() => monacoEditorContainerRef.current.handleResize()}
      paneStyle={{
        height: "100%"
      }}
      pane2Style={{
        overflow: "hidden"
      }}
    >
      <Explorer onSelectedChange={handleCodeChange} />
      <MonacoEditorContainer ref={monacoEditorContainerRef} code={code} />
    </SplitPane>
  );
}
