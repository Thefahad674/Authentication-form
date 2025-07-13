 import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUP from './pages/SignUP'
import Login from './pages/Login'
 
 const App = () => {
   return (
      <Routes>
        <Route path="/signup" element={<SignUP/>}/>
        <Route path="/login" element={<Login/>}/>
         
      </Routes>
   )
 }
 
 export default App