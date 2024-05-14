
import Peer from "peerjs";
import React, { createContext, useState } from "react";
import SocketIoClient, { Socket } from "socket.io-client";

const ws_server = "http://localhost:3000";

const socket: Socket = SocketIoClient(ws_server);

export interface User {
  peer: Peer;
}

export interface SocketContextProps {
  socket: Socket;
  user: Peer | null;
  getUser:(id:Peer)=>void
}

export const SocketContext = createContext<SocketContextProps | null>(null);

function SocketProvider({ children }: { children: React.ReactNode }) {
const [user,setUser]=useState(null)
const getUser=(peer:Peer)=>{
  console.log("inside",peer)
  setUser(peer)
}

  const contextValue: SocketContextProps = {
    socket,
    user,
    getUser
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;


