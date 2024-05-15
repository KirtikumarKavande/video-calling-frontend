import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import UserFeedPlayer from "../UserFeedPlayer";

const Room = () => {
  const { socket, user,stream } = useContext(SocketContext);
  const { roomId } = useParams();
  useEffect(() => {
    if (user) {
      console.log("New user with id", user._id, "has joined room", roomId);
      socket.emit("join-room", { roomId, userId: user._id });
    }
  }, [roomId, user, socket]);
  return <div>
    <UserFeedPlayer stream={stream}/>
  </div>;
};

export default Room;
