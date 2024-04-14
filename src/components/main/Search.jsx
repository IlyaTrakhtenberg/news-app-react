import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Filters from "./Filters";
const Search = () => {
  const mobile = useSelector((state) => state.isMobile);
  return (
    <>
      {mobile ? (
        <div className="col-auto">
          <div className="dropdown d-flex">
            <InpGroup margin={"me-2"} />
            <button
              className="btn btn-dark dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Filters
            </button>
            <ul className="dropdown-menu w-100 mt-1">
              <Filters />
            </ul>
          </div>
        </div>
      ) : (
        <div className="col-auto border-end border-dark-subtle p-0">
          <div className="container-fluid position-sticky py-3" id="search">
            <InpGroup margin={"mb-2"} />
            <Filters />
          </div>
        </div>
      )}
    </>
  );
};
const InpGroup = ({ margin }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inp, setInp] = useState(null);
  useEffect(() => {
    const search = document.getElementById("search");
    const nav = document.getElementById("nav");
    if (search) search.style.top = `${nav.clientHeight}px`;
  }, []);
  useEffect(() => {
    setInp(searchParams.get("q"));
  }, [searchParams]);
  return (
    <div className={"input-group " + margin}>
      <input
        type="text"
        className="form-control"
        value={inp || ""}
        onChange={(e) => setInp(e.target.value)}
        placeholder="Search articles"
      />
      <button
        className="btn btn-dark"
        type="button"
        onClick={() =>
          setSearchParams((searchParams) => {
            searchParams.set("q", inp);
            return searchParams;
          })
        }
      >
        Search
      </button>
    </div>
  );
};
export default Search;
