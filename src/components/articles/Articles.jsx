import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import newsApiUrl from "../../data/newsApi";
import { addArticle, removeArticle, setData } from "../../data/store";
import { content } from "./OtherContent";
import Article from "./Article";
import { requestSample, responseSample } from "../../data/sample";

const Articles = () => {
  const [status, setStatus] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.saved);
  const data = useSelector((state) => state.data);
  const request = useMemo(() => {
    if (params.endpoint === "everything" && !searchParams.get("q")) {
      setStatus("message");
      return null;
    }
    return searchParams.size
      ? `${params.endpoint}?${searchParams.toString()}`
      : null;
  }, [params, searchParams]);
  const handleSave = useCallback(
    (article) => {
      const isSaved = savedArticles
        ?.map((savedArticle) => savedArticle.url)
        .includes(article.url);
      return {
        status: isSaved,
        method: () =>
          dispatch(isSaved ? removeArticle(article.url) : addArticle(article)),
      };
    },
    [savedArticles, dispatch]
  );
  useEffect(() => {
    const getData = async () => {
      setStatus("loading");
      try {
        const response = await axios(newsApiUrl(request));
        if (response.data.totalResults) {
          dispatch(
            setData({ articles: response.data.articles, request: request })
          );
          setStatus(null);
        } else setStatus("noResults");
      } catch (error) {
        //setStatus("error");
        dispatch(setData({ articles: responseSample, request: requestSample }));
      }
    };
    if (request) {
      setStatus(null);
      request !== data?.request && getData();
    }
  }, [request, data, dispatch]);
  return (
    <div className="col">
      {status
        ? content[status]
        : data?.articles
            .filter((article) => article.url !== "https://removed.com")
            .map((article) => (
              <Article
                key={article.url}
                article={article}
                saved={handleSave(article).status}
                onSave={handleSave(article).method}
                active={article.url === activeArticle}
                onToggle={() =>
                  setActiveArticle(
                    article.url === activeArticle ? null : article.url
                  )
                }
              />
            ))}
    </div>
  );
};
export default Articles;
