// import { useSocketStore } from "./socket.store";
// import { useAuthStore } from "../../modules/auth/auth.store";
// import { usePermissionStore } from "../../modules/permissions/permission.store";
// import { SOCKET_EVENTS } from "./socket.constants";
// import { channel } from "./tab.manager";

// export const registerSocketEvents = () => {
//   const { socket, isLeader } = useSocketStore.getState();
//   if (!socket) return;

//   // 👇 Leader listens directly
//   if (socket && isLeader) {
//     // FULL SYNC
//     socket.on(SOCKET_EVENTS.USER_DATA, (data) => {
//       useAuthStore.getState().setUser(data);
//     });

//     // PARTIAL PATCH (CORE LOGIC)
//     socket.on(SOCKET_EVENTS.USER_PATCH, (patch) => {
//       handlePatch(patch);
//     });

//     socket.on(SOCKET_EVENTS.ORDER_UPDATED, () => {
//       // handle separately (orders store maybe)
//     });

//     socket.on(SOCKET_EVENTS.FORCE_LOGOUT, () => {
//       alert("Logged out by server");
//       useAuthStore.getState().logout();
//     });
//   }

//   // Other tabs listen via BroadcastChannel
//   channel.onmessage = (msg) => {
//     const { event, data } = msg.data;

//     if (event === SOCKET_EVENTS.USER_DATA) {
//       useAuthStore.getState().setUser(data);
//     }
//     if (event === SOCKET_EVENTS.USER_PATCH) {
//       handlePatch(data);
//     }
//     if (event === SOCKET_EVENTS.FORCE_LOGOUT) {
//       useAuthStore.getState().logout();
//     }
//   };

//   // socket.on(SOCKET_EVENTS.PERMISSIONS_UPDATED, async () => {
//   //   const res = await fetch("/api/me/permissions");
//   //   const data = await res.json();
//   //   setPermissions(data);
//   // });

//   // socket.on(SOCKET_EVENTS.ORDER_UPDATED, (data) => {
//   //   console.log("Order updated:", data);
//   // });

//   socket.on("connect", async () => {
//     console.log("Reconnected");
//     await fetch("/api/me");
//   });
// };

// // shared patch handler
// function handlePatch(patch: any) {
//   const { user, setUser } = useAuthStore.getState();
//   if (!user) return;

//   switch (patch.type) {
//     case "USER_UPDATED":
//       setUser({ ...user, ...patch.payload });
//       break;

//     case "SHOP_UPDATED":
//       setUser({
//         ...user,
//         shop: { ...user?.shop, ...patch.payload.shop },
//       });
//       break;

//     case "PERMISSIONS_UPDATED":
//       setUser({
//         ...user,
//         version: patch.payload.version,
//       });
//       const setPermissions = usePermissionStore.getState().setPermissions;
//       setPermissions(patch.payload);
//       break;
//   }
// }

import { useSocketStore } from "./socket.store";
import { useAuthStore } from "../../modules/auth/auth.store";
import { usePermissionStore } from "../../modules/permissions/permission.store";
import { SOCKET_EVENTS } from "./socket.constants";
import { channel } from "./tab.manager";

/*
 * GLOBAL BROADCAST LISTENER
 * Register ONLY ONCE
 */
channel.addEventListener("message", ({ data }) => {
  const { isLeader } = useSocketStore.getState();
  // Leader already handled the socket event.
  if (isLeader) return;

  // const { event, data } = msg.data;
  const { user, setUser, clearAuth } = useAuthStore.getState();

  switch (data.event) {
    // case SOCKET_EVENTS.USER_SYNC:
    //   setUser(data.payload);
    //   break;

    case SOCKET_EVENTS.USER_PATCH:
      setUser({ ...user, ...data.payload });
      break;

    case SOCKET_EVENTS.PERMISSIONS_UPDATED: {
      const { user, setUser } = useAuthStore.getState();
      if (!user) return;

      // setUser({ ...user, version: data.payload.version });
      usePermissionStore.getState().setPermissions(data.payload.permissions);
      break;
    }

    case SOCKET_EVENTS.FORCE_LOGOUT:
      clearAuth();
      break;

    case SOCKET_EVENTS.ORDER_PATCH:
      // handle order store update
      break;
  }
});

/*
 * SOCKET EVENT REGISTRATION
 * Only LEADER tab listens directly to socket
 */
export const registerSocketEvents = () => {
  const { socket, isLeader } = useSocketStore.getState();

  if (!socket || !isLeader) return;

  // // FULL USER SYNC
  // socket.on(SOCKET_EVENTS.USER_SYNC, (payload) => {
  //   useAuthStore.getState().setUser(payload);

  //   // broadcast to all tabs
  //   channel.postMessage({ event: SOCKET_EVENTS.USER_SYNC, payload });
  // });

  // PARTIAL PATCH (CORE LOGIC)
  socket.on(SOCKET_EVENTS.USER_PATCH, (payload) => {
    const { user, setUser } = useAuthStore.getState();
    if (!user) return;

    setUser({ ...user, ...payload });

    // broadcast to all tabs
    channel.postMessage({ event: SOCKET_EVENTS.USER_PATCH, payload });
  });

  socket.on(SOCKET_EVENTS.PERMISSIONS_UPDATED, (payload) => {
    const { user, setUser } = useAuthStore.getState();
    if (!user) return;

    //   setUser({ ...user, version: payload.version });

    usePermissionStore.getState().setPermissions(payload.permissions);
    channel.postMessage({
      event: SOCKET_EVENTS.PERMISSIONS_UPDATED,
      payload,
    });
  });

  // ORDER UPDATE
  socket.on(SOCKET_EVENTS.ORDER_PATCH, (payload) => {
    channel.postMessage({ event: SOCKET_EVENTS.ORDER_PATCH, payload });
  });

  // FORCE LOGOUT
  socket.on(SOCKET_EVENTS.FORCE_LOGOUT, (payload) => {
    console.log("check");
    console.warn("Force logout:", payload);

    useAuthStore.getState().clearAuth(); // from current tab

    // sync all tabs
    channel.postMessage({ event: SOCKET_EVENTS.FORCE_LOGOUT, payload });
  });

  // UNAUTHORIZED
  socket.on("unauthorized", () => {
    channel.postMessage({ event: SOCKET_EVENTS.FORCE_LOGOUT });

    useAuthStore.getState().clearAuth();
  });

  // RECONNECT
  socket.on("connect", async () => {
    console.log("Socket reconnected");

    // try {
    //   // refetch latest user
    //   const res = await fetch("/api/auth/me", { credentials: "include" });
    //   if (res.status !== 200) {
    //     throw new Error();
    //   }
    //   console.log("res", res);
    // } catch (err) {
    //   console.error(err);
    // }
  });
};

// function handlePatch(patch: any) {
//   const { user, setUser } = useAuthStore.getState();
//   if (!user) return;

//   switch (patch.type) {
//     case "USER_UPDATED":
//       setUser({
//         ...user,
//         ...patch.payload,
//       });
//       break;

//     case "SHOP_UPDATED":
//       setUser({
//         ...user,
//         shop: {
//           ...user.shop,
//           ...patch.payload.shop,
//         },
//       });
//       break;

//     case "PERMISSIONS_UPDATED":
//       setUser({
//         ...user,
//         version: patch.payload.version,
//       });
//       usePermissionStore.getState().setPermissions(patch.payload.permissions);
//       break;
//   }
// }
