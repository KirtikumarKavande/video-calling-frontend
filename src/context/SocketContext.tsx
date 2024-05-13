import { createContext } from "react";
import SocketIoClient from "socket.io-client";

const ws_server = "http://localhost:3000";

const socket = SocketIoClient(ws_server);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext<any>({});

function SocketProvider({ children }: { children: React.ReactNode }) {
  return <Context.Provider value={{ socket }}>{children}</Context.Provider>;
}

export default SocketProvider;
