import React, {useEffect, useCallback, useState} from 'react'
import Box from '@mui/material/Box';
import styled from '@emotion/styled'
import Quill from 'quill';
import { useParams } from 'react-router-dom';
import {io} from "socket.io-client"
import 'quill/dist/quill.snow.css'

const Component = styled.div`
    background: #F5F5F5;
`
// additional specs
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

    const [quill, setQuill] = useState();
    const [socket, setSocket] = useState();
    const {id} = useParams();
    // console.log(id);

    const wrapperx = useCallback((wrapper)=>{
        if(wrapper===null){
            return;
        }
        wrapper.innerHTML="";
        const editor = document.createElement("div")
        wrapper.append(editor);
        const quillServer = new Quill(editor, {theme:"snow", modules:{toolbar:toolbarOptions}})
        setQuill(quillServer);
        quillServer.disable();
        quillServer.setText('Loading your documet...Please wait.');
    },[]);

    useEffect(()=>{
        const socketServer = io("http://localhost:9000")
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    },[])

    useEffect(()=>{
            if(socket===null || quill === null){
                return;
            }
            const handleChange = (delta, oldDelta, source) =>{
                if(source==='user'){
                    socket && socket.emit('send-changes', delta);
                }
            }

            quill && quill.on('text-change', handleChange);

            return()=>{
                quill && quill.off('text-change', handleChange);
            }
    },[quill,socket])

    useEffect(()=>{
        if(socket===null || quill === null){
            return;
        }
        const handleChange = (delta) =>{
            quill.updateContents(delta);
        }

        socket && socket.on('receive-changes', handleChange);

        return()=>{
            socket && socket.off('receive-changes', handleChange);
        }
    },[quill,socket])

    useEffect(()=>{
        if(quill === null || socket === null){
            return;
        }

        socket && socket.once('load-document', document=>{
            quill && quill.setContents(document);
            quill && quill.enable();
        })

        socket && socket.emit('get-document', id);
    }, [id, quill, socket])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const interval = setInterval(() => {
            socket && socket.emit('save-document', quill.getContents())
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [socket, quill]);

    return (
        // <Box className='container' id='container' ref={wrapperx}></Box>
        <Component>
            <Box className='container' id='container' ref={wrapperx}></Box>
        </Component>
    )
// }

// useEffect(() => {
//     const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
//     //ffssdsd
// }, []);

// return (
//     <Component>
//         <Box className='container' id='container'></Box>
//     </Component>
// )

}

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