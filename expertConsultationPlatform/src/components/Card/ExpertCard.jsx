// // ExpertCard.jsx

// import React from 'react';

// const ExpertCard = ({ expert }) => {
//   const { name, categories, price } = expert;

//   return (
//     <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 rounded-md shadow-md text-blue-900">
//       <h3 className="text-lg font-semibold mb-2">{name}</h3>
//       <p className="text-opacity-75 mb-2">{categories.join(', ')}</p>
//       <p className="text-opacity-75">{`Price: ${price}`}</p>
//       <div className="mt-4">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md mr-2">
//           Call
//         </button>
//         <button className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-md">
//           Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpertCard;


// ExpertCard.jsx
// import React from 'react';

// const ExpertCard = ({ expert }) => {
//   const { name, categories, price } = expert;

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md">
//       <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
//       <p className="text-gray-600 mb-2">{categories.join(', ')}</p>
//       <p className="text-lg text-blue-500 font-semibold">{`Price: ${price}`}</p>
//       <div className="mt-4 flex justify-between items-center">
//         <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
//           Call
//         </button>
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
//           Chat
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExpertCard;



// ExpertCard.jsx
import { ContactSupport } from '@material-ui/icons';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const ExpertCard = ({ expert,onBookAppointmentClick, userdata }) => {
  const { _id , username, categories, price, availability, contact, email} = expert;
  const location = useLocation();
  const userEmail = userdata?.email;
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  console.log(expert)
  const [userId, setUserId] = useState(null);
  let expertId;
  expertId = _id;
  console.log("expert id : "+expertId);

  // console.log(userdata)
  const [slots, setSlots] = useState([]);
  
  useEffect(() => {
    console.log('Expert Availability:', availability);
  
    if (availability) {
      const slots = generateSlots(availability,bookedSlots);
      console.log('Available Slots:', slots);
      setSlots(slots);
    }
  }, [availability]); 

  

  const handleBookAppointment = async() => {
    onBookAppointmentClick(expert);
    setModalOpen(true);
    setSelectedSlot('')
    // const userId = props.userId;

    console.log(userEmail)

    try {
      const response = await axios.get(`http://localhost:5000/getUserData?email=${userEmail}`);
      // setUserData(response.data);
     const userData = response.data;
     if (userData.length > 0 && userData[0]._id) {
      setUserId(userData[0]._id);
      console.log('User ID:', userId);
  
    } else {
      console.error('User data does not contain userId.');
    }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  
  const generateSlots = (availability, bookedSlots = []) => {
    const slots = [];
  
    console.log('Availability:', availability);
  
    if (availability && typeof availability === 'string') {
      const [startTime, endTime] = availability.split('-').map(time => time.trim());
  
      // console.log('StartTime:', startTime); // Add this line
      // console.log('EndTime:', endTime); // Add this line
  
      if (startTime && endTime) {
        const startHour = parseInt(startTime.split(':')[0], 10);
        const endHour = parseInt(endTime.split(':')[0], 10);
  
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('en-US', { month: 'long' });
        const day = currentDate.getDate();
        const formattedDate = `${month} ${day}, ${year}`;
  
        for (let hour = startHour; hour < endHour; hour++) {
          // console.log('Entering the loop for hour', hour);

          const currentHourLabel = hour >= 12 ? 'PM' : 'AM';
          const slot = `${formattedDate}, ${hour % 12 || 12}:00 ${currentHourLabel} - ${(hour + 1) % 12 || 12}:00 ${currentHourLabel}`;
          if (!bookedSlots.includes(slot)) {
            slots.push(slot);
          }
        }
      } else {
        console.error('Invalid availability format:', availability);
      }
    } else {
      console.error('Invalid availability format:', availability);
    }
  
    // console.log('Generated Slots:', slots);
  
    return slots;
  };
  const availableSlots = generateSlots(availability, bookedSlots);
  console.log("available:",availableSlots)
  
 

  // useEffect(() => {
  //   console.log('Expert Availability:', availability);
  
  //   // Generate slots based on expert's availability
  //   if (availability) {
  //     const slots = generateSlots(availability,bookedSlots);
  //     console.log('Available Slots:', slots);
  //     setSlots(slots);
  //   }
  // }, [availability]); 
  
  
  // const bookedSlots = [];

// Call generateSlots to get the available slots
// const availableSlots = generateSlots(availability, bookedSlots);
// console.log("available:",availableSlots)
  
 
  // useEffect(() => {
  //   // Generate slots based on expert's availability
  //   setSlots(generateSlots(expert.availability));
  // }, [expert.availability]);
  console.log(userId)
  console.log(expertId)
  // console.log(appointmentSlot)
  const bookAppointment = async (expertId, appointmentSlot) => {

    try {
    console.log(userId)
    console.log(expertId)
    console.log(appointmentSlot)
      const response = await axios.post('http://localhost:5000/book-appointment', {
        userId,
        expertId,
        appointmentSlot,
      });
      console.log(response.data.message);
      
    // window.alert(response.data.message);
      setBookedSlots((prevBookedSlots) => [...prevBookedSlots, appointmentSlot]);

      updateAppointmentStatus();
      
      sendMail_genJoinCode();

    } catch (error) {
      console.error(error);
    }
  };
  function sendMail_genJoinCode(){
    var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
    var random_string='';
    for(var i,i=0;i<5;i++){
      random_string+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    console.log(random_string);
    
    var subject="Appointment Booked";
    var message="Your meeting has been scheduled. \nUser Email: "+userEmail+"\nJoining Code : "+random_string;
    sendMail(email,subject,message);

    var subject ="Appointment Booked";
    var message="Your meeting has been scheduled with "+username+"\nExpert Email: "+email+"\nJoining Code : "+random_string;
    console.log("user email : "+userEmail);
    sendMail(userEmail,subject,message);
  }
  function sendMail(Usermail,subject,message){
    if(Usermail && subject && message){
    axios.post("http://localhost:5000/send_email",{
      Usermail,
      subject,
      message,
    })
  }
  else{
  return alert("Details are not proper");
  }
  }
  const updateAppointmentStatus = async () => {
    try {
      for (const slot of bookedSlots) {
        const [slotDate, slotTime] = slot.split(', ');
        const slotDateTime = new Date(slotDate + ' ' + slotTime);
        const currentDateTime = new Date();
    
        if (slotDateTime <= currentDateTime) {
          const response = await axios.post('http://localhost:5000/update-appointment-status', {
            slot,
          });
  
          const updatedBookedSlots = bookedSlots.filter(bookedSlot => bookedSlot !== slot);
          setBookedSlots(updatedBookedSlots);

          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  let response;

    const checkoutHandler = async (amount) => {
        try {
          // console.log(amount)
        //  const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")
        response = await axios.get("http://localhost:5000/api/getkey");
        const key = response.data.key;

          
        //  const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
        //      amount
        // })
        response = await axios.post("http://localhost:5000/api/checkout", {
  amount
});
console.log(response)
const order = response.data.order;
console.log(order);
      


        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "XpertConsult",
            description: "Tutorial of RazorPay",
            image: "https://cdn1.vectorstock.com/i/1000x1000/39/55/expert-advice-consulting-service-business-help-vector-20513955.jpg",
            order_id: order.id,
            callback_url: `http://localhost:5000/api/paymentverification?amount=${order.amount}&userId=${userId}`,
            notes: {
                "address": "Razorpay Corporate Office",
                "amount": order.amount,
            },
            theme: {
                "color": "#3B82D9"
            }
        };
        if (window.Razorpay) {
          const razor = new window.Razorpay(options);
          razor.open();
        } else {
          console.error('Razorpay library not found.');
        }
        
      }catch (error) {
            console.error("Error in checkoutHandler:", error);}
    }

  
  console.log(bookedSlots);
  
  
  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    <div className="bg-blue-100 p-6 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2 text-blue-800">{username}</h3>
      <p className="text-gray-600 mb-2">{categories}</p>
      <p className="text-lg text-blue-500 font-semibold">{`Price: ${price}`}</p>
      <p className="text-gray-600 mt-2">{`Availability: ${availability}`}</p>
      <p className="text-gray-600 mt-2">{`Contact: ${contact}`}</p>
      
      <div className="mt-4 flex justify-center items-center">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-black opacity-50 fixed "></div>
    <div className="modal bg-white p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4">{`Book an appointment with ${username}`}</h2>
      
      

      <div className="mb-4">
        <p className="text-lg font-semibold mb-2">Pricing:</p>
        <p>{`Call: ${price} per 60 minutes`}</p>
        <p>{`Chat: ${price} per 60 minutes`}</p>
      </div>

      <form  onSubmit={(e)=>{
        e.preventDefault()
        checkoutHandler(price)
        bookAppointment(expertId, selectedSlot)
        }}>
        <div className="mb-4">
          <label htmlFor="selectedSlot" className="block text-sm font-medium text-gray-700">
            Select a Slot:
          </label>
          <select 
          id="selectedSlot" 
          name="selectedSlot" 
          className="mt-1 p-2 border rounded-md"
          onChange={(e) => setSelectedSlot(e.target.value)}>
      <option value="" disabled>
        Select a Slot
      </option>
      {availableSlots.map((slot, index) => {
        if (!bookedSlots.includes(slot)) {
          return (
            <option key={index} value={slot}>
              {slot}
            </option>
          );
        }
        return null; 
      })}
          </select>
        </div>
        
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"

        >
          Book Slot
        </button>
      </form>

      
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mt-2"
        onClick={closeModal}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ExpertCard;



