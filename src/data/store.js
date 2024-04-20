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
    setCountry: (state, action) => (state = action.payload),
  },
});
const categorySlice = createSlice({
  name: "category",
  initialState: "general",
  reducers: {
    setCategory: (state, action) => (state = action.payload),
  },
});
const dataSlice = createSlice({
  name: "data",
  initialState: null,
  reducers: {
    setData: (state, action) => (state = action.payload),
  },
});
const savedSlice = createSlice({
  name: "saved",
  initialState: [],
  reducers: {
    addArticle: (state, action) => {
      state.length ? state.unshift(action.payload) : state.push(action.payload);
    },
    removeArticle: (state, action) => {
      const ind = state.map((article) => article.url).indexOf(action.payload);
      state.splice(ind, 1);
    },
    setStateTest: (state, action) => (state = action.payload),
  },
});
export default configureStore({
  reducer: {
    isMobile: mobileSlice.reducer,
    country: countrySlice.reducer,
    category: categorySlice.reducer,
    data: dataSlice.reducer,
    saved: savedSlice.reducer,
  },
});
export const { mobile, notMobile } = mobileSlice.actions;
export const { setCountry } = countrySlice.actions;
export const { setCategory } = categorySlice.actions;
export const { setData } = dataSlice.actions;
export const { addArticle, removeArticle, setStateTest } = savedSlice.actions;
