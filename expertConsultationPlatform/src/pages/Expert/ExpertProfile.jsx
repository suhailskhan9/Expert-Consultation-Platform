// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Sidebar, { SidebarItem } from "../../components/Sidebar";
// import { User, Calendar, Inbox, MessageCircle, Video, LogOut, Settings, LifeBuoy } from "lucide-react";
// import axios from "axios";

// export default function ExpertProfile() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     specialization: "",
//     // Add more fields as needed
//   });

//   const location = useLocation();

//   useEffect(() => {
//     const loggedInExpertEmail = location.state?.email;

//     axios
//   .get(`http://localhost:5000/getExpertData?email=${loggedInExpertEmail}`)
//   .then((response) => {
//     // Check if the response is an array and has at least one element
//     if (Array.isArray(response.data) && response.data.length > 0) {
//       const ExpertData = response.data[0]; // Access the first element
//       console.log(ExpertData);
//       console.log(ExpertData.username);
//       console.log(ExpertData.email);
//       setFormData({
//         name: ExpertData.username,
//         email: ExpertData.email,
//         specialization: ExpertData.specialization
//       });
//     } else {
//       console.log("No user data found in the response.");
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }, [location]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., send data to a server
//     console.log("Form submitted with data:", formData);
//   };

//   return (
//     <div className="flex">
//       <Sidebar className="w-64">
//         <SidebarItem
//           icon={<User size={20} />}
//           text="Profile"
//           active
//         />
//         <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
//         <SidebarItem icon={<Inbox size={20} />} text="Inbox" />
//         <SidebarItem icon={<MessageCircle size={20} />} text="Chat" />
//         <SidebarItem icon={<Video size={20} />} text="Video Call" alert />
//         <SidebarItem icon={<LogOut size={20} />} text="Log Out" />
//         <hr className="my-3" />
//         <SidebarItem icon={<Settings size={20} />} text="Settings" />
//         <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
//       </Sidebar>

//       <div className="flex-1 p-4">
//         <p>This is the content of the right side container.</p>
//         {/* Add more content as needed */}
//         <div className="flex-1 p-4">
//           <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
//           <form onSubmit={handleSubmit} className="max-w-md space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-600">
//                 Name:
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="specialization" className="block text-sm font-medium text-gray-600">
//                 Specialization:
//               </label>
//               <input
//                 type="text"
//                 id="specialization"
//                 name="specialization"
//                 value={formData.specialization}
//                 onChange={handleChange}
//                 className="mt-1 p-2 w-full border rounded-md"
//                 required
//               />
//             </div>
//             <button type="submit" className="bg-indigo-500 text-white p-2 rounded-md hover-bg-indigo-600">
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }















import React, { useState, useEffect } from "react";
import Sidebar,{ SidebarItem } from "../../components/Sidebar";
import { User, Calendar, Inbox, MessageCircle, Video, LogOut, Settings, LifeBuoy } from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ExpertProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    categories: "",
    price: "",
    description: "",
    availability: "",
    contact: "",
    languages: "",
  });

  const location = useLocation();
  const loggedInUserEmail = location.state?.email;
  const userdata = location.state
  useEffect(() => {

    axios
      .get(`http://localhost:5000/getExpertData?email=${loggedInUserEmail}`)
      .then((response) => {
        // Check if the response is an array and has at least one element
        if (Array.isArray(response.data) && response.data.length > 0) {
          const expertData = response.data[0];
          console.log(expertData) // Access the first element
          setFormData({
            name: expertData.username,
            email: expertData.email,
            categories: expertData.categories,
            price: expertData.price,
            availability: expertData.availability,
            contact: expertData.contact,
            languages: expertData.languages,
          });
        } else {
          console.log("No expert data found in the response.");
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
    // Handle edit mode if needed
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log(formData)
    axios
      .put(`http://localhost:5000/updateExpertData/${loggedInUserEmail}`, formData)
      .then((response) => {
        // console.log(response.data)
        console.log("User data updated successfully");
      })
      .catch((err) => {
        console.log("Error updating user data:", err);
      });
      };

  return (
        <div className="flex">
          <Sidebar className="w-64">
            <SidebarItem
              icon={<User size={20} />}
              text="Profile"
              active
            />
            <SidebarItem icon={<Calendar size={20} />} text="Upcoming Appointments" to='/expert/appointments' state={userdata}/>
            <SidebarItem icon={<Inbox size={20} />} text="Inbox" to="" />

            {/* Replace "Chat" and "Video Call" options with "Upcoming Appointments" */}
            <SidebarItem icon={<LogOut />} text="Log Out" to={"/"} state={null}/>
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          </Sidebar>
    
          <div className="flex-1 p-4">
        <h2 className="text-2xl font-semibold mb-4">Expert Profile</h2>

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

          <div>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-600">
              Categories:
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-600">
              Availability:
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="languages" className="block text-sm font-medium text-gray-600">
              Languages:
            </label>
            <input
              type="text"
              id="languages"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}





