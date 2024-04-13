import { NavLink, useNavigate } from "react-router-dom";
const categories = [
  "Sport",
  "Business",
  "Health",
  "Science",
  "Technology",
  "Entertainment",
];
const Categories = ({ mobile }) => {
  const navigate = useNavigate();
  return (
    <div className="row justify-content-center" id="nav">
      {mobile ? (
        <select
          className="cat-select fs-4 text-center"
          onChange={(e) => navigate(e.target.value)}
        >
          <option value="general" aria-selected={true}>
            General
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      ) : (
        <ul className="nav justify-content-center p-0">
          <li className="nav-item">
            <NavLink to="general" className="nav-link text-black">
              General
            </NavLink>
          </li>
          {categories.map((cat) => (
            <li key={cat} className="nav-item">
              <NavLink to={cat.toLowerCase()} className="nav-link text-black">
                {cat}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Categories;
