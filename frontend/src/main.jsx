import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import ExpertLoginSignUp from './components/ExpertLoginSignUp/ExpertLoginSignUp.jsx';
import UserLoginSignUp from './components/UserLoginSignUp/UserLoginSignUp.jsx';
import UserProfile from './pages/User/UserProfile.jsx';
import ExpertProfile from './pages/Expert/ExpertProfile.jsx';
import UserSearch from './pages/User/UserSearch.jsx';
import UpcomingAppointmentsPage from './pages/User/UserUpcomAppoint.jsx';
import ExpertUpcomingAppointmentsPage from './pages/Expert/ExpUpcomAppoint.jsx';
import ChatHome from './components/Chat/ChatHome.jsx';
import App from './components/Video/App.jsx';
import reportWebVitals from './components/Video/reportWebVitals.js';
import PaymentHistoryPage from './components/PaymentHistory/paymentHistory.jsx';
import PaymentSuccess from "./components/Card/PaymentSuccess";
import Contact from './pages/Contact/Contact.jsx';
import About from './pages/About/About.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />

      <Route path='expert/'>
        <Route path="login" element={<ExpertLoginSignUp />} />
        <Route 
          path="expertprofile" 
          element={
            <ProtectedRoute>
              <ExpertProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="appointments" 
          element={
            <ProtectedRoute>
              <ExpertUpcomingAppointmentsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="chat" element={<ChatHome />} />
        <Route path="video/*" element={<App />} />
      </Route>

      <Route path='user/'>
        <Route path="login" element={<UserLoginSignUp />} />
        <Route 
          path="userprofile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="usersearch" 
          element={
            <ProtectedRoute>
              <UserSearch />
            </ProtectedRoute>
          } 
        />
        <Route path="paymentsuccess" element={<PaymentSuccess />} />
        <Route path="paymenthistory" element={<PaymentHistoryPage />} />
        <Route 
          path="appointments" 
          element={
            <ProtectedRoute>
              <UpcomingAppointmentsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="chat" element={<ChatHome />} />
        <Route path="video/*" element={<App />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
