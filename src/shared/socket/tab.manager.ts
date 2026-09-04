const CHANNEL_NAME = "app_socket_channel";

export const channel = new BroadcastChannel(CHANNEL_NAME);

export function isLeaderTab(): boolean {
  return !localStorage.getItem("SOCKET_LEADER");
}

export function becomeLeader() {
  localStorage.setItem("SOCKET_LEADER", "true");
}

export function releaseLeader() {
  localStorage.removeItem("SOCKET_LEADER");
}
