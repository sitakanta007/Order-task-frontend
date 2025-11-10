import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, updateCart, checkout } from "@api/cartApi";

// Helpers
const computeTotals = (items) => {
  const count = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (Number(i.price || 0) * (i.quantity || 0)),
    0
  );
  return { count, subtotal };
};

// GET cart from backend (after login / app start / refresh)
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth?.user?.id;
      if (!userId) return { items: [] };
      const res = await getCart(userId, auth.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

// Sync current redux cart to backend (used by Add to Cart, Update Cart, Checkout)
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
      const res = await updateCart(payload, auth.token);
      // If backend only returns {message}, keep local items
      return res.data?.items ? res.data : { items: cart.items };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update cart");
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async ({ auth, items, subtotal, discountAmount, gstAmount, finalTotal, appliedCoupon, navigate }, thunkAPI) => {
    try {
      // sync cart to backend
      await thunkAPI.dispatch(syncCart());

      const payload = {
        user_id: auth?.user?.id,

        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: Number(i.price)
        })),

        subtotal: Number(subtotal || 0),
        discount: Number(discountAmount || 0),
        tax: Number(gstAmount || 0),
        total_amount: Number(finalTotal || 0),

        coupon: appliedCoupon?.code || null
      };

      const response = await checkout(payload, auth.token);

      if (!response?.data) {
        return thunkAPI.rejectWithValue("Checkout failed");
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || "Checkout failed");
    }
  }
);

const initialState = {
  items: [],          // [{ product_id, quantity, title?, price?, image? }]
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
    // Add or increase quantity locally (no API call here)
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
    // Increment / Decrement without hitting backend
    incrementQty: (state, { payload }) => {
      const idx = findIndex(state.items, payload); // payload = product_id
      if (idx !== -1) state.items[idx].quantity += 1;
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
    decrementQty: (state, { payload }) => {
      const idx = findIndex(state.items, payload);
      if (idx !== -1) {
        // Keep minimum 1 (do not remove automatically)
        state.items[idx].quantity = Math.max(1, state.items[idx].quantity - 1);
      }
      const t = computeTotals(state.items);
      state.count = t.count;
      state.subtotal = t.subtotal;
    },
    removeItem: (state, { payload }) => {
      const idx = findIndex(state.items, payload); // payload = product_id
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
      // fetchCart
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
        state.error = payload || "Failed to fetch cart";
      })
      // syncCart
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
        state.error = payload || "Failed to update cart";
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.items = [];
      })
      .addCase(checkoutCart.rejected, (state, action) => {

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
