import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./ReactQuillEditor.css";





const CustomHeart = () => <span>♥</span>;

function insertHeart() {

  const Quilly = this.quill
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();


  input.onchange = function(){
    const cursorPosition = Quilly.getSelection().index;
    Quilly.insertText(cursorPosition, "♥");
    Quilly.insertEmbed(cursorPosition, "image", "https://cdn.pixabay.com/photo/2022/01/05/22/31/woman-6918210_960_720.jpg");
    Quilly.setSelection(cursorPosition + 1);
  }


 
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
  "lucida"
];
Quill.register(Font, true);


class Editor extends React.Component {


    state = { editorHtml: "" };

  handleChange = html => {
    this.setState({ editorHtml: html });
  };

  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart
      }
    }
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
    "color"
  ];



  sendData = () => {
    this.props.sendData(this.state.editorHtml);
}
  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />


        {console.log(this.state.editorHtml)}
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


export default Editor
