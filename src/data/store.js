import { configureStore, createSlice } from "@reduxjs/toolkit";
const mobileSlice = createSlice({
  name: "isMobile",
  initialState: false,
  reducers: {
    mobile: (state) => (state = true),
    notMobile: (state) => (state = false),
  },
});
const countrySlice = createSlice({
  name: "country",
  initialState: null,
  reducers: {
    setCountry: (state, value) => (state = value.payload),
  },
});
const categorySlice = createSlice({
  name: "category",
  initialState: "general",
  reducers: {
    setCategory: (state, value) => (state = value.payload),
  },
});
export default configureStore({
  reducer: {
    isMobile: mobileSlice.reducer,
    country: countrySlice.reducer,
    category: categorySlice.reducer,
  },
});
export const { mobile, notMobile } = mobileSlice.actions;
export const { setCountry } = countrySlice.actions;
export const { setCategory } = categorySlice.actions;
