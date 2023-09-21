/* eslint-disable react/prop-types */
import {FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope, FaUser} from 'react-icons/fa'

import {MdLockOutline} from 'react-icons/md'


function SignupForm({ userType, toggleMode, leftPanel,rightPanel }) {
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            
        <div className=" flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        
            <div className="bg-white rounded-2xl shadow-2xl flex w-3/5  max-w-4xl">

                <div className={`w-2/5 bg-blue-400 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12 ${leftPanel}`}>
                
                    <h2 className="text-3xl font-bold mb-2">Create account</h2>
                    <div className="border-2 w-10 border-white inline-block"></div>
                    <p className="mb-10">Fill up personal information and start journey with us.</p>
                    <button onClick={toggleMode} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400">Sign In</button>
                </div>


                <div className={`w-3/5 p-5 ${rightPanel} `}>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-blue-400 mb-2">{userType} Sign Up</h2>
                        <div className="border-2 w-10 border-blue-400 inline-block mb-2"></div>
                        <div className="flex justify-center my-2">
                            <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                <FaFacebookF className='text-sm'/>
                            </a>

                            <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                <FaLinkedinIn className='text-sm'/>
                            </a>

                            <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                                <FaGoogle className='text-sm'/>
                            </a>
                        </div>

                        

                        <div className="flex flex-col items-center">
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3"><FaUser className='text-gray-400 m-2'/>
                                <input type="text" name='name' placeholder='Name' className='bg-gray-100 outline-none text-sm flex-1'/>
                            </div>


                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3"><FaRegEnvelope className='text-gray-400 m-2'/>
                                <input type="email" name='email' placeholder='Email' className='bg-gray-100 outline-none text-sm flex-1'/>
                            </div>

                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3"><MdLockOutline className='text-gray-400 m-2'/>
                            <input type="password" name='password' placeholder='Password' className='bg-gray-100 outline-none text-sm flex-1'/>
                            </div>

                            <div className="flex justify-between w-64 mb-5">
                                <label htmlFor="" className="flex items-center text-xs"><input type="checkbox" name="remember" className='mr-1'/>Remember me</label>
                                <a href="#" className='text-xs'>Forgot Password?</a>
                            </div>

                            <a href="#" className="border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-400 hover:text-white">Sign Up</a>
                        
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    );
  }
  
  export default SignupForm;