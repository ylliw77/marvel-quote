import { createSlice } from "@reduxjs/toolkit";
import axios from "../config/instance";

const initialState = {
  chars: [],
};

export const charSlice = createSlice({
  name: "fetchChars",
  initialState,
  reducers: {
    setChars: (state, action) => {
      console.log("fetch char dapet");
      state.chars = action.payload;
    },
  },
});

export const fetchChars = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/characters",
      headers: {
        Authorization: "Bearer " + localStorage.access_token,
      },
    });

    dispatch(setChars(data));
  } catch (err) {
    console.log(err.response.data.message)
  }
};

export const { setChars } = charSlice.actions;
export default charSlice.reducer;
