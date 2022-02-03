import React from 'react';
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./ReactQuillEditor.css";
import axios from 'axios';
import ImageResize from 'quill-image-resize-module-react';

// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';


// function LinearIndeterminate() {


//   return (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgress />
//     </Box>
//   );
// }



const CustomHeart = () => <i class="fas fa-image"></i>

function insertImage() {
 
  const Quilly = this.quill;
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.onchange = function (event) {
    
    const cursorPosition = Quilly.getSelection().index;
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }
    const formdata = new FormData();
    formdata.append("file",event.target.files[0])
    formdata.append("upload_preset","rtoxhzjk")

    axios.post("https://api.cloudinary.com/v1_1/asteric/image/upload",formdata,config)
    .then(response => response)
    .then(data => {
      Quilly.insertEmbed(
        cursorPosition,
        "image",
        data.data.secure_url,
      );
      Quilly.setSelection(cursorPosition + 1);
      console.log(data)
    })
    .catch(err => {
      console.log("Error shele",err.message)
    })

  };
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
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-insertImage">
      <CustomHeart />
    </button>
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
];
Quill.register(Font, true);
Quill.register('modules/imageResize', ImageResize);
class Editor extends React.Component {
  state = { editorHtml: "" };


  handleChange = (html) => {
   this.setState({ editorHtml: html });
   this.props.setHtml(html);
  };

  handleClear = ()=>{
    this.setState({ editorHtml: "" });
  }
  static modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertImage: insertImage,
      },
    },

    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
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
    "color",
  ];


  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          value={this.props.edihtml}
          onChange= {this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          
        />
      </div>
    );
  }
}

export default Editor;
