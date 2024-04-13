import { useSearchParams } from "react-router-dom";
import { sortOptions, countries } from "../optionsData";
const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCountry = searchParams.get("country")?.toUpperCase();
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
          {currentCountry}
          <img
            src={`https://flagsapi.com/${currentCountry}/flat/64.png`}
            alt=""
            style={{ height: "2rem" }}
          />
        </span>
        <select
          className="border border-dark rounded p-1 mx-1"
          onChange={(e) =>
            setSearchParams((searchParams) => {
              searchParams.set("country", e.target.value);
              return searchParams;
            })
          }
        >
          <option aria-selected={true} value={null}>
            Change
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country.toUpperCase()}
            </option>
          ))}
        </select>
      </p>
    </>
  );
};
export default Filters;
