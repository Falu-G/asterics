import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6
import "./ReactQuillEditor.css";




const CustomHeart = () => <span>♥</span>;

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}



function insertImage(){
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.onchange = function(){
    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);

    
    fetch("https://api.cloudinary.com/v1_1/asteric/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, "image", "https://cdn.pixabay.com/photo/2022/01/05/22/31/woman-6918210_960_720.jpg");
        this.quill.setSelection(range.index + 1);
      })
      .catch(err =>{
        console.log(err.message);
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, "image", "https://cdn.pixabay.com/photo/2022/01/05/22/31/woman-6918210_960_720.jpg");
        this.quill.setSelection(range.index + 1);
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


function ReactQuillEditor({html, setHtml,setEmailContent,emailContent,setScheduleMessage,scheduleMessage}) {
  const handleChange = (html) => {
    //this.setState({ editorHtml: html });
    setHtml(html);

    if(emailContent){
      setEmailContent({...emailContent,messageBody:html})
      console.warn(emailContent.messageBody)
    }
    
    if(scheduleMessage){
      setScheduleMessage({...scheduleMessage,messageBody:html})
      console.log(scheduleMessage.messageBody)
    }
    
    
  };

  const imageHandler = () => {

    console.log("imageHandler")
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = {insertImage}
    
    // function(){
    //   const file = input.files[0];
    //   const formData = new FormData();
    //   formData.append("image", file);

    //   fetch("https://api.cloudinary.com/v1_1/asteric/image/upload", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const range = this.quill.getSelection();
    //       this.quill.insertEmbed(range.index, "image", data.url);
    //       this.quill.setSelection(range.index + 1);
    //     });
    // };
    } 
    
  //   => {
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append("image", file);

  //     fetch("https://api.cloudinary.com/v1_1/asteric/image/upload", {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const range = this.quill.quillEditor.getSelection();
  //         this.quill.quillEditor.insertEmbed(range.index, "image", data.url);
  //         this.quill.quillEditor.setSelection(range.index + 1);
  //       });
  //   };
  // };

  const modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertHeart: insertHeart,
        image:imageHandler,
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
      />
    </div>
  );
}

export default ReactQuillEditor;
