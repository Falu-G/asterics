import React from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css"; // ES6
import "./ReactQuillEditor.css";
function ReactQuillEditor() {
  return (
    <div>
      <Editor />
    </div>
  );
}

const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-font">
      <option value="arial" selected>
        Arial
      </option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="montserrat">Montserrat</option>
      <option value="lucida">Lucida</option>
      <option value="palatino">Palatino</option>
      <option value="tahoma">Tahoma</option>
      <option value="times-new-roman">Times New Roman</option>
      <option value="trebuchet">Trebuchet</option>
      <option value="verdana">Verdana</option>
    </select>
    <select className="ql-size">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium" selected>
        Size 3
      </option>
      <option value="large">Size 4</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-image" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-link" />
    <button className="ql-script" value="sub" />
    <button className="ql-script" value="super" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-direction" value="rtl" />
    <button className="ql-direction" value="ltr" />
    <button className="ql-code-block" />
    <button className="ql-blockquote" />
    <button className="ql-formula" />
    <button className="ql-header" value="1" />
    <button className="ql-clean" />
    <button className="ql-insertHeart">
      <CustomHeart />
    </button>
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "montserrat",
];
Quill.register(Font, true);

class Editor extends React.Component {
  state = { editorHtml: "" };

  handleChange = (html) => {
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart,
      },
    },
  };

  static formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background"
  ];

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.state.editorHtml}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
        />
      </div>
    );
  }
}

export default ReactQuillEditor;
