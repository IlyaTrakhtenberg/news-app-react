import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const InpGroup = ({ margin }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inp, setInp] = useState("");
  const handleSearch = useCallback(
    () =>
      setSearchParams((searchParams) => {
        searchParams.set("q", inp);
        return searchParams;
      }),
    [setSearchParams, inp]
  );
  useEffect(() => setInp(searchParams.get("q") || ""), [searchParams]);
  return (
    <div className={"input-group " + margin}>
      <input
        className="form-control"
        value={inp}
        onChange={(e) => setInp(e.target.value)}
        placeholder="Search articles"
      />
      <button
        className="btn btn-dark"
        disabled={!inp || inp === searchParams.get("q")}
        onClick={() => handleSearch(inp)}
      >
        Search
      </button>
    </div>
  );
};
export default InpGroup;
