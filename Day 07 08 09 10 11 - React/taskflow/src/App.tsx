import { Route, Routes } from 'react-router'
import './App.css'
import AppLayout from './layouts/AppLayout'
import TasksPage from './pages/TasksPage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectPage from './pages/ProjectPage'
import DahsboardPage from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route element={<ProtectedRoute/>}>
        <Route element={<AppLayout />}>
        <Route index element={<TasksPage />} />
        <Route path='dashboard' element={<DahsboardPage />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Route>
    </Routes>
  )
}

export default App
