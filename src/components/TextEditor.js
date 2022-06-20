import React, {useEffect, useRef, useCallback} from 'react'
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import Quill from 'quill';
import 'quill/dist/quill.snow.css'

// const Component = styled.div`
//     background: #F5F5F5;
// `

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
];

const TextEditor = () => {
    // useEffect(() => {
    //     const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
    // }, []);

    const wrapperx = useCallback((wrapper)=>{
        if(wrapper===null){
            return;
        }
        wrapper.innerHTML="";
        const editor = document.createElement("div")
        wrapper.append(editor);
        const quillserver = new Quill(editor, {theme:"snow", modules:{toolbar:toolbarOptions}})
    },[])
    return (
        <Box className='container' id='container' ref={wrapperx}></Box>
        // <Component>
        //     <Box className='container' id='container' ref={wrapperx}></Box>
        // </Component>
    )
}

// useEffect(() => {
//     const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
// }, []);

// return (
//     <Component>
//         <Box className='container' id='container'></Box>
//     </Component>
// )

// // additional toolbar specs from Quill
// const toolbarOptions = [
//     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//     ['blockquote', 'code-block'],
  
//     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//     [{ 'direction': 'rtl' }],                         // text direction
  
//     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
//     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//     [{ 'font': [] }],
//     [{ 'align': [] }],
  
//     ['clean']                                         // remove formatting button
//   ];
  

// const Component = styled.div`
//   background: #F5F5F5;
// `

// const TextEditor = () => {
//     const wrapperx = useCallback((wrapper)=>{
//         if(wrapper===null){
//             return;
//         }
//         wrapper.innerHTML="";
//         const editor = document.createElement("div")
//         wrapper.append(editor);
//         new Quill(editor, {theme:"snow", modules:{toolbar:toolbarOptions}})
//     },[])

//   return (
//         <Component>
//             <Box className='container' id="container" ref={wrapperx}></Box> 
//         </Component>
//   )
// }

export default TextEditor