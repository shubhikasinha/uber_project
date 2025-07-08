import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainContext from './context/CaptainContext'

const App = () => {
  return (
    <div>
      <CaptainContext>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<UserProtectWrapper>
            < HomePage />
          </UserProtectWrapper>} />
          <Route path="/captain-home" element={<CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>}/>
          
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-signup" element={<CaptainSignup />} />
          <Route path = '/user/logout' element={
            <UserProtectWrapper>
              <UserLogout/>
            </UserProtectWrapper>
          } />
        </Routes>
      </CaptainContext>
    </div>
  )
}

export default App
