import Categories from "./Categories";
import Search from "./Search";
import Articles from "./Articles";

const Main = ({ mobile }) => {
  return (
    <>
      <div className="row position-sticky top-0">
        <div className="container-fluid bg-body border-bottom border-dark-subtle">
          <Categories mobile={mobile} />
          {mobile && (
            <div className="row justify-content-center pb-2">
              <Search mobile={mobile} />
            </div>
          )}
        </div>
      </div>

      <div className="row flex-grow-1">
        {!mobile && <Search mobile={mobile} />}
        <Articles />
      </div>
    </>
  );
};
export default Main;
