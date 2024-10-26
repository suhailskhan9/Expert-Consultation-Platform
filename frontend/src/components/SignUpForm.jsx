// /* eslint-disable react/prop-types */
// import React, { useState } from 'react';
// import { FaUser, FaRegEnvelope } from 'react-icons/fa';
// import { MdLockOutline } from 'react-icons/md';
// import axios from 'axios';

// function SignupForm({ userType, toggleMode, leftPanel, rightPanel }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const userData = {
//       name,
//       email,
//       password,
//     };

//     try {
//       const response = await axios.post('http://localhost:5173/user', userData);
//       console.log(response.data); // You can handle the response here
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-100">
//       <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <div className="bg-white rounded-2xl shadow-2xl flex w-3/5 max-w-4xl">
//           <div className={`w-2/5 bg-blue-400 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12 ${leftPanel}`}>
//             <h2 className="text-3xl font-bold mb-2">Create account</h2>
//             <div className="border-2 w-10 border-white inline-block"></div>
//             <p className="mb-10">Fill up personal information and start your journey with us.</p>
//             <button onClick={toggleMode} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400">Sign In</button>
//           </div>
//           <div className={`w-3/5 p-5 ${rightPanel}`}>
//             <div className="py-10">
//               <h2 className="text-3xl font-bold text-blue-400 mb-2">{userType} Sign Up</h2>
//               <div className="border-2 w-10 border-blue-400 inline-block mb-2"></div>
//               <form className="flex flex-col items-center" onSubmit={handleSubmit}>
//                 <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
//                   <FaUser className="text-gray-400 m-2" />
//                   <input
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     className="bg-gray-100 outline-none text-sm flex-1"
//                   />
//                 </div>
//                 <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
//                   <FaRegEnvelope className="text-gray-400 m-2" />
//                   <input
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     className="bg-gray-100 outline-none text-sm flex-1"
//                   />
//                 </div>
//                 <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
//                   <MdLockOutline className="text-gray-400 m-2" />
//                   <input
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="bg-gray-100 outline-none text-sm flex-1"
//                   />
//                 </div>
//                 <div className="flex justify-between w-64 mb-5">
//                   <label htmlFor="" className="flex items-center text-xs">
//                     <input type="checkbox" name="remember" className="mr-1" />
//                     Remember me
//                   </label>
//                   <a href="/forgotpassword" className="text-xs">Forgot Password?</a>
//                 </div>
//                 <button type="submit" className="border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover-bg-blue-400 hover-text-white">Sign Up</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignupForm;


/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaUser, FaRegEnvelope } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import axios from 'axios';

function SignupForm({ userType, toggleMode, leftPanel, rightPanel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: name,
      email,
      password,
    };

    let response; 

    try {
      if(userType === "User"){
        response = await axios.post('http://localhost:5000/user', data);
        
      }
      else{
        response = await axios.post('http://localhost:5000/expert', data);
      }
      console.log(response.data);

        // You can handle the response here
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-blue-100">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-3/5 max-w-4xl">
          <div className={`w-2/5 bg-blue-400 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12 ${leftPanel}`}>
            <h2 className="text-3xl font-bold mb-2">Create account</h2>
            <div className="border-2 w-10 border-white inline-block"></div>
            <p className="mb-10">Fill up personal information and start your journey with us.</p>
            <button onClick={toggleMode} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400">Sign In</button>
          </div>
          <div className={`w-3/5 p-5 ${rightPanel}`}>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">{userType} Sign Up</h2>
              <div className="border-2 w-10 border-blue-400 inline-block mb-2"></div>
              <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaUser className="text-gray-400 m-2" />
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <div className="flex justify-between w-64 mb-5">
                  <label htmlFor="" className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1" />
                    Remember me
                  </label>
                  <a href="/forgotpassword" className="text-xs">Forgot Password?</a>
                </div>
                <button type="submit" className="border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-400 hover:text-white">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
