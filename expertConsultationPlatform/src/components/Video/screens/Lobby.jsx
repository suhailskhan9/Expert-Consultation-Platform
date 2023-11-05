// import React, { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketProvider";
// // import "./LobbyScreen.css";
// const LobbyScreen = () => {
//   const [email, setEmail] = useState("");
//   const [room, setRoom] = useState("");

//   const socket = useSocket();
//   const navigate = useNavigate();

//   const handleSubmitForm = useCallback(
//     (e) => {
//       e.preventDefault();
//       socket.emit("room:join", { email, room });
//     },
//     [email, room, socket]
//   );

//   const handleJoinRoom = useCallback(
//     (data) => {
//       const { email, room } = data;
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     socket.on("room:join", handleJoinRoom);
//     return () => {
//       socket.off("room:join", handleJoinRoom);
//     };
//   }, [socket, handleJoinRoom]);

//   return (
//     <div>
//       <h1>Lobby</h1>
//       <form onSubmit={handleSubmitForm}>
//         <label htmlFor="email">Email ID</label>
//         <br></br>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <label htmlFor="room">Room Number</label>
//         <input
//           type="text"
//           id="room"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <br />
//         <button>Join</button>
//       </form>
//     </div>
//   );
// };

// export default LobbyScreen;

import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket?.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="text-center w-80 max-w-md mx-auto p-5 bg-gradient-to-b from-blue-400 to-white rounded-lg font-sans text-gray-700">
      <h1 className="text-3xl font-bold mb-5">Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label className="text-xl font-bold text-blue-600 mb-2" htmlFor="email">
          Email ID
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-7/10 px-3 py-2 my-2 rounded-full text-lg"
        />
        <label className="text-xl font-bold text-blue-600 mb-2" htmlFor="room">
          Room Number
        </label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="w-7/10 px-3 py-2 my-2 rounded-full text-lg"
        />
        <button className="bg-gradient-to-b from-blue-400 to-blue-500 text-white rounded-full px-5 py-2 mt-5 hover:from-blue-500 hover:to-blue-600 hover:bg-blue-500 font-bold text-lg">
          Join
        </button>
      </form>
    </div>
  );
};



export default LobbyScreen;
