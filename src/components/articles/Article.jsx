import { useState } from "react";
import dayjs from "dayjs";
import SmoothCollapse from "react-smooth-collapse";
import readLaterUnsaved from "../../icons/read-later-unsaved.png";
import readLaterSaved from "../../icons/read-later-saved.png";
import noImage from "../../icons/img-placeholder.jpg";

const Article = ({ article, saved, onSave, active, onToggle }) => {
  const [error, setError] = useState(false);
  return (
    <div className={`row p-2 border-bottom ${active ? "active smooth" : ""}`}>
      <div className="col flex-grow-1">
        <div type="button" onClick={onToggle} className="fw-medium">
          {article.title}
        </div>
        <SmoothCollapse expanded={active}>
          <p className="my-1">
            {article.urlToImage && (
              <img
                className="m-2 float-start"
                style={{ maxHeight: "8rem", maxWidth: "60%" }}
                src={error ? noImage : article.urlToImage}
                onError={() => setError(true)}
                alt=""
              />
            )}
            <span className="me-2 text-secondary text-nowrap">
              {dayjs(article.publishedAt).format("MMM D, ha")}
            </span>
            <span style={{ textAlign: "justify" }}>
              {article.description ||
                article.content ||
                "Read more in the source"}
            </span>
          </p>
          <p className="my-1">
            <a
              className="fw-medium text-nowrap"
              href={article.url}
              rel="noreferrer"
              target="_blank"
            >{`Read on ${article.source.name}`}</a>
          </p>
        </SmoothCollapse>
      </div>
      <div className="col-auto d-flex align-items-center">
        <img
          src={saved ? readLaterSaved : readLaterUnsaved}
          alt=""
          role="button"
          onClick={onSave}
          style={{ height: "2rem" }}
        />
      </div>
    </div>
  );
};
export default Article;
