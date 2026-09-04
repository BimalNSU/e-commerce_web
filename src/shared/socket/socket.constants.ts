// export const SOCKET_EVENTS = {
//   FORCE_LOGOUT: "force_logout",
//   PERMISSIONS_UPDATED: "permissions_updated",
//   USER_DATA: "user_data",
//   USER_PATCH: "user_patch",
//   ORDER_UPDATED: "order_updated",
// };
// export const SOCKET_EVENTS = {
//   USER_SYNC: "user.sync",

//   USER_UPDATED: "user.updated",
//   USER_PROFILE_UPDATED: "user.profile.updated",
//   USER_ROLE_UPDATED: "user.role.updated",
//   USER_PERMISSIONS_UPDATED: "user.permissions.updated",

//   SESSION_REVOKED: "session.revoked",
//   SESSION_EXPIRED: "session.expired",

//   ORDER_UPDATED: "order.updated",
// } as const;

export const SOCKET_EVENTS = {
  AUTHENTICATE: "authenticate",

  USER_PATCH: "user.patch",
  USER_DELETED: "user.deleted",

  ROLE_PATCH: "role.patch",

  SHOP_PATCH: "shop.patch",

  PRODUCT_PATCH: "product.patch",

  INVENTORY_PATCH: "inventory.patch",

  ORDER_PATCH: "order.patch",

  PERMISSIONS_UPDATED: "permissions.updated",

  FORCE_LOGOUT: "force_logout",

  NOTIFICATION: "notification",

  ERROR: "error",
} as const;
