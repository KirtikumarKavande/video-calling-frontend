import Peer from "peerjs";
import React, { createContext, useEffect, useState } from "react";
import SocketIoClient, { Socket } from "socket.io-client";

const ws_server = "http://localhost:3000";

const socket: Socket = SocketIoClient(ws_server);

export interface User {
  peer: Peer;
}

interface SocketContextProps {
  socket: Socket;
  user: Peer | null;
  getUser: (peer: Peer) => void;
  stream:MediaStream|null

}

export const SocketContext = createContext({
  socket,
  user: null,
  getUser: () => {},
  stream: null!
} as SocketContextProps);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [stream, setStream] = useState<MediaStream>();
  const getUser = (peer: Peer) => {
    setUser(peer);
  };
  useEffect(()=>{
    fetchUserFeed()
  },[])

  const fetchUserFeed = async() => {
  const streamData= await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(streamData);
  };

  const contextValue: SocketContextProps = {
    socket,
    user,
    getUser,
    stream
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
