import { configureStore, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { fetchInitialState } from "../firebase";
const initialState = await fetchInitialState() || {
  click: { x: -10, y: -10 },
  toggle: false,
  routeLocation: 1,
  pages: [{ name: "Page-1", notes: [], page_id: 1 }],
  currentPage: { name: "Page-1", notes: [], page_id: 1 },
  currentNote: {
    title: "Note title",
    tagline: "Note's tagline, add you tagline here",
    body: "note's body, add your content here",
    id: "n-" + 0,
    page_id: 1,
    color: "#262326",
    lastUpdated: new Date().toLocaleString(),
    originalPost: new Date().toLocaleString(),
    pinned: false,
  },
  pinnedPage: { name: "Pinned", notes: [], page_id: 0 },
  edit: false,
};


initialState['routeLocation'] = 0;

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setClick: (state, action) => {
      state.click = action.payload;
    },
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setRouteLocation: (state, action) => {
      state.routeLocation = action.payload;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setPinnedPage: (state, action) => {
      state.pinnedPage = action.payload;
    },
  },
});

const store = configureStore({
  reducer: dataSlice.reducer,
  middleware: [thunk],
});

export const {
  setClick,
  setEdit,
  setPinnedPage,
  setToggle,
  setRouteLocation,
  setCurrentNote,
  setPages,
  setCurrentPage,
} = dataSlice.actions;

export default store;
