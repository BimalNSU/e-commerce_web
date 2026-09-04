import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import {
  channel,
  isLeaderTab,
  becomeLeader,
  releaseLeader,
} from "./tab.manager";

interface SocketState {
  socket: Socket | null;
  isLeader: boolean;

  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isLeader: false,

  connect: (token) => {
    //only leader creates socket
    if (!isLeaderTab()) {
      console.log("Not leader tab, skip socket");
      return;
    }

    becomeLeader();

    // const socket = io("/ws", {
    //   auth: { token },
    // });

    const socket = io((import.meta as any).env.VITE_WS_URL, {
      auth: { token },
      transports: ["websocket"], //means: Client → WebSocket directly
    });
    // socket.on("connect", () => {
    //   console.log("WS Connected");
    //   set({ connected: true });
    // });
    // set({ socket });

    set({ socket, isLeader: true });

    //Broadcast incoming events to other tabs
    socket.onAny((event, data) => {
      channel.postMessage({ event, data });
    });
    console.log("Leader socket connected");
  },

  disconnect: () => {
    // get().socket?.disconnect();
    // set({ socket: null, connected: false });
    const { socket, isLeader } = get();
    if (isLeader) {
      socket?.disconnect();
      releaseLeader();
    }
    set({ socket: null, isLeader: false });
  },
}));
