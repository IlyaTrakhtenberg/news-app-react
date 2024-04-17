import { NavLink } from "react-router-dom";

const NavLinkAll = ({ linkClass }) => (
  <NavLink to="everything" className={linkClass}>
    All news
  </NavLink>
);
export default NavLinkAll;
