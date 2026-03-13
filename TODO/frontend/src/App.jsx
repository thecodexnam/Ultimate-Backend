import React from 'react'
import NavBar from './component/NavBar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './component/AddTask'
import TaskList from './component/TaskList'
import UpdateTask from './component/UpdateTask'
import DailyPlanner from './component/DailyPlanner'
import Insights from './component/Insights'
import Login from './component/Login'
import Signup from './component/SignUp'

import ProtectedRoute from './component/ProtectedRoute'

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
        } />
        <Route path='/add' element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        } />
        <Route path='/update/:id' element={
          <ProtectedRoute>
            <UpdateTask />
          </ProtectedRoute>
        } />
        <Route path='/planner' element={
          <ProtectedRoute>
            <DailyPlanner />
          </ProtectedRoute>
        } />
        <Route path='/insights' element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App