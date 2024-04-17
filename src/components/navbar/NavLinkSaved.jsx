import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import readLater from "../../icons/read-later-unsaved.png";

const NavLinkSaved = ({ linkClass, iconSize }) => {
  const savedArticles = useSelector((state) => state.saved);
  const savedNum = useMemo(
    () => (savedArticles.length < 100 ? savedArticles.length : "99+"),
    [savedArticles]
  );
  return (
    <NavLink to="saved" className={linkClass}>
      Saved
      <span className="position-relative">
        <img src={readLater} alt="" style={{ height: `${iconSize}rem` }} />
        {Boolean(savedNum) && (
          <span
            className="position-absolute translate-middle text-white rounded-pill bg-dark"
            style={{
              minWidth: `${(iconSize * 3) / 5}rem`,
              fontSize: `${iconSize / 3}rem`,
              padding: `${iconSize / 16}rem`,
              left: "75%",
              top: "25%",
            }}
          >
            {savedNum}
          </span>
        )}
      </span>
    </NavLink>
  );
};
export default NavLinkSaved;
