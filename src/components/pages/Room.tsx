import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

const Room = () => {
  const { socket,user } = useContext(SocketContext);
  const { roomId } = useParams();
  useEffect(() => {
    if(user) {
      console.log("New user with id", user._id, "has joined room", roomId);
      socket.emit("join-room", { roomId,useId:user._id });
  }



  }, [roomId, user, socket]);
  return <div>Room</div>;
};

export default Room;
