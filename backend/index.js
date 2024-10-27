
const express = require('express');
const app = express();
const http = require("http");
const server = require("http").createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const crypto = require("crypto");

// const paymentRoute = require("./routes/paymentRoutes.js");
const paymentRoute = express.Router();

const Razorpay = require("razorpay");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const nodemailer=require("nodemailer");
// import { config } from "dotenv";
// import paymentRoute from "./routes/paymentRoutes.js";
// config({ path: "./config/config.env" });
// import Razorpay from "razorpay";

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

const io = new Server(server, {
  cors: 
  {
    origin: "https://expert-consultation-platform.vercel.app/",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// module.exports = {
//   instance: new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET,
//   }),
// };
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const expertSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});
expertSchema.add({
  categories : String,
  price : Number,
  availability: String,
  contact : Number,
  languages:String,
});

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expert',

  },
  appointmentSlot: {
    type: String,

  },
  status: {
    type: String,
    enum: ['free', 'booked'],

  },
  bookedDateTime: {
    type: Date,
  },
});

const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  fileUrl: String,
  timestamp: Date,
  isUser: Boolean,
  date: Date,
});
const fileSchema = new mongoose.Schema({
  room: String, 
  author: String, 
  fileName: String, 
  // fileData: String,
  date: Date, 
  fileUrl: String,
});

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  amount:{
    type:String,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});



