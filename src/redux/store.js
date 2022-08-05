import { configureStore } from "@reduxjs/toolkit";
import counter from "./modules/counterSlice";

const store = configureStore({
  reducer: {
    counter,
  },
});

export default store;
