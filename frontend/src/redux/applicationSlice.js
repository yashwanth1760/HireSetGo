import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allApplicants: [],
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setApplicants: (state, action) => {
      state.allApplicants = action.payload;
    },
    resetApplicationState: () => initialState, 
  },
});

export const { setApplicants, resetApplicationState } = applicationSlice.actions;
export default applicationSlice.reducer;
