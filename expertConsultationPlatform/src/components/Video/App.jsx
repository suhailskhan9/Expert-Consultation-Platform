// import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import LobbyScreen from "./screens/Lobby";
// import RoomPage from "./screens/Room";

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/video" element={<LobbyScreen />} />
//         <Route path="/video/room/:roomId" element={<RoomPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
function App() {
  return (
    <div className="text-center bg-gradient-to-b from-blue-400 to-white min-h-screen flex flex-col items-center justify-center p-20 font-sans text-gray-700">
      <Routes>
        <Route path="/video" element={<LobbyScreen />} />
        <Route path="/video/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
