import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "@api/cartApi";

// Helpers
const computeTotals = (items) => {
  const count = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (i.price ? i.price * (i.quantity || 0) : 0),
    0
  );
  return { count, subtotal };
};

// GET CART on login / page load
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth?.user?.id) return { items: [] };
      const res = await cartApi.getCart(auth.user.id, auth.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

// SYNC entire cart (after addToCart, update button, checkout)
export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth, cart } = getState();
      const payload = {
        user_id: auth?.user?.id,
        items: cart.items.map(({ product_id, quantity }) => ({
          product_id,
          quantity,
        })),
      };

      const res = await cartApi.updateCart(payload, auth.token);

      return res.data || payload;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to sync cart");
    }
  }
);

const initialState = {
  items: [],
  count: 0,
  subtotal: 0,
  loading: false,
  error: null,
};

const findIndex = (items, product_id) =>
  items.findIndex((i) => i.product_id === product_id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrUpdateItem: (state, { payload }) => {
      const qty = payload.quantity ?? 1;
      const idx = findIndex(state.items, payload.product_id);
      if (idx === -1) {
        state.items.push({ ...payload, quantity: qty });
      } else {
        state.items[idx].quantity += qty;
      }
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
    incrementQty: (state, { payload }) => {
      const idx = findIndex(state.items, payload);
      if (idx !== -1) state.items[idx].quantity += 1;
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
    decrementQty: (state, { payload }) => {
      const idx = findIndex(state.items, payload);
      if (idx !== -1) {
        state.items[idx].quantity = Math.max(0, state.items[idx].quantity - 1);
        if (state.items[idx].quantity === 0) state.items.splice(idx, 1);
      }
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
    removeItem: (state, { payload }) => {
      const idx = findIndex(state.items, payload);
      if (idx !== -1) state.items.splice(idx, 1);
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
      state.subtotal = 0;
    },
    setCart: (state, { payload }) => {
      state.items = payload || [];
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload?.items || [];
        const t = computeTotals(state.items);
        state.count = t.count;
        state.subtotal = t.subtotal;
      })
      .addCase(fetchCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(syncCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload?.items) {
          state.items = payload.items;
          const t = computeTotals(state.items);
          state.count = t.count;
          state.subtotal = t.subtotal;
        }
      })
      .addCase(syncCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  addOrUpdateItem,
  incrementQty,
  decrementQty,
  removeItem,
  clearCart,
  setCart,
} = cartSlice.actions;

export const selectCartItems = (s) => s.cart?.items || [];
export const selectCartCount = (s) => s.cart?.count ?? 0;
export const selectCartSubtotal = (s) => s.cart?.subtotal ?? 0;

export default cartSlice.reducer;
