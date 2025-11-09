import axiosClient from "./axiosClient";

const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Named API functions
export const getCart = (userId, token) =>
  axiosClient.get(`/cart/${userId}`, withAuth(token));

export const updateCart = (payload, token) =>
  axiosClient.post(`/cart/update`, payload, withAuth(token));

export const checkout = (payload, token) =>
  axiosClient.post(`/cart/checkout`, payload, withAuth(token));

// Coupons API: GET /coupon/:userId -> { nextOrderNumber, coupons: [...] }
export const getCoupons = (userId, token) =>
  axiosClient.get(`/coupons/${userId}`, withAuth(token));

// Default export (kept for legacy imports)
const cartApi = {
  getCart,
  updateCart,
  checkout,
  getCoupons,
};
export default cartApi;
