import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeArticle } from "../data/store";
import dayjs from "dayjs";
import noImage from "../icons/img-placeholder.jpg";
import closeIcon from "../icons/close-button.svg";

const Saved = () => {
  const savedArticles = useSelector((state) => state.saved);
  return (
    <div className="row flex-grow-1">
      <div className="container-fluid">
        {savedArticles?.map((article) => (
          <Article key={article.url} article={article} />
        ))}
        {!savedArticles?.length && <Placeholder />}
      </div>
    </div>
  );
};
const Article = ({ article }) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="row p-2 border-bottom">
      <div className="col flex-grow-1">
        <div
          className="m-2 d-flex float-start overflow-hidden"
          style={{ width: "12rem", maxHeight: "8rem" }}
        >
          {article.urlToImage ? (
            <img
              className="w-100 object-fit-cover"
              src={error ? noImage : article.urlToImage}
              onError={() => setError(true)}
              alt=""
            />
          ) : (
            <span className="flex-fill py-2 fs-3 border border-2 border-dark text-center">
              {article.author}
            </span>
          )}
        </div>

        <p className="my-1 fw-medium">{article.title}</p>
        <p className="my-1">
          <span className="me-2 text-secondary text-nowrap">
            {dayjs(article.publishedAt).format("MMM D, ha")}
          </span>
          <span>
            {article.description ||
              article.content ||
              "Read more in the source"}
          </span>
          <span className="ms-2">
            <a
              className="fw-medium text-nowrap"
              href={article.url}
              rel="noreferrer"
              target="_blank"
            >{`Read on ${article.source.name}`}</a>
          </span>
        </p>
      </div>
      <div className="col-md-auto col-12 d-flex align-items-center justify-content-center">
        <button
          className="btn btn-light"
          onClick={() => dispatch(removeArticle(article.url))}
        >
          Remove
          <img src={closeIcon} alt="" style={{ height: "1rem" }} />
        </button>
      </div>
    </div>
  );
};
const Placeholder = () => (
  <div className="row justify-content-center mt-3">
    <div className="col-auto fs-4">You don't have any saved articles yet</div>
  </div>
);
export default Saved;
