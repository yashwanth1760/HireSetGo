import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  singleJob: [],
  allAdminJobs: [],
  allUserJobs: [],
  searchJobByText: "",
  searchQuery: "",
  filters: {
    Location: [],
    Industry: [],
    Salary: [],
  },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    SetSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllUserJobs: (state, action) => {
      state.allUserJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setJobFilters: (state, action) => {
      state.filters = action.payload;
    },

    // ✅ This resets everything in this slice
    resetJobState: () => initialState,
  },
});

export const {
  setAllJobs,
  SetSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllUserJobs,
  setSearchQuery,
  setJobFilters,
  resetJobState,
} = jobSlice.actions;

export default jobSlice.reducer;
