import { useState, useEffect, useReducer, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import newsApiUrl from "./newsApi";
import axios from "axios";
import Title from "./components/Title";
import Articles from "./components/Articles";
import OutletMain from "./components/OutletMain";
const paramsReducer = (state, action) => {
  switch (action.type) {
    case "COUNTRY":
      return { ...state, country: action.value };
    case "CATEGORY":
      return { ...state, category: action.value };
    case "KEY_WORDS":
      return { ...state, q: action.value };
    case "SORT_BY":
      return { ...state, sortBy: action.value };
    case "FROM":
      return { ...state, from: action.value };
    default:
      return state;
  }
};
const App = () => {
  const [mobile, setMobile] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, dispatch] = useReducer(paramsReducer, null);
  const handleCategory = useCallback(
    (value) => dispatch({ type: "CATEGORY", value: value }),
    []
  );
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const getCountry = async () => {
      try {
        const ip = await axios("https://ipapi.co/json/");
        dispatch({
          type: "COUNTRY",
          value: ip.data["country_code"].toLowerCase(),
        });
      } catch (error) {
        dispatch({
          type: "COUNTRY",
          value: "us",
        });
      }
    };
    getCountry();
  }, []);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(newsApiUrl(params));
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    setError(null);
    params && getData();
  }, [params]);
  return (
    <div className="container-fluid d-flex flex-column vh-100 overflow-y-auto">
      <Title />
      <Routes>
        <Route path="*" element={<Navigate to="/categories" />} />
        <Route path="categories" element={<OutletMain mobile={mobile} />}>
          <Route index element={<Navigate to="general" />} />
          <Route
            path=":category"
            element={
              <Articles
                loading={loading}
                error={error}
                data={data}
                setCategory={handleCategory}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
