import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { sortOptions, countries } from "../../data/optionsData";
import { setCountry } from "../../data/store";
const Filters = () => {
  const params = useParams();
  const endpoint = useMemo(() => params.endpoint, [params]);
  const [, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.country);
  const category = useSelector((state) => state.category);
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
  return (
    <>
      <p>
        <span className="fw-medium mx-2">Sort by:</span>
        <select
          className="border border-dark rounded p-1"
          onChange={(e) =>
            setSearchParams((searchParams) => {
              searchParams.set("sortBy", e.target.value);
              return searchParams;
            })
          }
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </p>
      <p>
        <span className="fw-medium mx-2">From date:</span>
        <input
          type="date"
          className="p-1 rounded"
          onChange={(e) =>
            setSearchParams((searchParams) => {
              searchParams.set("from", e.target.value);
              return searchParams;
            })
          }
        />
      </p>
      <p>
        <span className="fw-medium mx-2">Your region:</span>
        <span>
          {country?.toUpperCase()}
          <img
            src={
              country &&
              `https://flagsapi.com/${country.toUpperCase()}/flat/64.png`
            }
            alt=""
            style={{ height: "2rem" }}
          />
        </span>
        <select
          className="border border-dark rounded p-1 mx-1"
          onChange={(e) => dispatch(setCountry(e.target.value))}
        >
          <option aria-selected={true} value={null}>
            Change
          </option>
          {countries.map((cnt) => (
            <option key={cnt} value={cnt}>
              {cnt.toUpperCase()}
            </option>
          ))}
        </select>
      </p>
    </>
  );
};
export default Filters;
