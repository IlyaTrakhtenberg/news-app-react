const url = "https://newsapi.org/v2/";
const apiKey = "aa0436e3d2664c0b9f7a7bdf592036a1";
const newsApiUrl = (params) => `${url}${params}&apiKey=${apiKey}`;
export default newsApiUrl;
