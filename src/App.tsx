import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Room from "./components/pages/Room";
import { useContext, useEffect } from "react";
import { SocketContext } from "./context/SocketContext";
import Peer from "peerjs";
import { v4 as uuid } from "uuid";

export default function App() {
  const socketContext = useContext(SocketContext);
  console.log(socketContext)
  const navigate = useNavigate();

  useEffect(() => {
    const newUuid=uuid()
    const peer = new Peer(newUuid);
    if (socketContext) {

      socketContext.getUser(peer);

      socketContext.socket.on(
        "room-created",
        ({ roomId }: { roomId: string }) => {
          navigate(`/${roomId}`);
        }
      );
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:roomId" element={<Room />} />
    </Routes>
  );
}
