import React,{ useState, useEffect } from 'react'
import ExpertCard from '../../components/Card/ExpertCard';
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import {LifeBuoy,User,Calendar,Inbox, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings, Mail, IndianRupee, LogOut, Video, Search, MessageCircle} from "lucide-react";
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// const expertData = [
//     {
//       id: 1,
//       name: 'Dr. John Doe',
//       categories: ['Medical', 'Cardiology'],
//       price: '$50/hour',
//     },
//     {
//       id: 2,
//       name: 'Alice Smith, Esq.',
//       categories: ['Legal', 'Family Law'],
//       price: '$75/hour',
//     },
//     {
//       id: 3,
//       name: 'Financial Guru',
//       categories: ['Finance', 'Investments'],
//       price: '$100/hour',
//     },
//   ];
  


function UserSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [experts, setExperts] = useState([]);
    const [selectedExpert, setSelectedExpert] = useState(null);
  
    const handleSearch = async () => {
      // Perform search logic based on searchTerm
      try {
        const response = await axios.get('http://localhost:5000/api/experts'); // Replace with the actual URL of your backend API
        const filteredResults = response.data.filter((expert) =>
          expert.categories.includes(searchTerm)
        );
        setExperts(filteredResults);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error here
      }
    };
    
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('http://localhost:5000/api/experts'); // Replace with the actual URL of your backend API
          setExperts(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
          // Handle error here
        }
      }
  console.log("Expert List called")
      fetchData();
    }, []);

    const handleBookAppointmentClick = (expertData) => {
      setSelectedExpert(expertData);
      // console.log(expertData)
    };
  
  const location = useLocation();
  const userdata = location.state
  console.log(userdata)
  
    return (
        <div className="flex">


            <Sidebar className="w-64">
              <SidebarItem icon={<User size={20} />} text="Profile" state={userdata}  to="/user/userprofile" />
              <SidebarItem icon={<Search size={20} />} text="Browse Experts"   active/>
              <SidebarItem icon={<Inbox size={20} />} text="Payment History" to="/user/paymenthistory" state={userdata} />
              <SidebarItem icon={<Calendar size={20} />} text="Upcoming Appointments" to="/user/appointments" state={userdata? userdata:{}} />
              {/* Replace "Chat" and "Video Call" options with "Upcoming Appointments" */}
              <SidebarItem icon={<LogOut />} text="Log Out" to={"/"} state={null}/>
              <hr className="my-3" />
              <SidebarItem icon={<Settings size={20} />} text="Settings" />
              <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
            </Sidebar>

        <div className="flex-1 p-4">

<div className="container mx-auto mt-8">
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by category..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

           {experts.map((expert) => (
            <ExpertCard key={expert._id} 
            expert={expert} 
            onBookAppointmentClick={handleBookAppointmentClick}
            userdata = {userdata}
            />
          ))}
          
        </div>

    </div>
      
      </div>
      </div>
    );
}

export default UserSearch




// import React, { useState, useEffect } from 'react';
// import ExpertCard from '../../components/Card/ExpertCard';
// import Sidebar, { SidebarItem } from "../../components/Sidebar";
// import { LifeBuoy, User, Inbox, MessageCircle, Video, LogOut, Settings, Search } from "lucide-react";

// const expertData = [
//   {
//     id: 1,
//     name: 'Dr. John Doe',
//     categories: ['Medical', 'Cardiology'],
//     price: '$50/hour',
//   },
//   {
//     id: 2,
//     name: 'Alice Smith, Esq.',
//     categories: ['Legal', 'Family Law'],
//     price: '$75/hour',
//   },
//   {
//     id: 3,
//     name: 'Financial Guru',
//     categories: ['Finance', 'Investments'],
//     price: '$100/hour',
//   },
// ];

// function UserSearch() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [experts, setExperts] = useState(expertData);

//   const handleSearch = () => {
//     // Perform search logic based on searchTerm
//     const filteredResults = expertData.filter((expert) =>
//       expert.categories.includes(searchTerm)
//     );
//     setExperts(filteredResults);
//   };

//   return (
//     <div className="flex">
//       <Sidebar className="w-64">
//         <SidebarItem icon={<User size={20} />} text="Profile" />
//         <SidebarItem icon={<Search size={20} />} text="Browse Experts" active />
//         <SidebarItem icon={<Inbox size={20} />} text="Inbox" />
//         <SidebarItem icon={<MessageCircle size={20} />} text="Chat" />
//         <SidebarItem icon={<Video size={20} />} text="Video Call" alert />
//         <SidebarItem icon={<LogOut />} text="Log Out" />
//         <hr className="my-3" />
//         <SidebarItem icon={<Settings size={20} />} text="Settings" />
//         <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
//       </Sidebar>

//       <div className="flex-1 p-4">
//         <div className="container mx-auto mt-8">
//           <div className="flex items-center justify-center">
//             <input
//               type="text"
//               placeholder="Search by category..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//               onClick={handleSearch}
//             >
//               Search
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             {experts.map((expert) => (
//               <ExpertCard key={expert.id} expert={expert} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserSearch;
