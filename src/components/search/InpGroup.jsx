import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const InpGroup = ({ margin }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inp, setInp] = useState("");
  const isValid = useMemo(() => {
    return searchParams.get("q") !== null
      ? searchParams.get("q") !== inp
      : Boolean(inp);
  }, [inp, searchParams]);
  const handleSearch = useCallback(
    () =>
      isValid &&
      setSearchParams((searchParams) => {
        searchParams.set("q", inp);
        return searchParams;
      }),
    [setSearchParams, isValid, inp]
  );
  useEffect(() => setInp(searchParams.get("q") || ""), [searchParams]);
  return (
    <div className={"input-group " + margin}>
      <input
        className="form-control"
        value={inp}
        onChange={(e) => setInp(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search articles"
      />
      <button
        className="btn btn-dark"
        disabled={!isValid}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};
export default InpGroup;
