import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import { mobile, notMobile, setCountry } from "./data/store";
import Title from "./components/Title";
import NavBar from "./components/navbar/NavBar";
import Main from "./components/Main";
import Saved from "./components/Saved";
const App = () => {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  useEffect(() => {
    const handleResize = () => {
      dispatch(window.innerWidth < 768 ? mobile() : notMobile());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  useEffect(() => {
    const getCountry = async () => {
      try {
        const ip = await axios("https://ipapi.co/json/");
        dispatch(setCountry(ip.data["country_code"].toLowerCase()));
      } catch (error) {
        dispatch(setCountry("us"));
      }
    };
    !country && getCountry();
  }, [country, dispatch]);
  return (
    <div className="container-fluid d-flex flex-column vh-100 overflow-y-auto">
      <Title />
      <Routes>
        <Route path="*" element={<Navigate to="/news" />} />
        <Route path="news" element={<NavBar />}>
          <Route index element={<Navigate to="top-headlines" />} />
          <Route path=":endpoint" element={<Main />} />
          <Route path="saved" element={<Saved />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
