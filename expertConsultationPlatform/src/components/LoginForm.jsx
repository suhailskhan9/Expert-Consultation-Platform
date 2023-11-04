/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { useNavigate, Navigate } from 'react-router-dom';

function LoginForm({ userType, toggleMode, leftPanel, rightPanel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate(); // for navigation

 
  const handleLogin = async (e) => {
    e.preventDefault();

    let response;

    try {
      if(userType === "User"){
        response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });
      }
      else{
        response = await axios.post('http://localhost:5000/expert/login', {
        email,
        password,
      });
      }

     if (response.status === 200) {
        console.log('Login successful');
        if (userType === "User") {
          navigate('/user/userprofile', { state: { email } });
        } else {
          navigate('/expert/expertprofile', { state: { email } });
        }
      } else {
        console.log('Login failed');
        // Check for specific error messages from the server
        if (response.data && response.data.message) {
          setError(response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    } catch (error) {
  console.error('Error:', error);
  // Check for different types of errors
  if (error.response) {
    if (error.response.status === 401) {
      // Check for specific error messages from the server
      if (error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Incorrect email or password");
      }
    } else if (error.response.status === 404) {
      setError("Account not found. Please sign up.");
    } else {
      setError("An error occurred. Please try again.");
    }
  } else if (error.request) {
    setError("No response from the server. Please try again later.");
  } else {
    setError("An error occurred. Please try again.");
  }
}
  };

  return (
    <div className="bg-blue-100 flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-3/5 max-w-4xl">
          <div className={`w-3/5 p-5 ${leftPanel}`}>
            <div className="text-left font-bold">
              <span className="text-blue-400">Get Advice,</span> Get Wise...
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">{userType} Sign In</h2>
              <div className="border-2 w-10 border-blue-400 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className="text-gray-400 my-3">or use your email account</p>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between w-64 mb-5">
                    <label htmlFor="" className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs">
                      Forgot Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-400 hover:text-white"
                  >
                    Sign In
                  </button>
                </div>
              </form>
               {/* Display error message */}
      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}
            </div>
          </div>
          <div className={`w-2/5 bg-blue-400 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12 ${rightPanel}`}>
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <div className="border-2 w-10 border-white inline-block"></div>
            <p className="mb-10">To keep connected with us, please login with your personal info.</p>
            <button onClick={toggleMode} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400 ">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

