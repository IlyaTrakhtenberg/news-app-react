import { useSelector } from "react-redux";
import Search from "./search/Search";
import Articles from "./Articles";

const Main = () => {
  const mobile = useSelector((state) => state.isMobile);
  return (
    <>
      {mobile && <Search />}
      <div className="row flex-grow-1">
        {!mobile && <Search />}
        <Articles />
      </div>
    </>
  );
};
export default Main;
