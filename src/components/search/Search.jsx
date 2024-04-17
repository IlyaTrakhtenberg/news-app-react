import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import InpGroup from "./InpGroup";
import Filters from "./Filters";
import Region from "./Region";
const Search = () => {
  const params = useParams();
  const endpoint = useMemo(() => params.endpoint, [params]);
  const [, setSearchParams] = useSearchParams();
  const mobile = useSelector((state) => state.isMobile);
  const country = useSelector((state) => state.country);
  const category = useSelector((state) => state.category);
  const setTop = (node) => {
    if (node) {
      const nav = document.getElementById("nav");
      node.style.top = `${nav.offsetHeight}px`;
    }
  };
  useEffect(() => {
    if (endpoint === "top-headlines") {
      if (country && category) {
        setSearchParams((searchParams) => {
          searchParams.set("country", country);
          searchParams.set("category", category);
          return searchParams;
        });
      }
    } else {
      setSearchParams((searchParams) => {
        searchParams.delete("country");
        searchParams.delete("category");
        return searchParams;
      });
    }
  }, [endpoint, country, category, setSearchParams]);
  const inpGroup = (margin) => <InpGroup margin={margin} />;
  const filters = (
    <Filters
      handleFilter={(param, value) =>
        setSearchParams((searchParams) => {
          searchParams.set(param, value);
          return searchParams;
        })
      }
    />
  );
  const region = <Region currentCountry={country} extended={!mobile} />;
  return (
    <>
      {mobile ? (
        <div
          className="row p-2 flex-nowrap position-sticky bg-body justify-content-center border-bottom border-dark-subtle"
          ref={(node) => setTop(node)}
        >
          <div className="col-auto d-flex">
            {inpGroup("me-2")}
            {endpoint === "top-headlines" ? (
              region
            ) : (
              <button
                type="button"
                className="btn btn-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="false"
              >
                Filters
              </button>
            )}
            <ul className="dropdown-menu w-auto mt-1 px-2">{filters}</ul>
          </div>
        </div>
      ) : (
        <div className="col-auto border-end border-dark-subtle p-0">
          <div
            className="container-fluid position-sticky py-3"
            ref={(node) => setTop(node)}
          >
            {inpGroup("mb-2")}
            {endpoint === "top-headlines" ? region : filters}
          </div>
        </div>
      )}
    </>
  );
};
export default Search;
