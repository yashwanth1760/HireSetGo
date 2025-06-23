import { createSlice } from "@reduxjs/toolkit";

// ✅ Define initialState outside
const initialState = {
  loading: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    resetAuth: () => initialState, // ✅ now this works correctly
  },
});

export const { setLoading, setAuthUser, resetAuth } = authSlice.actions;
export default authSlice.reducer;
