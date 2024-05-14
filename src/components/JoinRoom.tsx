import React, { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const JoinRoom = () => {
  const { socket, user } = useContext(SocketContext);
  function joinRoomHandler() {
    console.log("logged", socket);
    socket.emit("create-room", { userId: user ? user._id : null });
  }
  return (
    <button
      onClick={joinRoomHandler}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      JoinRoom
    </button>
  );
};

export default JoinRoom;
