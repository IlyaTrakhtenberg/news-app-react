import { useDispatch } from "react-redux";
import { setCountry } from "../../data/store";
import { countries } from "../../data/optionsData";
const Region = ({ currentCountry, extended }) => {
  const dispatch = useDispatch();
  return (
    <p className="m-0 text-nowrap">
      {extended && <span className="fw-medium mx-2">Your region:</span>}
      <span>
        {currentCountry?.toUpperCase()}
        <img
          src={
            currentCountry &&
            `https://flagsapi.com/${currentCountry.toUpperCase()}/flat/64.png`
          }
          alt=""
          style={{ height: "2rem" }}
        />
      </span>
      <select
        className="border border-dark rounded p-1 mx-1"
        onChange={(e) => e.target.value && dispatch(setCountry(e.target.value))}
      >
        <option aria-selected={true} value={null} label="Change" />
        {countries.map((country) => (
          <option key={country} value={country} label={country.toUpperCase()} />
        ))}
      </select>
    </p>
  );
};
export default Region;
