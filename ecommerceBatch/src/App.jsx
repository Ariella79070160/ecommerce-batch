import { useState } from 'react'
import './App.css'
import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
