import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, Outlet, useParams } from "react-router-dom";
import { setCategory } from "../../data/store";
import { categories } from "../../data/optionsData";
import readLater from "../../icons/read-later-unsaved.png";
const NavBar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.isMobile);
  const category = useSelector((state) => state.category);
  return (
    <>
      <div className="row" id="nav">
        {mobile ? (
          <ul className="nav justify-content-center p-2">
            <li className="nav-item px-2">
              <NavLink to="everything" className="btn btn-lg btn-light">
                All news
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <select
                className={`fs-4 text-center rounded ${
                  params.endpoint === "top-headlines" ? "active" : "bg-light"
                }`}
                onChange={(e) => {
                  params.endpoint !== "top-headlines" &&
                    navigate("top-headlines");
                  dispatch(setCategory(e.target.value));
                }}
              >
                {params.endpoint !== "top-headlines" && (
                  <option selected>Topics</option>
                )}
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat.toLowerCase()}
                    aria-selected={
                      params.endpoint === "top-headlines" &&
                      cat.toLowerCase() === category
                    }
                    className="bg-white"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </li>
            <li className="nav-item px-2">
              <NavLink to="saved" className="btn btn-lg btn-light">
                Saved
                <img src={readLater} alt="" style={{ height: "2rem" }} />
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav justify-content-evenly flex-nowrap px-2">
            <li className={`nav-item w-100`}>
              <NavLink
                to="everything"
                className="nav-link text-black text-center px-1 w-100"
              >
                All news
              </NavLink>
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                className={`nav-item w-100 ${
                  params.endpoint === "top-headlines" &&
                  `${cat.toLowerCase() === category ? "active" : ""}`
                }`}
              >
                <button
                  onClick={() => {
                    params.endpoint !== "top-headlines" &&
                      navigate("top-headlines");
                    dispatch(setCategory(cat.toLowerCase()));
                  }}
                  className="nav-link text-black px-1 w-100"
                >
                  {cat}
                </button>
              </li>
            ))}
            <li className={`nav-item w-100`}>
              <NavLink
                to="saved"
                className="nav-link text-black text-center px-1 w-100"
              >
                Saved
                <img src={readLater} alt="" style={{ height: "1.2rem" }} />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <Outlet />
    </>
  );
};
export default NavBar;
