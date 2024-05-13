import { createContext } from "react";
import SocketIoClient, { Socket } from "socket.io-client";

const ws_server = "http://localhost:3000";

const socket = SocketIoClient(ws_server);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<Record<string, Socket>>({});

function SocketProvider({ children }: { children: React.ReactNode }) {
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}

export default SocketProvider;
