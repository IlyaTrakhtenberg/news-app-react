import ISO6391 from "iso-639-1";
import { languages, sortOptions } from "../../../data/optionsData";
import closeButton from "../../../icons/close-button.svg";
const Filters = ({ handleFilter }) => {
  return (
    <>
      <p>
        <span className="fw-medium mx-2">Sort by:</span>
        <select
          className="border border-dark rounded p-1"
          onChange={(e) => handleFilter("sortBy", e.target.value)}
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
          onChange={(e) => handleFilter("from", e.target.value)}
        />
      </p>
      <p>
        <span className="fw-medium mx-2">Languages:</span>
        <select className="p-1 rounded border border-black">
          <option>Choose</option>
          {languages.map((language) => (
            <option key={language}>{ISO6391.getNativeName(language)}</option>
          ))}
        </select>
      </p>
      <p className="text-wrap" style={{ width: "15rem" }}>
        {languages.map((language) => (
          <span
            className="btn-group p-1 m-1 bg-body-secondary align-items-center"
            role="group"
            key={language}
          >
            <span style={{ fontSize: "0.8rem" }}>
              {ISO6391.getNativeName(language)}
            </span>
            <img type="button" src={closeButton} style={{ height: "0.8rem" }} />
          </span>
        ))}
      </p>
    </>
  );
};
export default Filters;
