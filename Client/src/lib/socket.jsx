import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { socketServer } from "../constants/config";

const SocketContext = createContext();
const getSocket = () => useContext(SocketContext);


const SocketProvider = ({ children }) => {

    const socket = useMemo(() => io("http://localhost:3002", {withCredentials :true}), [])
   
    console.log("socket from socket.jsx",socket);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { getSocket, SocketProvider };
