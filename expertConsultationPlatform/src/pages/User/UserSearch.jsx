import React,{ useState, useEffect } from 'react'
import ExpertCard from '../../components/Card/ExpertCard';
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import {LifeBuoy,User,Calendar,Inbox, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings, Mail, IndianRupee, LogOut, Video, Search, MessageCircle} from "lucide-react";


const expertData = [
    {
      id: 1,
      name: 'Dr. John Doe',
      categories: ['Medical', 'Cardiology'],
      price: '$50/hour',
    },
    {
      id: 2,
      name: 'Alice Smith, Esq.',
      categories: ['Legal', 'Family Law'],
      price: '$75/hour',
    },
    {
      id: 3,
      name: 'Financial Guru',
      categories: ['Finance', 'Investments'],
      price: '$100/hour',
    },
  ];
  


function UserSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [experts, setExperts] = useState([]);
  
    useEffect(() => {
      // Fetch data from your Express server
      fetch('/api/experts')
        .then((response) => response.json())
        .then((data) => setExperts(data))
        .catch((error) => console.error(error));
    }, []); // Run this effect only once when the component mounts
  
    const handleSearch = () => {
      // Perform search logic based on searchTerm
      const filteredResults = experts.filter((expert) =>
        expert.categories.includes(searchTerm)
      );
      setExperts(filteredResults);
    };
  
    return (
        <div className="flex">


        <Sidebar className="w-64">
            <SidebarItem
                icon = {<User size = {20} />}
                text = "Profile"
                
                />
            <SidebarItem icon = {<Search size={20}/>} text="Browse Experts"  active/>
            <SidebarItem icon = {<Inbox size={20} />} text="Inbox" />
            <SidebarItem icon = {<MessageCircle size={20} />} text="Chat"  />
            <SidebarItem icon = {<Video size={20} />} text="Video Call" alert />
            <SidebarItem icon = {<LogOut  />} text="Log Out" />
            <hr className="my-3"/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>

        <div className="flex-1 p-4">

      {/* <div className="container mx-auto mt-8">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search by category..."
            className="p-2 border border-gray-300 rounded-md mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div> */}
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
          <ExpertCard key={expert._id} expert={expert} />
        ))}
      </div>
    </div>
      
      </div>
      </div>
    );
}

export default UserSearch




