import { useSelector } from "react-redux";
import Search from "./Search";
import Articles from "./Articles";

const Main = () => {
  const mobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className="row position-sticky top-0">
        <div className="container-fluid bg-body border-bottom border-dark-subtle">
          {mobile && (
            <div className="row justify-content-center pb-2">
              <Search />
            </div>
          )}
        </div>
      </div>
      <div className="row flex-grow-1">
        {!mobile && <Search />}
        <Articles />
      </div>
    </>
  );
};
export default Main;
