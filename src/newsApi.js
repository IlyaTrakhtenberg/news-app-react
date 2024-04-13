const url = "https://newsapi.org/v2/top-headlines?";
const apiKey = "aa0436e3d2664c0b9f7a7bdf592036a1";
const newsApiUrl = (params) =>
  `${url}${Object.keys(params)
    .map((key) => params[key] && `${key}=${params[key]}&`)
    .join("")}apiKey=${apiKey}`;
export default newsApiUrl;
