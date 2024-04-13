import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import axios from "axios";
import Title from "./components/Title";
import Main from "./components/Main";
const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobile, setMobile] = useState(false);
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
        setSearchParams((searchParams) => {
          searchParams.set("country", ip.data["country_code"].toLowerCase());
          return searchParams;
        });
      } catch (error) {
        setSearchParams((searchParams) => {
          searchParams.set("country", "us");
          return searchParams;
        });
      }
    };
    !searchParams.get("country") && getCountry();
  }, []);
  return (
    <div className="container-fluid d-flex flex-column vh-100 overflow-y-auto">
      <Title />
      <Routes>
        <Route path="*" element={<Navigate to="/categories" />} />
        <Route path="categories" element={<Main mobile={mobile} />} />
      </Routes>
    </div>
  );
};
export default App;
