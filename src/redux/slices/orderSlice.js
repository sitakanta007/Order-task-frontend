// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import orderApi from "@api/orderApi";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async ({ userId, token }) => {
    const res = await orderApi.getOrdersByUser(userId, token);
    // Expect array: [{ id, created_at, subtotal, discount_amount, tax, total_amount, coupon_code, items: [...] }, ...]
    return Array.isArray(res?.data) ? res.data : [];
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: "",
    list: []
  },
  reducers: {
    clearOrders(state) {
      state.list = [];
      state.error = "";
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to load orders";
      });
  }
});

export const { clearOrders } = orderSlice.actions;

// Selector: newest first
const selectOrderList = (state) => state.orders?.list || [];

export const selectOrdersSortedDesc = createSelector(
  [selectOrderList],
  (orders) => {
    return [...orders].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }
);

// Selector: attach chronological order number (oldest = #1)
// If we show newest first, the ordinal is: total - indexInSortedDesc
export const selectOrdersWithOrdinal = createSelector(
  [selectOrdersSortedDesc, selectOrderList],
  (sortedDesc, originalList) => {
    const total = originalList.length;

    return sortedDesc.map((o, idx) => ({
      ...o,
      orderNumber: total - idx     // chronological numbering
    }));
  }
);

export default orderSlice.reducer;
