import Sidebar, { SidebarItem } from "../../components/Sidebar";
import {LifeBuoy, Receipt, Boxes, Package, UserCircle, BarChart3, LayoutDashboard, Settings} from "lucide-react";
    

export default function UserHome(){

        <Sidebar className="w-64">
            <SidebarItem
                icon = {<LayoutDashboard size = {20} />}
                text = "Dashboard"
                alert
                />
            <SidebarItem icon = {<BarChart3 size={20}/>} text="Statistics" active />
            <SidebarItem icon = {<UserCircle size={20} />} text="Users" />
            <SidebarItem icon = {<Boxes size={20} />} text="Inventory"  />
            <SidebarItem icon = {<Package size={20} />} text="Orders" alert />
            <SidebarItem icon = {<Receipt size={20} />} text="Billings" />
            <hr className="my-3"/>
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>
           
    }