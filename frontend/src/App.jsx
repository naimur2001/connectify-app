import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './Components/Strore/useAuthStore'
import  { Toaster } from 'react-hot-toast';
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
console.log({onlineUsers})
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
console.log({authUser})

if (isCheckingAuth && !authUser) {
  return < >
  <div className='flex justify-center items-center  h-screen'>
  <span className="loading loading-bars loading-lg"></span>
  <span className="loading loading-bars loading-xl"></span>
  <span className="loading loading-bars loading-lg"></span>
  <span className="loading loading-bars loading-xl"></span>
  </div>
  </>
}

  return (
   <div>


  <Routes>
    <Route  path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"} />}  />
    <Route  path='/signup' element={ !authUser ? <SignupPage/> : <Navigate to={"/"} />}  />
    <Route  path='/login' element={ !authUser ? <LoginPage/> : <Navigate to={"/"} />  }  />
    <Route  path='/settings' element={<SettingsPage/>}  />
    <Route  path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to={"/login"} /> }  />
   
  </Routes>
<Toaster/>
   </div>
  )
}

export default App