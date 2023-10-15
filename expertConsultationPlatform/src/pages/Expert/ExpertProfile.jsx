import { useState } from "react";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import {LifeBuoy,User,Calendar,Inbox, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings, Mail, IndianRupee, LogOut, Video, MessageCircle} from "lucide-react";


export default function ExpertProfile(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        specialization: "",
        // Add more fields as needed
      });

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to a server
        console.log("Form submitted with data:", formData);
      };


return(


    <div className="flex">


        <Sidebar className="w-64">
            <SidebarItem
                icon = {<User size = {20} />}
                text = "Profile"
                active
                />
            <SidebarItem icon = {<Calendar size={20}/>} text="Calendar" />
            <SidebarItem icon = {<Inbox size={20} />} text="Inbox" />
            <SidebarItem icon = {<MessageCircle size={20} />} text="Chat"  />
            <SidebarItem icon = {<Video size={20} />} text="Video Call" alert />
            <SidebarItem icon = {<LogOut size={20} />} text="Log Out" />
            <hr className="my-3"/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>

        <div className="flex-1 p-4">
        <p>This is the content of the right side container.</p>
        {/* Add more content as needed */}


       {/* Right side container with user profile form */}
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-600">
              Specialization:
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Add more form fields as needed */}
          
          <button type="submit" className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600">
            Submit
          </button>
        </form>
      </div>


      </div>
    </div>
           )
    }