const Placeholder = ({ text }) => (
  <div className="row justify-content-center mt-3">
    <div className="col-auto fs-4">{text}</div>
  </div>
);
const Loading = () => (
  <div className="row justify-content-center mt-3">
    <div className="col-auto p-0 fs-4">Loading...</div>
    <div className="col-auto p-0">
      <div className="spinner-grow" role="status" />
    </div>
  </div>
);
const Error = () => (
  <div className="row justify-content-center mt-3">
    <div className="col-auto fs-4">{"Something went wrong :("}</div>
  </div>
);
export const content = {
  noResults: <Placeholder text="No articles found" />,
  message: <Placeholder text="Specify your request with search and filters" />,
  loading: <Loading />,
  error: <Error />,
};
