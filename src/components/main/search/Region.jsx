import { useDispatch } from "react-redux";
import { setCountry } from "../../../data/store";
import { countries } from "../../../data/optionsData";
const Region = ({ country, extended }) => {
  const dispatch = useDispatch();
  return (
    <p className="m-0 text-nowrap">
      {extended && <span className="fw-medium mx-2">Your region:</span>}
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
  );
};
export default Region;
