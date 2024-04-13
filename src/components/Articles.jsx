import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import newsApiUrl from "../newsApi";

const Articles = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(newsApiUrl(searchParams.toString()));
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    setError(false);
    getData();
  }, [searchParams]);
  return (
    <div className="col">
      {data?.articles.map((article) => (
        <div className="row border-bottom" key={article.url}>
          {article.title}
        </div>
      ))}
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
};
const Loader = () => (
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
export default Articles;
