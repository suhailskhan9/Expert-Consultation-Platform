
import React from 'react';
import Sidebar,{SidebarItem} from '../../components/Sidebar';
import { User, Search, Inbox, MessageCircle, Video, LogOut, Settings, LifeBuoy, Calendar } from "lucide-react";
import { useLocation } from 'react-router-dom';


const ExpertUpcomingAppointmentsPage = () => {
  // Sample static data for upcoming appointments
  const staticAppointments = [
    {
      id: 1,
      userName: 'John Doe',
      date: 'October 25, 2023',
      time: '10:00 AM - 11:00 AM',
    },
    {
      id: 2,
      userName: 'Jane Smith',
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
  <SidebarItem icon={<User size={20} />} text="Profile" to="/expert/expertprofile" state={userdata} />
  <SidebarItem icon={<Calendar size={20} />} text="Upcoming Appointments"  active />
  <SidebarItem icon={<Inbox size={20} />} text="Inbox" to="" />
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
                <p className="text-lg font-semibold">{`User: ${appointment.userName}`}</p>
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

export default ExpertUpcomingAppointmentsPage;
