import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App