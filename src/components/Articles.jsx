import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Articles = ({ loading, error, data, setCategory }) => {
  const { category } = useParams();
  useEffect(() => setCategory(category), [category]);
  return (
    <div className="col">
      {data?.articles.map((article) => (
        <p key={article.url}>{article.title}</p>
      ))}
    </div>
  );
};
export default Articles;
