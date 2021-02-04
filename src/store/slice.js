import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "messenger-phake",
  initialState: {
    user: {
      uid: "",
      email: "",
      fullname: ""
    },
  },
  reducers: {
    SET_USER(state, action) {
      state.user = { ...action.payload }
    },
  }
});

const { actions, reducer } = slice;
export const { SET_USER } = actions;
export default reducer;