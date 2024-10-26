import React, { useState, useEffect } from 'react';
import Sidebar, { SidebarItem } from '../../components/Sidebar';
import { User, LogOut, Settings, LifeBuoy, Calendar,Search,Inbox} from "lucide-react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PayementHistoryPage = () => {
  const location = useLocation();
  const userdata = location.state;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]); 

  async function fetchUserId() {
    try {
      const response = await axios.get(`http://localhost:5000/getUserData?email=${userdata.email}`);
      const userData = response.data;
      if (userData && userData.length > 0 && userData[0]._id) {
        setUserId(userData[0]._id);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  }

  async function fetchPaymentHistory() {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:5000/payment-receipt?userId=${userId}`);
        const paymentReceipt = response.data;
        setPaymentHistory(paymentReceipt);
      }
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  }

  useEffect(() => {
    fetchUserId();
  }, [userdata.email]);

  useEffect(() => {
    fetchPaymentHistory();
  }, [userId]);

  return (
    <div className="flex">
      <Sidebar className="w-64">
          <SidebarItem icon={<User size={20} />} text="Profile" to="/user/userprofile" state={userdata} />
          <SidebarItem icon={<Search size={20} />} text="Browse Experts" to="/user/usersearch" state={userdata} />
          <SidebarItem icon={<Inbox size={20} />} text="Payment History" to="/user/paymenthistory" active/>
          <SidebarItem icon={<Calendar size={20} />} text="Upcoming Appointments" to="/user/appointments"state={userdata} />
          <SidebarItem icon={<LogOut />} text="Log Out" to={"/"} state={null}/>
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
  </Sidebar>

      <div className="flex-1 p-4">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          {paymentHistory.length === 0 ? (
            <p>No payment history available.</p>
          ) : (
            <ul>
              {paymentHistory.map((payment) => (
                <li key={payment._id}>
                  <div>
                    <p className="text-lg font-semibold">{`Name: ${payment.userId.username}`}</p>
                    <p className="text-lg font-semibold">{`Payment Amount: ${payment.amount} INR`}</p>
                    <p>{`Order ID: ${payment.razorpay_order_id}`}</p>
                    <p>{`Payment ID: ${payment.razorpay_payment_id}`}</p>
                    <br></br>
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

export default PayementHistoryPage;
