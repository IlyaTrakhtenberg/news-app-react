import { Children, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { setCategory } from "../../data/store";
import { categories } from "../../data/optionsData";
import readLater from "../../icons/read-later-unsaved.png";

const NavBar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.isMobile);
  const currentCategory = useSelector((state) => state.category);
  const isTopHeadlines = useMemo(
    () => params.endpoint === "top-headlines",
    [params]
  );
  const isCategory = useCallback(
    (category) => category.toLowerCase() === currentCategory,
    [currentCategory]
  );
  const handleCategory = useCallback(
    (value) => {
      !isTopHeadlines && navigate("top-headlines");
      dispatch(setCategory(value));
    },
    [isTopHeadlines, dispatch, navigate]
  );
  return (
    <>
      <div className="row position-sticky top-0 bg-body" id="nav">
        {mobile ? (
          <NavLayout itemClass="p-2" border="">
            <NavLink
              to="everything"
              className="btn btn-lg btn-light text-nowrap"
            >
              All news
            </NavLink>
            <select
              className={`w-100 fs-4 text-center rounded ${
                isTopHeadlines ? "active" : "bg-light"
              }`}
              onChange={(e) => handleCategory(e.target.value)}
            >
              {!isTopHeadlines && (
                <option
                  ref={(node) => {
                    if (node) node.selected = true;
                  }}
                  label="Topics"
                />
              )}
              {categories.map((category) => (
                <option
                  key={category}
                  value={category.toLowerCase()}
                  label={category}
                  aria-selected={isTopHeadlines && isCategory(category)}
                  className="bg-white w-50"
                />
              ))}
            </select>
            <NavLink to="saved" className="btn btn-lg btn-light text-nowrap">
              Saved
              <img src={readLater} alt="" style={{ height: "2rem" }} />
            </NavLink>
          </NavLayout>
        ) : (
          <NavLayout
            itemClass="w-100"
            border="border-bottom border-dark-subtle"
          >
            <NavLink
              to="everything"
              className="nav-link text-black text-center px-1 w-100"
            >
              All news
            </NavLink>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category.toLowerCase())}
                className={`nav-link text-black px-1 w-100 ${
                  isTopHeadlines && `${isCategory(category) ? "active" : ""}`
                }`}
              >
                {category}
              </button>
            ))}
            <NavLink
              to="saved"
              className="nav-link text-black text-center px-1 w-100"
            >
              Saved
              <img src={readLater} alt="" style={{ height: "1.2rem" }} />
            </NavLink>
          </NavLayout>
        )}
      </div>
      <Outlet />
    </>
  );
};
const NavLayout = ({ border, children, itemClass }) => (
  <ul className={"nav px-2 justify-content-evenly flex-nowrap " + border}>
    {Children.map(children, (child) => (
      <li className={"nav-item " + itemClass}>{child}</li>
    ))}
  </ul>
);
export default NavBar;
