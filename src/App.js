import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router";
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Login from './Components/Login/Login';
import AddQuestions from './Components/AddQuestions/AddQuestions';
import Questions from './Components/Questions/Questions';
import Practice from './Components/Practice/Practice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path="/" element={<Wrapper><Practice/></Wrapper>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/addQuestions" element={<Wrapper><AddQuestions/></Wrapper>}/>
        <Route path="/questions" element={<Wrapper><Questions/></Wrapper>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Wrapper({ children }){
  return (
    <div className="background w-full h-[100vh] font-[Open_sans]">
      <Navbar/>
      <div className='app'>
        { children }
      </div>
    </div>
  )
}