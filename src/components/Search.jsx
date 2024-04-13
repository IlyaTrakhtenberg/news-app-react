import { useEffect } from "react";

const Search = ({ mobile }) => {
  useEffect(() => {
    const search = document.getElementById("search");
    const nav = document.getElementById("nav");
    if (search) search.style.top = `${nav.clientHeight + 16}px`;
  }, []);
  return (
    <>
      {mobile ? (
        <div className="col-auto">
          <div className="dropdown d-flex">
            <div className="input-group me-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search articles"
              />
              <button className="btn btn-dark" type="button">
                Search
              </button>
            </div>
            <button
              className="btn btn-dark dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Filters
            </button>
            <ul className="dropdown-menu w-100"></ul>
          </div>
        </div>
      ) : (
        <div className="col-auto border-end border-dark-subtle px-0 py-3">
          <div className="container-fluid position-sticky" id="search">
            <div className="input-group me-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search articles"
              />
              <button className="btn btn-dark" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Search;
