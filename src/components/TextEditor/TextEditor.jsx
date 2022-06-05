import React from "react";
import "./textEditor.css";

import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
function TextEditor({sizeOfMessageBox,editorState,onEditorStateChange,defaultValueOfEditor}) {
 

  return (
    <>
      <ScopedCssBaseline>

      <div
     style = {{
        width: sizeOfMessageBox,
        backgroundColor: "white"
     }}
   
    >
      <Editor
        editorState={editorState}
        defaultEditorState = {defaultValueOfEditor}
        placeholder="Enter text here..."
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
    

      </ScopedCssBaseline>
   
    </>
   
  );
}

export default TextEditor;