const User = mongoose.model('User', userSchema);
const Expert = mongoose.model('Expert', expertSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Message = mongoose.model("Message", messageSchema);
const File = mongoose.model("File", fileSchema);
const Payment = mongoose.model("Payment", paymentSchema);


const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature} =
    req.body;
  const amount = (req.query.amount)/100;
  const userId = req.query.userId;


  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      await Payment.create({
        userId,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `https://expert-consultation-platform.vercel.app/user/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

paymentRoute.post('/checkout', checkout);
paymentRoute.post('/paymentverification', paymentVerification);


app.post('/user', async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password
  });

  try {
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/expert', async (req, res) => {
  const { username, email, password, categories, price, availability, contact, languages} = req.body;

  const expert = new Expert({
    username,
    email,
    password, 
    categories, 
    price,
    availability,
    contact,
    languages, 
  });

  try {
    await expert.save();
    res.status(201).json({ message: 'Expert created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      return res.status(404).json({ message: 'User not registered' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
  

  app.post('/expert/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const expert = await Expert.findOne({ email });
  
      if (expert) {
        // User found, check password
        if (expert.password === password) {
          // Successful login
          return res.status(200).json({ message: 'Login successful' });
        } else {
          // Incorrect password
          return res.status(401).json({ message: 'Incorrect password' });
        }
      } else {
        // User not registered
        return res.status(404).json({ message: 'Expert not registered' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
    
  app.get('/getUserData', async (req, res) => {
    try {
      const email = req.query.email;
      const users = await User.find({ email });
      // console.log(users)
      res.json(users);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/api/experts', async (req, res) => {
    try {
      const experts = await Expert.find();
  
      res.json(experts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/getExpertData', async (req, res) => {
    try {
      const email = req.query.email;
      const experts = await Expert.find({ email });
  
      res.json(experts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.put("/updateUserData/:email", async (req, res) => {
    const email = req.params.email;
    const updatedUserData = req.body;

    console.log(updatedUserData)
  
    try {
      const updatedUser = await User.findOneAndUpdate({ email: email }, {
        $set: {
          username: updatedUserData.name,
        }
      }, { new: true });
        
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      console.log("User data updated successfully");
      res.status(200).json({ message: "User data updated successfully", updatedUser });
    } catch (err) {
      console.error("Error updating user data:", err);
      res.status(500).json({ error: "Failed to update user data." });
    }
  });

  app.put("/updateExpertData/:email", async (req, res) => {
    const email = req.params.email; 
    const updatedExpertData = req.body;
  console.log(updatedExpertData)
    try {
      const updatedExpert = await Expert.findOneAndUpdate({ email: email }, {
        $set: {
          username: updatedExpertData.name, 
          categories: updatedExpertData.categories,  
          price: updatedExpertData.price, 
          availability: updatedExpertData.availability,
          contact: updatedExpertData.contact, 
          languages: updatedExpertData.languages, 
        }
      }, { new: true });
      // console.log('Updated Expert Data:', updatedExpert);

      if (!updatedExpert) {
        return res.status(404).json({ error: "Expert not found" });
      }
  
      console.log("Expert data updated successfully");
      res.status(200).json({ message: "Expert data updated successfully", updatedExpert });
    } catch (err) {
      console.error("Error updating expert data:", err);
      res.status(500).json({ error: "Failed to update expert data." });
    }
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
      delete data._id;
  
      const newMessage = new Message(data);
      newMessage.save()
        .then(() => {
          console.log('Message saved successfully');
        })
        .catch((err) => {
          console.error('Error saving message:', err);
        });
    });
    socket.on("send_file", (data) => {
      const { room, author, fileName, fileData } = data;
  
      const newFile = new File({
        room,
        author,
        fileName,
        date: new Date(),
        fileUrl: `/uploads/${fileName}`
      });
  
      newFile.save()
        .then(() => {
          console.log('File saved successfully');
          io.to(room).emit("receive_file", {
            room,
            author,
            fileName,
            message: `${fileName}`,
            date: new Date(),
            fileUrl: `/uploads/${fileName}`
          });
        })
        .catch((err) => {
          console.error('Error saving file:', err);
        });
    });
    socket.on("user_connect_history", (userId, roomName) => {
      Promise.all([
        Message.find({ room: roomName }).exec(),
        File.find({ room: roomName }).exec(),
      ])
        .then(([messageHistory, fileHistory]) => {
          const formattedMessageHistory = messageHistory.map((message) => ({
            ...message.toObject(),
            isUser: message.author === userId,
            isFile: false, 
          }));
    
          const formattedFileHistory = fileHistory.map((file) => ({
            ...file.toObject(),
            isUser: file.author === userId,
            isFile: true, 
          }));
    
          socket.emit("chat_history", [...formattedMessageHistory, ...formattedFileHistory]);
        })
        .catch((err) => {
          console.error('Error fetching chat history:', err);
        });
     });
    


// const emailToSocketIdMap = new Map();
// const socketidToEmailMap = new Map();

// io.on("connection", (socket) => {
//   console.log(`Socket Connected`, socket.id);
//   socket.on("room:join", (data) => {
//     const { email, room } = data;
//     emailToSocketIdMap.set(email, socket.id);
//     socketidToEmailMap.set(socket.id, email);
//     io.to(room).emit("user:joined", { email, id: socket.id });
//     socket.join(room);
//     io.to(socket.id).emit("room:join", data);
//   });

//   socket.on("user:call", ({ to, offer }) => {
//     io.to(to).emit("incomming:call", { from: socket.id, offer });
//   });
// 
//   socket.on("call:accepted", ({ to, ans }) => {
//     io.to(to).emit("call:accepted", { from: socket.id, ans });
//   });

//   socket.on("peer:nego:needed", ({ to, offer }) => {
//     console.log("peer:nego:needed", offer);
//     io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
//   });

//   socket.on("peer:nego:done", ({ to, ans }) => {
//     console.log("peer:nego:done", ans);
//     io.to(to).emit("peer:nego:final", { from: socket.id, ans });
//   });
// });

     app.post('/book-appointment', async (req, res) => {
      const { userId, expertId, appointmentSlot } = req.body;
    
      try {
        const newAppointment = new Appointment({
          userId,
          expertId,
          appointmentSlot,
          status: 'booked',
          bookedDateTime: new Date(),
        });
    
        await newAppointment.save();
    
        return res.status(200).json({ message: 'Appointment booked successfully' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    app.post('/update-appointment-status', async (req, res) => {
      try {
        const currentTime = new Date();
    
        await Appointment.updateMany(
          {
            status: 'booked',
            bookedDateTime: { $lt: currentTime },
          },
          { $set: { status: 'free', userId: null, bookedDateTime: null } } 
        );
    
        await Appointment.updateMany(
          {
            status: 'free',
            bookedDateTime: { $gte: currentTime },
          },
          { $set: { userId: null, bookedDateTime: null } }
        );
    
        return res.status(200).json({ message: 'Appointment statuses updated' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    app.get('/booked-appointments', async (req, res) => {
      try {
        const userId = req.query.userId;
    console.log(userId)
        const bookedAppointments = await Appointment.find({ userId, status: 'booked' })
          .populate('expertId userId') 
          .select('userId expertId appointmentSlot'); 
    
        res.json(bookedAppointments);
        console.log(bookedAppointments)
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    app.get('/expertbooked-appointments', async (req, res) => {
      try {
        const expertId = req.query.userId;
    console.log(expertId)
        const bookedAppointments = await Appointment.find({ expertId, status: 'booked' })
          .populate('expertId userId') 
          .select('userId expertId appointmentSlot'); 
    
        res.json(bookedAppointments);
        console.log(bookedAppointments)
      } catch (error) {
        console.error('Error fetching booked appointments:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    app.get('/payment-receipt', async (req, res) => {
      try {
        const userId = req.query.userId;
        // console.log(userId)
        const paymentReceipt = await Payment.find({ userId })
          .populate('userId')
          .select('userId amount razorpay_order_id razorpay_payment_id'); 
    
          res.json(paymentReceipt);
        // console.log(paymentReceipt)
      } catch (error) {
        console.error('Error fetching payment receipts:', error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
    socket.on("error", (error) => {
      console.error("Socket Error:", error);
    });
  });
  

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send('Server is running.');
});


const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

// io.on('connection', (socket) => {
//   socket.emit('me', socket.id);

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('callended');
//   });

//   socket.on("calluser", ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit("calluser", { signal: signalData, from, name });
//   });

//   socket.on("answercall", (data) => {
//     io.to(data.to).emit("callaccepted", data.signal);
//   });
// });

//Email
app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit:"25mb"}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  next();
});

function sendEmail({Usermail,subject,message}){
  return new Promise((resolve,reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      },
    });

    const mail_configs = {
      from : process.env.EMAIL_USER,
      to : Usermail,
      subject:subject,
      text : message,
    };

    transporter.sendMail(mail_configs,function(error,info){
      if(error){
        console.log(error);
        return reject({message:`An error has occured`});
      }
      return resolve({message: "Email Sent Successfully"});
    });
  });
}

// app.get("/email", (req, res) => {
//   sendEmail()
//     .then((response) => res.send(response.message))
//     .catch((error) => res.status(500).send(error.message));
// });

app.post("/send_email",(req,res) => {
  sendEmail(req.body)
  .then((response) => res.send(response.message))
  .catch((error) => res.status(500).send(error.message));
})


server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));