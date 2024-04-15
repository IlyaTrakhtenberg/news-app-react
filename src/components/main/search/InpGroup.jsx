import { useState } from "react";

const InpGroup = ({ margin, searchParams, handleSearch }) => {
  const [inp, setInp] = useState(searchParams.get("q"));
  return (
    <div className={"input-group " + margin}>
      <input
        className="form-control"
        value={inp || ""}
        onChange={(e) => setInp(e.target.value)}
        placeholder="Search articles"
      />
      <button className="btn btn-dark" onClick={() => handleSearch(inp)}>
        Search
      </button>
    </div>
  );
};
export default InpGroup;
