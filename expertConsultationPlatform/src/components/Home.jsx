import Sidebar, { SidebarItem } from "./Sidebar";
import {LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings} from "lucide-react"
const Home = () => {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex">
        
          <Sidebar className="w-64">
            <SidebarItem
                icon = {<LayoutDashboard size = {20} />}
                text = "Dashboard"
                alert
                />
            <SidebarItem icon = {<BarChart3 size={20}/>} text="Statistics" active />
            <SidebarItem icon = {<UserCircle size={20} />} text="Users" />
            <SidebarItem icon = {<Boxes size={20} />} text="Inventory" />
            <SidebarItem icon = {<Package size={20} />} text="Orders" alert />
            <SidebarItem icon = {<Receipt size={20} />} text="Billings" />
            <hr className="my-3"/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
          </Sidebar>
      









          <div className=" flex-1">
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
          </div>

        
      </div>
    </main>

  );
};

export default Home;
