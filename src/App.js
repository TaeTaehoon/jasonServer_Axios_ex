import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  minusNumber,
  setNumber,
  __addNumber,
  __saveNumber,
} from "./redux/modules/counterSlice";
import axios from "axios";

function App() {
  const data = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const fetchNum = async () => {
    const { data } = await axios.get("http://localhost:3003/number");
    dispatch(setNumber(data.num));
  };

  useEffect(() => {
    fetchNum();
  }, []);

  const plusNum = useCallback(() => {
    dispatch(__addNumber(1));
  }, [dispatch]);
  const minusNum = useCallback(() => {
    dispatch(minusNumber(1));
  }, [dispatch]);
  const saveNum = useCallback(() => {
    dispatch(__saveNumber(data));
  }, [data]);

  return (
    <>
      <h1>{data}</h1>
      <button onClick={plusNum}>+</button>
      <button onClick={minusNum}>-</button>
      <button onClick={saveNum}>save number!</button>
    </>
  );
}

export default App;
