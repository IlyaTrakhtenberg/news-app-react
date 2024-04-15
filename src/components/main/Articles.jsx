import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import newsApiUrl from "../../data/newsApi";
import readLaterUnsaved from "../../icons/read-later-unsaved.png";
import readLaterSaved from "../../icons/read-later-saved.png";

const Articles = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const endpoint = useMemo(() => params.endpoint, [params]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios(
          newsApiUrl(`${endpoint}?${searchParams.toString()}`)
        );
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    setData(null);
    setMessage(false);
    setError(false);
    switch (endpoint) {
      case "everything":
        searchParams.size ? getData() : setMessage(true);
        break;
      case "top-headlines":
        searchParams.size && getData();
        break;
      default:
    }
  }, [endpoint, searchParams]);
  return (
    <div className="col">
      {data?.articles.map((article) => (
        <Article article={article} key={article.url} />
      ))}
      {message && <Message />}
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
};
const Article = ({ article }) => (
  <div className="row p-2 border-bottom">
    <div className="col flex-grow-1">
      <div
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={"#" + article.url}
        className="fw-medium"
      >
        {article.title}
      </div>
      <div className="collapse" id={article.url}>
        <p className="my-1 text-secondary">
          {dayjs(article.publishedAt).format("MMM D, ha")}
        </p>
        <p className="my-1">
          {article.urlToImage && (
            <img
              className="m-2 float-start"
              style={{ maxHeight: "8rem", maxWidth: "60%" }}
              src={article.urlToImage}
              alt=""
            />
          )}
          <span style={{ textAlign: "justify" }}>
            {article.description ||
              article.content ||
              "Read more in the source"}
          </span>
        </p>
        <p className="my-1">
          <a
            className="fw-medium"
            href={article.url}
            rel="noreferrer"
            target="_blank"
          >{`Read on ${article.source.name}`}</a>
        </p>
      </div>
    </div>
    <div className="col-auto d-flex align-items-center">
      <img
        src={readLaterUnsaved}
        alt=""
        role="button"
        style={{ height: "2rem" }}
      />
    </div>
  </div>
);
const Message = () => (
  <div className="row justify-content-center mt-3">
    <div className="col-auto fs-4">
      Specify your request with search and filters
    </div>
  </div>
);
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
