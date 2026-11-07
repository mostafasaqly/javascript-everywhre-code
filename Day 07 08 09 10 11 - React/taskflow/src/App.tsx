import { Route, Routes } from 'react-router'
import './App.css'
import AppLayout from './layouts/AppLayout'
import TasksPage from './pages/TasksPage'
import NotFoundPage from './pages/NotFoundPage'
import ProjectPage from './pages/ProjectPage'
function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<TasksPage />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
