import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    setUserInformation: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserInformation } = userInformationSlice.actions;

export default userInformationSlice.reducer;
