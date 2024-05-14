import Peer from "peerjs";
import React, { createContext, useState } from "react";
import SocketIoClient, { Socket } from "socket.io-client";

const ws_server = "http://localhost:3000";

const socket: Socket = SocketIoClient(ws_server);

export interface User {
  peer: Peer;
}

interface SocketContextProps {
  socket: Socket;
  user:Peer | null;
  getUser: (peer: Peer) => void;
}

export const SocketContext = createContext({
  socket,
  user: null,
  getUser: () => {},
} as SocketContextProps);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const getUser = (peer: Peer) => {
    setUser(peer);
  };

  const contextValue: SocketContextProps = {
    socket,
    user,
    getUser,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
