import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { User, Search, Inbox, MessageCircle, Video, LogOut, Settings, LifeBuoy } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const location = useLocation();

  useEffect(() => {
    const loggedInUserEmail = location.state?.email;

    axios
  .get(`http://localhost:5000/getUserData?email=${loggedInUserEmail}`)
  .then((response) => {
    // Check if the response is an array and has at least one element
    if (Array.isArray(response.data) && response.data.length > 0) {
      const userData = response.data[0]; // Access the first element
      console.log(userData);
      console.log(userData.username);
      console.log(userData.email);
      setFormData({
        name: userData.username,
        email: userData.email,
      });
    } else {
      console.log("No user data found in the response.");
    }
  })
  .catch((err) => {
    console.log(err);
  });
}, [location]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
    // Handle form submission, e.g., send data to a server
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex">
      <Sidebar className="w-64">
        <SidebarItem icon={<User size={20} />} text="Profile" active />
        <SidebarItem icon={<Search size={20} />} text="Browse Experts" />
        <SidebarItem icon={<Inbox size={20} />} text="Inbox" />
        <SidebarItem icon={<MessageCircle size={20} />} text="Chat" />
        <SidebarItem icon={<Video size={20} />} text="Video Call" alert />
        <SidebarItem icon={<LogOut />} text="Log Out" />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </Sidebar>

      <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

            <form onSubmit={handleSaveClick} className="max-w-md space-y-4">
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

            {/* Add more form fields as needed */}
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600">
              Save
            </button>
          </form> 
      </div>
    </div>
  );
}
