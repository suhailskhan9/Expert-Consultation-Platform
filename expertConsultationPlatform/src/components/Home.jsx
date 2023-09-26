// // import Sidebar, { SidebarItem } from "./Sidebar";
// // import {LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings} from "lucide-react"


// const Home = () => {
//   return (
//     <main className=" flex flex-col h-screen">
    
        
//             {/* Navbar */}
//             <nav className=" bg-blue-500 p-4">
//               <div className="container mx-auto flex justify-between items-center">
//                 <h1 className="text-white text-2xl font-semibold">Expert Consultation Platform</h1>
//                 <div className="space-x-4">
//                   <a
//                     href="/expert"
//                     className="text-white border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400"
//                     >
//                     Expert
//                   </a>
//                   <a
//                     href="/user"
//                     className="text-white border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400"
//                     >
//                     User
//                   </a>
//                 </div>
//               </div>
//             </nav>

//             {/* Landing Content */}
//             <div className="bg-gray-100 h-screen overflow-y-hidden flex flex-col justify-center items-center">
//               <h2 className="text-4xl font-semibold mb-4">Welcome to the Expert Consultation Platform</h2>
//               <p className="text-lg text-gray-600 mb-8">Choose your role to get started:</p>
//             </div>
     

        
//       {/* </div> */}
//     </main>

//   );
// };

// export default Home;


import React from 'react';

const Home = () => {
  return (
    <main className=" text-blue-400 bg-white hover:bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Expert Consultation Platform</h1>
          <div className="space-x-4">
            <a
              href="/expert"
              className="text-white border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400"
            >
              Expert
            </a>
            <a
              href="/user"
              className="text-white border-2 border-blue-400 rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-400"
            >
              User
            </a>
          </div>
        </div>
      </nav>

      {/* Landing Content */}
      <div className="bg-gray-100 h-screen overflow-y-hidden flex flex-col justify-center items-center">
        <h2 className="text-4xl font-semibold mb-4">Welcome to the Expert Consultation Platform</h2>
        <p className="text-lg text-gray-600 mb-8">Choose your role to get started:</p>
      </div>

      {/* Cards Section */}
      <section className="bg-white py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Explore Available Experts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Expert Cards */}
            <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Expert Name 1</h4>
              <p className="text-gray-600">Specialization: Legal</p>
              <p className="text-gray-600">Years of Experience: 10</p>
            </div>
            <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Expert Name 2</h4>
              <p className="text-gray-600">Specialization: Medical</p>
              <p className="text-gray-600">Years of Experience: 15</p>
            </div>
            <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Expert Name 3</h4>
              <p className="text-gray-600">Specialization: Finance</p>
              <p className="text-gray-600">Years of Experience: 12</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-200 py-8">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Explore Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Cards */}
            <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Legal Services</h4>
              <p className="text-gray-600">Find legal experts for advice and consultation.</p>
            </div>
            <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Medical Consultation</h4>
              <p className="text-gray-600">Consult with medical professionals for health-related queries.</p>
            </div>
            <div className="bg-white border rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h4 className="text-xl font-semibold mb-2">Financial Planning</h4>
              <p className="text-gray-600">Get financial advice and planning from experts.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
