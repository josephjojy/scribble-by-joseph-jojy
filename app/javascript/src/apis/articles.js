import axios from "axios";

const index = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const articlesApi = {
  index,
  create,
};

export default articlesApi;
