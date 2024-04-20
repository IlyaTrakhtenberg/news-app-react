import { Children, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { setCategory } from "../../data/store";
import { categories } from "../../data/optionsData";
import NavLinkAll from "./NavLinkAll";
import NavLinkSaved from "./NavLinkSaved";

const NavBar = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobile = useSelector((state) => state.isMobile);
  const currentCategory = useSelector((state) => state.category);
  const isEndpoint = useCallback(
    (endpoint) => params.endpoint === endpoint,
    [params]
  );
  const isCategory = useCallback(
    (category) => category.toLowerCase() === currentCategory,
    [currentCategory]
  );
  const handleCategory = useCallback(
    (value) => {
      !isEndpoint("top-headlines") && navigate("top-headlines");
      dispatch(setCategory(value));
    },
    [isEndpoint, dispatch, navigate]
  );
  return (
    <>
      <div className="row position-sticky top-0 bg-body" id="nav">
        {mobile ? (
          <NavLayout
            itemClass="p-2"
            border={isEndpoint(undefined) ? "border-shadow-bottom" : ""}
          >
            <NavLinkAll linkClass="btn btn-lg btn-light text-nowrap" />
            <select
              className={`w-100 fs-4 text-center rounded ${
                isEndpoint("top-headlines") ? "active" : "bg-light"
              }`}
              onChange={(e) => handleCategory(e.target.value)}
              defaultValue={currentCategory}
            >
              {!isEndpoint("top-headlines") && (
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
                  aria-selected={
                    isEndpoint("top-headlines") && isCategory(category)
                  }
                  className="bg-white w-50"
                />
              ))}
            </select>
            <NavLinkSaved
              linkClass="btn btn-lg btn-light text-nowrap"
              iconSize={2}
            />
          </NavLayout>
        ) : (
          <NavLayout itemClass="w-100" border="border-shadow-bottom">
            <NavLinkAll linkClass="nav-link text-black text-center px-1 w-100" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category.toLowerCase())}
                className={`nav-link text-black px-1 w-100 ${
                  isEndpoint("top-headlines")
                    ? `${isCategory(category) ? "active" : ""}`
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
            <NavLinkSaved
              linkClass="nav-link text-black text-center px-1 w-100"
              iconSize={1.2}
            />
          </NavLayout>
        )}
      </div>
      <Outlet />
    </>
  );
};
const NavLayout = ({ border, children, itemClass }) => (
  <ul className={"nav px-0 justify-content-evenly flex-nowrap " + border}>
    {Children.map(children, (child) => (
      <li className={"nav-item " + itemClass}>{child}</li>
    ))}
  </ul>
);
export default NavBar;
