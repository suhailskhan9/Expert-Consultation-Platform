import React from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './Layout.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import ExpertLoginSignUp from './components/ExpertLoginSignUp/ExpertLoginSignUp.jsx'
import UserLoginSignUp from './components/UserLoginSignUp/UserLoginSignUp.jsx'
import UserHome from './pages/User/UserHome'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout/>}>
      <Route path='' element = {<Home/>}/>
      <Route path='expert' element = {<ExpertLoginSignUp/>}/>
      <Route path='user' element = {<UserLoginSignUp/>}/>
      <Route path="userHome" element={<UserHome />} />
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
