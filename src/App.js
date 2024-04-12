import React from 'react'
import './App.css';
import Homepage from './Components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Postpage from './Components/Postpage'

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Homepage/>}></Route>
   <Route path='/Postpage' element={<Postpage/>}></Route>
   </Routes>
   </BrowserRouter>
   
  )
}

export default App
