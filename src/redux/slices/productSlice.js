import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "@api/productApi";

// Fetch all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await productApi.getAll();
      return res.data.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

// Utility function for filtering + sorting
const applyFilters = (state) => {
  let list = [...state.allProducts];

  // 1) Apply SEARCH first
  if (state.search.trim() !== "") {
    list = list.filter((p) =>
      p.title.toLowerCase().includes(state.search.toLowerCase())
    );
  }

  // 2) Apply SORT
  if (state.sort === "price_low") {
    list.sort((a, b) => a.price - b.price);
  } 
  else if (state.sort === "price_high") {
    list.sort((a, b) => b.price - a.price);
  } 
  else if (state.sort === "latest") {
    // DO NOTHING — keep list as-is
  }

  // 3) Update state
  state.filteredProducts = list;
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    filteredProducts: [],
    loading: false,
    error: null,
    sort: "latest",
    search: "",
  },
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
      applyFilters(state);
    },
    setSearch(state, action) {
      state.search = action.payload;
      applyFilters(state);
    },
    clearFilters(state) {
      state.search = "";
      state.sort = "latest";
      state.filteredProducts = [...state.allProducts];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error";
      });
  }
});

export const { setSort, setSearch, clearFilters } = productSlice.actions;
export default productSlice.reducer;
