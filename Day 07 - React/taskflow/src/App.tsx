import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
function App() {

  return (
    <div className="app">
      <Header userName="Mostafa" />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <TaskList />
        </main>
      </div>
    </div>
  )
}

export default App
