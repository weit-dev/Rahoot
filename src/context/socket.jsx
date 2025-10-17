import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { WEBSOCKET_PUBLIC_URL } from "../../config.mjs";

export const WEBSOCKET_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV == null ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
    ? WEBSOCKET_PUBLIC_URL
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
    : `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;

export const socket = io(WEBSOCKET_URL, {
  transports: ["websocket"],
})

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
)

export function useSocketContext() {
  const context = useContext(SocketContext)

  return { socket: context }
}
