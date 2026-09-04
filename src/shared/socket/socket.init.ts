import { useSocketStore } from "./socket.store";

// handle leader release on tab close
window.addEventListener("beforeunload", () => {
  const { isLeader } = useSocketStore.getState();

  if (isLeader) {
    localStorage.removeItem("SOCKET_LEADER");
  }
});
