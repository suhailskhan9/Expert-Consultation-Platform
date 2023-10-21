// // ExpertCard.jsx

// import React from 'react';

// const ExpertCard = ({ expert }) => {
//   const { name, categories, price } = expert;

//   return (
//     <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-md shadow-md text-blue-900">
//       <h3 className="text-lg font-semibold mb-2">{name}</h3>
//       <p className="text-opacity-75 mb-2">{categories.join(', ')}</p>
//       <p className="text-opacity-75">{`Price: ${price}`}</p>
//       <div className="mt-4">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mr-2">
//           Call
//         </button>
//         <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md">
//           Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpertCard;


// ExpertCard.jsx
// import React from 'react';

// const ExpertCard = ({ expert }) => {
//   const { name, categories, price } = expert;

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md">
//       <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
//       <p className="text-gray-600 mb-2">{categories.join(', ')}</p>
//       <p className="text-lg text-blue-500 font-semibold">{`Price: ${price}`}</p>
//       <div className="mt-4 flex justify-between items-center">
//         <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
//           Call
//         </button>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
//           Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpertCard;



// ExpertCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';


const ExpertCard = ({ expert }) => {
  const { username, categories, price, availability, contact } = expert;
  console.log("inside expertcard")
  return (
   
    <div className="bg-blue-100 p-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2 text-blue-800">{username}</h3>
      <p className="text-gray-600 mb-2">{categories}</p>
      <p className="text-lg text-blue-500 font-semibold">{`Price: ${price}`}</p>
      <p className="text-gray-600 mt-2">{`Availability: ${availability}`}</p>
      <p className="text-gray-600 mt-2">{`Contact: ${contact}`}</p>
      <div className="mt-4 flex justify-between items-center">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
          Call
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Chat
        </button>
      </div>
    </div>
  );
};

// const ExpertList = () => {
//   const [experts, setExperts] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await axios.get('http://localhost:5000/api/experts'); // Replace with the actual URL of your backend API
//         setExperts(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error:', error);
//         // Handle error here
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {experts.map((expert) => (
//         <ExpertCard key={expert._id} expert={expert} />
//       ))}
//     </div>
//   );
// };

export default ExpertCard;

