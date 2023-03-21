import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "./store/features/stocksSlice";
import { getStocksData } from "./store/selectors";
import { AppDispatch } from "./store/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch >()
  const { stocks = {}, error = '', loading = false } = useSelector(getStocksData)

  useEffect(() => {
    dispatch(getStocks())
  }, [])

  return(
    <div className="app">
      App
    </div>
  )
}

export default App;
