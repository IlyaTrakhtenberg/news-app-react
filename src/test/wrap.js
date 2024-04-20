import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../data/store";

const wrapped = (comp) => (
  <Provider store={store}>
    <BrowserRouter>{comp}</BrowserRouter>
  </Provider>
);
export default wrapped;
