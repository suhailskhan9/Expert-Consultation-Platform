import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import ExpertLoginSignUp from './components/ExpertLoginSignUp/ExpertLoginSignUp.jsx'
import UserLoginSignUp from './components/UserLoginSignUp/UserLoginSignUp.jsx'
import UserProfile from './pages/User/UserProfile.jsx'
import ExpertProfile from './pages/Expert/ExpertProfile.jsx'
import UserSearch from './pages/User/UserSearch.jsx'
import UpcomingAppointmentsPage from './pages/User/UserUpcomAppoint.jsx'
import ExpertUpcomingAppointmentsPage from './pages/Expert/ExpUpcomAppoint.jsx'
import ChatHome from './components/Chat/ChatHome.jsx'
import App from './components/Video/App.jsx'
import reportWebVitals from './components/Video/reportWebVitals.js'
import PayementHistoryPage from './components/PaymentHistory/paymentHistory.jsx'
import PaymentSuccess from "./components/Card/PaymentSuccess";
import Contact from './pages/Contact/Contact.jsx'
import About from './pages/About/About.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout/>}>
      <Route path='' element = {<Home/>}/>
      <Route path='contact' element = {<Contact/>}/>
      <Route path='about' element = {<About/>}/>
      
      <Route path='expert/'  >
      <Route path="login" element = {<ExpertLoginSignUp/>} /> 
        <Route path="expertprofile" element={<ExpertProfile />} />
        <Route path="appointments" element={<ExpertUpcomingAppointmentsPage />} />
        <Route path="chat" element={<ChatHome />} />
        <Route path="video/*" element={<App />} />
      </Route>
      
      <Route path='user/' >
        <Route path="login" element = {<UserLoginSignUp/>} />  
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="usersearch" element={<UserSearch />} />
        <Route path="paymentsuccess" element={<PaymentSuccess />} />
        <Route path="paymenthistory" element={<PayementHistoryPage />} />
        <Route path="appointments" element={<UpcomingAppointmentsPage />} />
        <Route path="chat" element={<ChatHome />} />
        <Route path="video/*" element={<App />} />
      </Route>
   
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)

reportWebVitals();