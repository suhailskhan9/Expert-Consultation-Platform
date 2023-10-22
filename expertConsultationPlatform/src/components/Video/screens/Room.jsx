// import React, { useEffect, useCallback, useState } from "react";
// import ReactPlayer from "react-player";
// import peer from "../service/peer";
// import { useSocket } from "../context/SocketProvider";
// // import "./RoomPage.css";
// const RoomPage = () => {
//   const socket = useSocket();
//   const [remoteSocketId, setRemoteSocketId] = useState(null);
//   const [myStream, setMyStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();

//   const handleUserJoined = useCallback(({ email, id }) => {
//     console.log(`Email ${email} joined room`);
//     setRemoteSocketId(id);
//   }, []);

//   const handleCallUser = useCallback(async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const offer = await peer.getOffer();
//     socket.emit("user:call", { to: remoteSocketId, offer });
//     setMyStream(stream);
//   }, [remoteSocketId, socket]);

//   const handleIncommingCall = useCallback(
//     async ({ from, offer }) => {
//       setRemoteSocketId(from);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );

//   const sendStreams = useCallback(() => {
//     for (const track of myStream.getTracks()) {
//       peer.peer.addTrack(track, myStream);
//     }
//   }, [myStream]);

//   const handleCallAccepted = useCallback(
//     ({ from, ans }) => {
//       peer.setLocalDescription(ans);
//       console.log("Call Accepted!");
//       sendStreams();
//     },
//     [sendStreams]
//   );

//   const handleNegoNeeded = useCallback(async () => {
//     const offer = await peer.getOffer();
//     socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//   }, [remoteSocketId, socket]);

//   useEffect(() => {
//     peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//     };
//   }, [handleNegoNeeded]);

//   const handleNegoNeedIncomming = useCallback(
//     async ({ from, offer }) => {
//       const ans = await peer.getAnswer(offer);
//       socket.emit("peer:nego:done", { to: from, ans });
//     },
//     [socket]
//   );

//   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//     await peer.setLocalDescription(ans);
//   }, []);

//   useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("user:joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     socket.on("peer:nego:final", handleNegoNeedFinal);

//     return () => {
//       socket.off("user:joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       socket.off("peer:nego:final", handleNegoNeedFinal);
//     };
//   }, [
//     socket,
//     handleUserJoined,
//     handleIncommingCall,
//     handleCallAccepted,
//     handleNegoNeedIncomming,
//     handleNegoNeedFinal,
//   ]);

//   return (
//     <div>
//       <h1>Room Page</h1>
//       <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
//       {myStream && <button onClick={sendStreams}>Send Stream</button>}
//       {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
//       {myStream && (
//         <>
//           <h1>My Stream</h1>
//           <ReactPlayer
//             playing
//             muted
//             height="275px"
//             width="381.25px"
//             url={myStream}
//           />
//         </>
//       )}
//       {remoteStream && (
//         <>
//           <h1>Remote Stream</h1>
//           <ReactPlayer
//             playing
//             muted
//             height="275"
//             width="381.25px"
//             url={remoteStream}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default RoomPage;


import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div className="text-center w-75 max-w-xl mx-auto p-2 bg-gradient-to-b from-blue-400 to-white rounded-lg font-sans text-gray-700">
      <h1 className="text-3xl text-blue-600">Room Page</h1>
      <h4 className="text-2xl text-blue-600">
        {remoteSocketId ? "Connected" : "No one in room"}
      </h4>
      {myStream && (
        <button
          onClick={sendStreams}
          className="bg-gradient-to-b from-blue-400 to-blue-500 text-white rounded-full px-4 py-8 mt-5 hover:from-blue-500 hover:to-blue-600 hover:bg-blue-500 font-bold text-xl"
        >
          Send Stream
        </button>
      )}
      {remoteSocketId && (
        <button
          onClick={handleCallUser}
          className="bg-gradient-to-b from-blue-400 to-blue-500 text-white rounded-full px-4 py-8 mt-5 hover:from-blue-500 hover:to-blue-600 hover:bg-blue-500 font-bold text-xl"
        >
          CALL
        </button>
      )}
      {myStream && (
        <div>
          <h1 className="text-2xl text-blue-600">My Stream</h1>
          <ReactPlayer
            playing
            muted
            height="275px"
            width="381.25px"
            url={myStream}
          />
        </div>
      )}
      {remoteStream && (
        <div>
          <h1 className="text-2xl text-blue-600">Remote Stream</h1>
          <ReactPlayer
            playing
            muted
            height="275px"
            width="381.25px"
            url={remoteStream}
          />
        </div>
      )}
    </div>
  );
};

export default RoomPage;
