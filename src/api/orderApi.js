import axiosClient from "./axiosClient";

const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getOrdersByUser = (userId, token) =>
  axiosClient.get(`/orders/${userId}`, withAuth(token));

const orderApi = { getOrdersByUser };
export default orderApi;
