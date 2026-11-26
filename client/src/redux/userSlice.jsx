import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const getusers = createAsyncThunk("user/get", async (search = "", { rejectWithValue }) => {
  try {
    const url = search ? `${API_URL}?search=${encodeURIComponent(search)}` : API_URL;
    const result = await axios.get(url);
    return result.data.users;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || error.message);
  }
});

export const adduser = createAsyncThunk("user/add", async (newuser, { rejectWithValue }) => {
  try {
    const result = await axios.post(`${API_URL}/add`, newuser);
    return result.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || error.message);
  }
});

export const deleteuser = createAsyncThunk("user/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || error.message);
  }
});

export const edituser = createAsyncThunk("user/edit", async ({ id, edited }, { rejectWithValue }) => {
  try {
    const result = await axios.put(`${API_URL}/${id}`, edited);
    return result.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || error.message);
  }
});

const initialState = {
  userlist: [],
  loading: false,
  error: null,
  successMsg: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserStatus: (state) => {
      state.error = null;
      state.successMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get users
      .addCase(getusers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getusers.fulfilled, (state, action) => {
        state.loading = false;
        state.userlist = action.payload || [];
      })
      .addCase(getusers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add user
      .addCase(adduser.pending, (state) => {
        state.loading = true;
      })
      .addCase(adduser.fulfilled, (state, action) => {
        state.loading = false;
        state.userlist.unshift(action.payload);
        state.successMsg = "Utilisateur ajouté avec succès !";
      })
      .addCase(adduser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteuser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.loading = false;
        state.userlist = state.userlist.filter((u) => u._id !== action.payload);
        state.successMsg = "Utilisateur supprimé avec succès !";
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit user
      .addCase(edituser.pending, (state) => {
        state.loading = true;
      })
      .addCase(edituser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userlist.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.userlist[index] = action.payload;
        }
        state.successMsg = "Utilisateur modifié avec succès !";
      })
      .addCase(edituser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserStatus } = userSlice.actions;
export default userSlice.reducer;
