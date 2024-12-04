import { useState } from 'react'
import './App.css'
import Navbar from './components/ui/Navbar'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProductListingPage from './pages/ProductListing/ProductListingPage'
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route
              path="/products/:productId"
              element={<ProductDetailPage />}
            />
        </Route>
      </Routes>
    </>
  )
}

export default App
