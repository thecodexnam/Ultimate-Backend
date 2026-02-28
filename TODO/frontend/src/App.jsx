import React from 'react'
import NavBar from './component/NavBar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './component/AddTask'
import TaskList from './component/TaskList'
import UpdateTask from './component/UpdateTask'
import Login from './component/Login'
import Signup from './component/SignUp'

const App = () => {
  return (
    <>
      <NavBar/>
    <Routes>
      <Route path='/' element={<TaskList/>}/>
      <Route path='/add' element={<AddTask/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/update/:id' element={<UpdateTask/>}/>
    </Routes>
    </>
  )
}

export default App