import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  number: 0,
  isLoading: false,
  err: null,
};

export const __addNumber = createAsyncThunk(
  "counter/__addNUmber",
  async (args, thunkAPI) => {
    console.log("start...");
    setTimeout(() => {
      thunkAPI.dispatch(addNumber(args));
      console.log("done!");
    }, 1000);
  }
);

export const __saveNumber = createAsyncThunk(
  "counter/__saveNumber",
  async (args, thunkAPI) => {
    try {
      console.log("loading...");
      const newNumber = { num: args };
      const response = await axios.patch(
        "http://localhost:3003/number",
        newNumber
      );
      console.log(response.data.num);
      return thunkAPI.fulfillWithValue(response.data.num);
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter", //이 모듈의 이름
  initialState, // 이 모듈의 초기상태 값
  reducers: {
    //액션과 액션생성함수, 액션별 reducer의 동작까지 한번에 정의되는 부분!
    //immer가 내장되어 있어 불변성유지에 스트레스 안 받고 state를 변경할 수 있다.
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
  extraReducers: {
    [__saveNumber.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__saveNumber.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.number = action.payload;
    },
    [__saveNumber.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const { addNumber, minusNumber, setNumber } = counterSlice.actions;

export default counterSlice.reducer;
