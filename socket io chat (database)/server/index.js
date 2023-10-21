const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

mongoose.connect('mongodb+srv://prajwalw02:gYqJ6KDQCfp9eT4a@cluster0.ochlqqs.mongodb.net/ExpertConsultDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
  fileData: String,
  date: Date, 
  fileUrl: String,
});

const Message = mongoose.model("Message", messageSchema);
const File = mongoose.model("File", fileSchema);

app.use(cors());
app.use("/uploads", express.static("uploads"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

  socket.on("send_file", (data) => {
    const { room, author, fileName, fileData } = data;

    // Create a new File document and save it to the database
    const newFile = new File({
      room,
      author,
      fileName,
      fileData,
      date: new Date(),
      fileUrl: `/uploads/${fileName}`
    });

    newFile.save()
      .then(() => {
        console.log('File saved successfully');
        // Emit the "receive_file" event to notify clients about the uploaded file
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

  // socket.on("user_connect", (userId , roomName) => {
  //   Message.find({ room: roomName }) // Adjust the room as needed
  //     .then((chatHistory) => {
  //       // Process chat history to include align-self styles
  //       const formattedChatHistory = chatHistory.map((message) => ({
  //         ...message.toObject(),
  //         isUser: message.author === userId, // Set isUser based on the sender
  //       }));
  //       socket.emit("chat_history", formattedChatHistory);
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching chat history:', err);
  //     });
  // });

  socket.on("user_connect_history", (userId, roomName) => {
    Promise.all([
      Message.find({ room: roomName }).exec(),
      File.find({ room: roomName }).exec(),
    ])
      .then(([messageHistory, fileHistory]) => {
        // Process message history and include align-self styles
        const formattedMessageHistory = messageHistory.map((message) => ({
          ...message.toObject(),
          isUser: message.author === userId,
          isFile: false, // Add isFile property for messages
        }));
  
        // Process file history and include align-self styles
        const formattedFileHistory = fileHistory.map((file) => ({
          ...file.toObject(),
          isUser: file.author === userId,
          isFile: true, // Add isFile property for files
        }));
  
        // Combine message and file history and send it to the client as an array
        socket.emit("chat_history", [...formattedMessageHistory, ...formattedFileHistory]);
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


