import api from "./api";

export function getProfile() {
  return api.get("/user/profile");
}

export function getOrders() {
  return api.get("/orders");
}
