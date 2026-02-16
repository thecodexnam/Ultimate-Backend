import React from 'react'
import NavBar from './component/NavBar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './component/AddTask'
import TaskList from './component/TaskList'

const App = () => {
  return (
    <>
      <NavBar/>
    <Routes>
      <Route path='/' element={<TaskList/>}/>
      <Route path='/add' element={<AddTask/>}/>
    </Routes>
    </>
  )
}

export default App