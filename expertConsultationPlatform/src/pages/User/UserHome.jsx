import { Chat } from "@material-ui/icons";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import {LifeBuoy,User,Calendar,Inbox, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings, Mail, IndianRupee, LogOut, Video, Search} from "lucide-react";
    

export default function UserHome(){
return(

    <div className="flex">


        <Sidebar className="w-64">
            <SidebarItem
                icon = {<User size = {20} />}
                text = "Profile"
                alert
                />
            <SidebarItem icon = {<Search size={20}/>} text="Browse Experts" active />
            <SidebarItem icon = {<Inbox size={20} />} text="Inbox" />
            <SidebarItem icon = {<Chat size={20} />} text="Chat"  />
            <SidebarItem icon = {<Video size={20} />} text="Video Call" alert />
            <SidebarItem icon = {<LogOut  />} text="Log Out" />
            <hr className="my-3"/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>

        <div className="flex-1 p-4">
        <p>This is the content of the right side container.</p>
        {/* Add more content as needed */}
      </div>
    </div>
           )
    }