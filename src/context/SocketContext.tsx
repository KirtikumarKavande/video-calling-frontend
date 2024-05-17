import Peer from "peerjs";
import React, { createContext, useEffect, useReducer, useState } from "react";
import SocketIoClient, { Socket } from "socket.io-client";
import { addPeerAction } from "../components/Actions/user.actions";
import { peerReducer } from "../reducers/user.reducer";

const ws_server = "http://localhost:3000";

const socket: Socket = SocketIoClient(ws_server);

export interface User {
  peer: Peer;
}
interface SocketContextProps {
  socket: Socket;
  user: Peer | null;
  getUser: (peer: Peer) => void;
  stream: MediaStream | null;
}

export const SocketContext = createContext({
  socket,
  user: null,
  getUser: () => {},
  stream: null!,
} as SocketContextProps);

function SocketProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Peer>(null);
  const [stream, setStream] = useState<MediaStream>();
  const [usersStreams, dispatch] = useReducer(peerReducer, {});


  const getUser = (peer: Peer) => {
    setUser(peer);
  };
  useEffect(() => {
    if (!user || !stream) return;

    socket.on("user-joined", ({ userId }) => {
      const call = user.call(userId, stream);
      console.log("call then call", call);
      call.on("stream", () => {
        console.log("executed 1st")
        dispatch(addPeerAction(userId, stream));


      });


    });
    user.on("call", (call) => {
      console.log("receiving a call");
      call.answer(stream);
      call.on("stream", () => {
        dispatch(addPeerAction(call.peer, stream));


      })
  })

    socket.emit("ready");

   
  }, [user, stream]);

  useEffect(() => {
    fetchUserFeed();
  }, []);

  console.log("usersStreams",usersStreams)

  const fetchUserFeed = async () => {
    const streamData = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(streamData);
  };

  const contextValue: SocketContextProps = {
    socket,
    user,
    getUser,
    stream,
    usersStreams
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;
