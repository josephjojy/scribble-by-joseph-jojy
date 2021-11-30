import axios from "axios";

const index = () => axios.get("/articles");

const articlesApi = {
  index,
};

export default articlesApi;
