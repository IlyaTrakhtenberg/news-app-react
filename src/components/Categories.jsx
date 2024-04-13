import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../optionsData";
const Categories = ({ mobile }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    !searchParams.get("category") &&
      setSearchParams((searchParams) => {
        searchParams.set("category", "general");
        return searchParams;
      });
  }, [searchParams]);
  return (
    <div className="row justify-content-center" id="nav">
      {mobile ? (
        <select
          className="fs-3 text-center"
          onChange={(e) =>
            setSearchParams((searchParams) => {
              searchParams.set("category", e.target.value);
              return searchParams;
            })
          }
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat.toLowerCase()}
              aria-selected={cat.toLowerCase() === searchParams.get("category")}
            >
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <ul className="nav justify-content-center p-0">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`nav-item ${
                cat.toLowerCase() === searchParams.get("category")
                  ? "active"
                  : ""
              }`}
            >
              <button
                onClick={() =>
                  setSearchParams((searchParams) => {
                    searchParams.set("category", cat.toLowerCase());
                    return searchParams;
                  })
                }
                className="nav-link text-black"
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Categories;
