import { useState } from 'react'
import {Routes, Route, useLocation} from "react-router-dom"
import Login from './pages/Login'
// import Register from './pages/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import Services from './pages/Services'
// import BookingForm from './pages/Booking'
import Admin from './pages/Admin'
import ContactUs from './pages/Contact'
import DriverForm from './pages/DriverForm'
import MessageForm from './pages/Message'
import ScrollToTop from './components/Scroll/Scroll'
import Privacy from './pages/Privacy'





function App() {
const location = useLocation()
const isLoginPage = location.pathname === '/login';
const isregisterPage = location.pathname === '/register';
  return (
    <>
      {/* show navbar for all pages except login and register */}
      <ScrollToTop/>
    {!isLoginPage && !isregisterPage && <Navbar/>}
      <Routes>
       
        {/* <Route path='/login' element ={<Login/>}/> */}
        {/* <Route path='/register' element ={<Register/>}/> */}
        <Route path='/' element ={<Home/>}/>

        <Route path='/about' element ={<About/>}/>
        <Route path='/services' element ={<Services/>}/>

        {/* <Route path='/' element={<ClientTestimony />} /> */}
        {/* <Route path='/booking' element={<BookingForm/>} /> */}
        <Route path='/admin' element={<Admin/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/driver-form' element={<DriverForm/>} />
        <Route path='/privacy' element={<Privacy/>} />
        {/* <Route path='/message' element={<MessageForm/>} /> */}
        
        

      </Routes>
       {/* show footer for all pages except login and register */}
      {!isLoginPage && !isregisterPage && <Footer />}
    </>
  )
}

export default App
