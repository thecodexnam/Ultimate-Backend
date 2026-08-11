import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar';
import AddTask from './component/AddTask';
import TaskList from './component/TaskList';
import Profile from './component/Profile';
import FocusMode from './component/FocusMode';
import Insights from './component/Insights';
import DailyPlanner from './component/DailyPlanner';
import UpdateTask from './component/UpdateTask';
import Login from './component/Login';
import Signup from './component/SignUp';
import ProtectedRoute from './component/ProtectedRoute';

// Keep the route setup centralized so it is easier to read and extend later.
const protectedRoutes = [
  { path: '/', element: <TaskList /> },
  { path: '/add', element: <AddTask /> },
  { path: '/update/:id', element: <UpdateTask /> },
  { path: '/planner', element: <DailyPlanner /> },
  { path: '/insights', element: <Insights /> },
  { path: '/focus', element: <FocusMode /> },
  { path: '/profile', element: <Profile /> },
];

const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
];

const App = () => {
  return (
    <>
      <NavBar />

      {/* Shared wrapper keeps the page layout consistent across screens. */}
      <main className="app-shell">
        <Routes>
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}

          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default App;