const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/ExpertConsultDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: String,
  timestamp: Date,
  isUser: Boolean,
  date: Date,
});
const Message = mongoose.model("Message", messageSchema);

app.use(cors());
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
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

  // socket.on("user_connect", (roomName) => {
  //   Message.find({ room: roomName }) // Adjust the room as needed
  //     .then((chatHistory) => {
  //       socket.emit("chat_history", chatHistory);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching chat history:', err);
  //     });
  // });

  socket.on("user_connect", (userId , roomName) => {
    Message.find({ room: roomName }) // Adjust the room as needed
      .then((chatHistory) => {
        // Process chat history to include align-self styles
        const formattedChatHistory = chatHistory.map((message) => ({
          ...message.toObject(),
          isUser: message.author === userId, // Set isUser based on the sender
        }));
        socket.emit("chat_history", formattedChatHistory);
      })
      .catch((err) => {
        console.error('Error fetching chat history:', err);
      });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  socket.on("error", (error) => {
    console.error("Socket Error:", error);
  });
});

app.use("/uploads", express.static("uploads"));

server.listen(3001, () => {
  console.log("Server Started at port 3001.");
});



// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");
// const mongoose = require("mongoose");

// mongoose.connect('mongodb://127.0.0.1:27017/ExpertConsultDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// const expertSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

// expertSchema.add({
//   categories : String,
//   price : Number,
//   availability: String,
//   contact : Number,
//   languages:String,
// });

// const User = mongoose.model("User", userSchema);
// const Expert = mongoose.model("Expert", expertSchema);

// app.use(cors());
// app.use("/uploads", express.static("uploads"));

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// app.get('/getUserData', async (req, res) => {
//   try {
//     // Fetch expert data based on the email query parameter
//     const email = req.query.email;
//     const users = await User.find({ email });

//     // Send the expert data as a JSON response
//     res.json(users);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.get('/api/experts', async (req, res) => {
//   try {
//     // Fetch all experts
//     const experts = await Expert.find();

//     // Send the expert data as a JSON response
//     res.json(experts);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// app.get('/getExpertData', async (req, res) => {
//   try {
//     // Fetch expert data based on the email query parameter
//     const email = req.query.email;
//     const experts = await Expert.find({ email });

//     // Send the expert data as a JSON response
//     res.json(experts);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//     delete data._id;

//     const newMessage = new Message(data);
//     newMessage.save()
//       .then(() => {
//         console.log('Message saved successfully');
//       })
//       .catch((err) => {
//         console.error('Error saving message:', err);
//       });
//   });

//   socket.on("user_connect", (userId, roomName) => {
//     Message.find({ room: roomName }) // Adjust the room as needed
//       .then((chatHistory) => {
//         // Process chat history to include align-self styles
//         const formattedChatHistory = chatHistory.map((message) => ({
//           ...message.toObject(),
//           isUser: message.author === userId, // Set isUser based on the sender
//         }));
//         socket.emit("chat_history", formattedChatHistory);
//       })
//       .catch((err) => {
//         console.error('Error fetching chat history:', err);
//       });
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
//   socket.on("error", (error) => {
//     console.error("Socket Error:", error);
//   });
// });

// app.use("/uploads", express.static("uploads"));

// server.listen(3001, () => {
//   console.log("Server Started at port 3001.");
// });
