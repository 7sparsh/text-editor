import './App.css';
import {  BrowserRouter as Router,  Routes,  Route, Navigate} from "react-router-dom";
import TextEditor from './components/TextEditor';
import {v4 as uuid} from "uuid";
// import ReactDOM from 'react-dom';

function App() {
  return (


    <Router>
      <Routes>
          {/* if path is empty generate new uid and navigate to it. */}
          <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} /> } /> 
          <Route path='/docs/:id' element={<TextEditor/>}  />
      </Routes>
    </Router>
    
      // <div className="App">
      //   <TextEditor/>
      // </div>
  );
}


export default App;
