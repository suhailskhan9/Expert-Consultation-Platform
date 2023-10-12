// const app=require("express")();
// const server = require("http").createServer(app);
// const cors=require("cors");
// const { Socket } = require("socket.io");
// const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/ExpertConsultDB');

// const io= require("socket.io")(server, {
//     cors: {
//         origin: "*",
//         methods:["GET","POST"]
//     }
// });

// app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/ExpertConsultDB');

// const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//   });  

// const User = mongoose.model('User', userSchema);

// app.post('/user', async (req, res) => {
//     const { username, email, password } = req.body;
    
//     const user = new User({
//       username,
//       email,
//       password
//     });
  
//     try {
//       await user.save();
//       res.status(201).json({ message: 'User created' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
// const PORT= process.env.PORT || 5000;

// app.get("/",(req,res) => {
//     res.send('Server is running.');
// });

// io.on('connection',(socket) => {
//     socket.emit('me',socket.id);

//     socket.on('disconnect', () =>{
//         socket.broadcast.emit('callended');
//     });

//     socket.on("calluser", ({userToCall,signalData,from,name}) => {
//         io.to(userToCall).emit("calluser",{signal:signalData,from,name});
//     });

//     socket.on("answercall",(data)=>{
//         io.to(data.to).emit("callaccepted", data.signal);
//     });
// });
// server.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));

const express = require('express');
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests

mongoose.connect('mongodb://127.0.0.1:27017/ExpertConsultDB');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

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

app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (user && user.password === password) {
        // Successful login
        return res.status(200).json({ message: 'Login successful' });
      }
  
      // Login failed
      return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send('Server is running.');
});

io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callended');
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));