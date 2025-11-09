import axiosClient from "./axiosClient";

const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

const cartApi = {
  getCart: (userId, token) =>
    axiosClient.get(`/cart/${userId}`, withAuth(token)),

  updateCart: (payload, token) =>
    axiosClient.post(`/cart/update`, payload, withAuth(token)),
};

export default cartApi;
