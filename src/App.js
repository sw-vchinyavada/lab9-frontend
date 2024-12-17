import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TasksPage from './pages/tasks-page'
import LoginPage from './pages/login-page'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage setLoggedIn={setLoggedIn} setUsername={setUsername} />}
          />
          <Route path="/tasks" element={<TasksPage username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App