import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },
    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

export const { addNumber, minusNumber, setNumber } = counterSlice.actions;

export default counterSlice.reducer;
