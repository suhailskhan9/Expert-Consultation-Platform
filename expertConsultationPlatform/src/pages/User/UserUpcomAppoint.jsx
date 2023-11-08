// import React, { useState, useEffect } from 'react';

// const UpcomingAppointmentsPage = () => {
//   // Replace the following with actual data fetching logic
//   const fetchUpcomingAppointments = async () => {
//     try {
//       // Fetch upcoming appointments data from your backend
//       const response = await fetch('/api/upcoming-appointments');
//       const data = await response.json();
//       setAppointments(data);
//     } catch (error) {
//       console.error('Error fetching upcoming appointments:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch upcoming appointments when the component mounts
//     fetchUpcomingAppointments();
//   }, []);

//   const [appointments, setAppointments] = useState([]);

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
//       {appointments.length === 0 ? (
//         <p>No upcoming appointments.</p>
//       ) : (
//         <ul>
//           {appointments.map((appointment) => (
//             <li key={appointment.id}>
//               <div>
//                 <p className="text-lg font-semibold">{`Expert: ${appointment.expertName}`}</p>
//                 <p>{`Date: ${appointment.date}`}</p>
//                 <p>{`Time: ${appointment.time}`}</p>
//               </div>
//               {/* Add video and chat options here */}
//               <div className="mt-2">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
//                   Start Video Call
//                 </button>
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
//                   Start Chat
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UpcomingAppointmentsPage;


import React, { useState, useEffect } from 'react';
import Sidebar,{SidebarItem} from '../../components/Sidebar';
import { User, Search, Inbox, MessageCircle, Video, LogOut, Settings, LifeBuoy, Calendar } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const UpcomingAppointmentsPage = () => {
  // Sample static data for upcoming appointments
  // const staticAppointments = [
    // {
    //   id: 1,
    //   expertName: 'Dr John Doe',
    //   date: 'October 23, 2023',
    //   time: '10:00 AM - 11:00 AM',
    // },
    // {
    //   id: 2,
    //   expertName: 'Alice Smith',
    //   date: 'October 26, 2023',
    //   time: '2:00 PM - 3:00 PM',
    // },
    // {
    //   id: 3,
    //   expertName: 'Ritik Shukla',
    //   date: 'October 26, 2023',
    //   time: '8:00 AM - 9:00 AM',
    // },
    // Add more sample appointments as needed
  // ];

  const location = useLocation();
  const userdata = location.state
  // console.log(userdata);
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [appointments, setAppointments] = useState([]);

  async function fetchUserId() {
    try {
      const response = await axios.get(`http://localhost:5000/getUserData?email=${userdata.email}`);
      const userData = response.data;
      if (userData && userData.length > 0 && userData[0]._id) {
        setUserId(userData[0]._id);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }
  console.log(userId)

  
  // Fetch booked appointments once we have the user's ID
  async function fetchBookedAppointments() {
    try {
      console.log(userId)
      if (userId) {
        // console.log("fetched")

        const response = await axios.get(`http://localhost:5000/booked-appointments?userId=${userId}`);
        const bookedAppointments = response.data;
        setAppointments(bookedAppointments);
        console.log(appointments)
      }
    } catch (error) {
      console.error('Error fetching booked appointments:', error);
    }
  }

  useEffect(() => {
    fetchUserId();
    fetchBookedAppointments();
  }, [userId]);

  const handleStartChat = () => {
    navigate('/user/chat');
  };
  const handleStartvideo = () => {
    navigate('/user/video');
  };
  return (
<div className="flex">
      <Sidebar className="w-64">
  <SidebarItem icon={<User size={20} />} text="Profile" to="/user/userprofile" state={userdata} />
  <SidebarItem icon={<Search size={20} />} text="Browse Experts" to="/user/usersearch" state={userdata} />
  <SidebarItem icon={<Inbox size={20} />} text="Payment History" to="/user/paymenthistory" state={userdata} />
  <SidebarItem icon={<Calendar size={20} />} text="Upcoming Appointments"  active />
  <SidebarItem icon={<LogOut />} text="Log Out" to={"/"} state={null}/>
  <hr className="my-3" />
  <SidebarItem icon={<Settings size={20} />} text="Settings" />
  <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
</Sidebar>

      <div className="flex-1 p-4">
      <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <div>
                <p className="text-lg font-semibold">{`Expert: ${appointment.expertId.username}`}</p>
                <p className="text-lg font-semibold">{`Client: ${appointment.userId.username}`}</p>
                <p>{`Date and Time: ${appointment.appointmentSlot}`}</p>
                {/* <p>{`Time: ${appointment.time}`}</p> */}
              </div>
              {/* Add video and chat options here */}
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2" onClick={handleStartvideo}>
                  Start Video Call
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" onClick={handleStartChat}>
                  Start Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
      </div>
    </div>


   
  );
};

export default UpcomingAppointmentsPage;
