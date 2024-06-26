import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import UserFeedPlayer from "../UserFeedPlayer";

const Room = () => {
  const { socket, user, stream, usersStreams } = useContext(SocketContext);
  const { roomId } = useParams();
  const values = Object.keys(usersStreams);
  useEffect(() => {
    if (user) {
      console.log("New user with id", user._id, "has joined room", roomId);
      socket.emit("join-room", { roomId, userId: user._id });
    }
  }, [roomId, user, socket]);
  console.log("kirtikumar", values,usersStreams);
  return (
    <div>
      <div>logged in user stream</div>
      <UserFeedPlayer stream={stream} />
      <div>all users</div>
      {Object.keys(usersStreams).map((peerId) => (
       
          <UserFeedPlayer key={peerId} stream={usersStreams[peerId].stream} />
      ))}
    </div>
  );
};

export default Room;
 