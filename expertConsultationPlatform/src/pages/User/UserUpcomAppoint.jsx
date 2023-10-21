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


import React from 'react';
import Sidebar,{SidebarItem} from '../../components/Sidebar';
import { User, Search, Inbox, MessageCircle, Video, LogOut, Settings, LifeBuoy, Calendar } from "lucide-react";
import { useLocation } from 'react-router-dom';


const UpcomingAppointmentsPage = () => {
  // Sample static data for upcoming appointments
  const staticAppointments = [
    {
      id: 1,
      expertName: 'John Doe',
      date: 'October 25, 2023',
      time: '10:00 AM - 11:00 AM',
    },
    {
      id: 2,
      expertName: 'Jane Smith',
      date: 'October 26, 2023',
      time: '2:00 PM - 3:00 PM',
    },
    // Add more sample appointments as needed
  ];
  const location = useLocation();
  const userdata = location.state
  return (
<div className="flex">
      <Sidebar className="w-64">
  <SidebarItem icon={<User size={20} />} text="Profile" to="/user/userprofile" state={userdata} />
  <SidebarItem icon={<Search size={20} />} text="Browse Experts" to="/user/usersearch" state={userdata} />
  <SidebarItem icon={<Inbox size={20} />} text="Inbox" to="" />
  <SidebarItem icon={<Calendar size={20} />} text="Upcoming Appointments"  active />
  {/* Replace "Chat" and "Video Call" options with "Upcoming Appointments" */}
  <SidebarItem icon={<LogOut />} text="Log Out" />
  <hr className="my-3" />
  <SidebarItem icon={<Settings size={20} />} text="Settings" />
  <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
</Sidebar>

      <div className="flex-1 p-4">
      <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
      {staticAppointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul>
          {staticAppointments.map((appointment) => (
            <li key={appointment.id}>
              <div>
                <p className="text-lg font-semibold">{`Expert: ${appointment.expertName}`}</p>
                <p>{`Date: ${appointment.date}`}</p>
                <p>{`Time: ${appointment.time}`}</p>
              </div>
              {/* Add video and chat options here */}
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                  Start Video Call
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
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
