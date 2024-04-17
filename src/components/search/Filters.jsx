import { useSearchParams } from "react-router-dom";
import ISO6391 from "iso-639-1";
import { languages, sortOptions } from "../../data/optionsData";
const Filters = ({ handleFilter }) => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <p>
        <span className="fw-medium mx-2">Sort by:</span>
        <select
          className="border border-dark rounded p-1"
          onChange={(e) => handleFilter("sortBy", e.target.value)}
          defaultValue={searchParams.get("sortBy")}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option} label={option} />
          ))}
        </select>
      </p>
      <p>
        <span className="fw-medium mx-2">From date:</span>
        <input
          type="date"
          className="p-1 rounded"
          value={searchParams.get("from") || ""}
          onChange={(e) => handleFilter("from", e.target.value)}
        />
      </p>
      <p>
        <span className="fw-medium mx-2">Language:</span>
        <select
          className="p-1 rounded border border-black"
          onChange={(e) => handleFilter("language", e.target.value)}
          defaultValue={searchParams.get("language")}
        >
          <option value="" label="Choose" />
          {languages.map((language) => (
            <option
              key={language}
              value={language}
              label={ISO6391.getNativeName(language)}
            />
          ))}
        </select>
      </p>
    </>
  );
};
export default Filters;
