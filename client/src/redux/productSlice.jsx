import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/product";

export const getproducts = createAsyncThunk(
  "product/get",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category && filters.category !== "Tous") params.append("category", filters.category);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const queryString = params.toString() ? `?${params.toString()}` : "";
      const result = await axios.get(`${API_URL}${queryString}`);
      return result.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "product/categories",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${API_URL}/categories`);
      return result.data.categories;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const addproduct = createAsyncThunk(
  "product/add",
  async (newproduct, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${API_URL}/add`, newproduct);
      return result.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const editproduct = createAsyncThunk(
  "product/edit",
  async ({ id, edited }, { rejectWithValue }) => {
    try {
      const result = await axios.put(`${API_URL}/${id}`, edited);
      return result.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

const initialState = {
  productlist: [],
  categories: [],
  loading: false,
  error: null,
  successMsg: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductStatus: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get products
      .addCase(getproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productlist = action.payload || [];
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get categories
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
      })

      // Add product
      .addCase(addproduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productlist.unshift(action.payload);
        state.successMsg = "Produit ajouté avec succès !";
      })
      .addCase(addproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete product
      .addCase(deleteproduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productlist = state.productlist.filter((p) => p._id !== action.payload);
        state.successMsg = "Produit supprimé avec succès !";
      })
      .addCase(deleteproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit product
      .addCase(editproduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editproduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.productlist.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.productlist[index] = action.payload;
        }
        state.successMsg = "Produit mis à jour avec succès !";
      })
      .addCase(editproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductStatus } = productSlice.actions;
export default productSlice.reducer;
