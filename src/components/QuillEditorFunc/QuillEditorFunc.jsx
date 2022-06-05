import React from "react";
import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import "../../../node_modules/quill/dist/quill.snow.css";
import "../../../node_modules/quill/dist/quill.core.css"
import "./quillEditorFunc.css"

const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
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
      <option value="lucida">Lucida</option>
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
  "montserrat"
];
Quill.register(Font, true);

function QuillEditorFunc({settemplateObjstate,templateObjstate,html, setHtml}) {


  const handleChange = (html) => {
    //this.setState({ editorHtml: html });
    setHtml(html);
    console.log(html)
    settemplateObjstate({
        ...templateObjstate,
        message:html
      });

      console.log(templateObjstate.message)
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart,
      },

      
    },
  };

  const formats = [
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
    "background",
  ];

  return (
    <div>
      <CustomToolbar />
      <ReactQuill
        value={html}
        onChange={handleChange}
        placeholder={"New Beginning"}
        modules={modules}
        formats={formats}
        theme = 'snow'
      />
    </div>
  );
}

export default QuillEditorFunc;
