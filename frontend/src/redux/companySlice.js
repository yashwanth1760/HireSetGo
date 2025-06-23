import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  current: null,
  searchCompanyByText:"",
};

const companieSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setAllCompanies: (state, action) => {
      state.list = action.payload;
    },
    setCurrentCompany: (state, action) => {
      state.current = action.payload;
    },
    setSearchCompanyByText: (state, action) =>{
        state.searchCompanyByText = action.payload;
    },
    resetCompany: () => initialState,
  },
});

export const {
  setAllCompanies,
  setCurrentCompany,
  setSearchCompanyByText,
  resetCompany
} = companieSlice.actions;

export default companieSlice.reducer;
