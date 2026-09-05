import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSocketStore } from "../../shared/socket/socket.store";
import { registerSocketEvents } from "../../shared/socket/socket.events";
import { AuthUser } from "./auth.types";

interface AuthState {
  accessToken: string | undefined;
  user: AuthUser | undefined;
  setAuth: (token: string, user: any) => void;
  setUser: (user: any) => void;
  clearAuth: () => void;
}
const initialState = {
  accessToken: undefined,
  user: undefined,
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setAuth: (token, user) => {
        const currentToken = get().accessToken;
        set({ accessToken: token, user });
        const { socket, connect, isLeader } = useSocketStore.getState();

        // First login → connect socket
        if (!socket) {
          connect(token);
          setTimeout(registerSocketEvents, 0);
        }
        // Token refresh → re-auth (ONLY leader)
        else if (currentToken !== token && isLeader) {
          socket.emit("authenticate", { token });
        }
      },

      setUser: (user) => set({ user }),
      clearAuth: () => {
        set({ ...initialState });
        useSocketStore.getState().disconnect();
      },
    }),
    {
      name: "auth",
    },
  ),
);
