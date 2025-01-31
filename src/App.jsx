import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import { LandingPage } from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import { UserDashboard } from './components/UserDashBoard'
import { CarListings } from './components/CarListings'
import { MyCarListing } from './components/MyCarListing'
import React from 'react'
import { NewCar } from './components/NewCar'

// Create AuthContext to manage authentication state
export const AuthContext = React.createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        <Routes>
          {/* Redirect from root to landing page */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          {/* Main routes */}
          <Route path="/home" element={<LandingPage />} />
          
          <Route path="/dashboard" element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
          } />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          
          <Route path="/cars" element={<CarListings />} />
          
          {/* Protect the sell route */}
          <Route 
            path="/sell" 
            element={
              isAuthenticated ? (
                <MyCarListing />
              ) : (
                <Navigate to="/login" state={{ from: '/sell' }} />
              )
            } 
          />
          
          {/* Protect the add car route */}
          <Route 
            path="/add-car" 
            element={
              isAuthenticated ? (
                <NewCar />
              ) : (
                <Navigate to="/login" state={{ from: '/add-car' }} />
              )
            } 
          />
          
          {/* Catch all route - redirects to landing page */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
