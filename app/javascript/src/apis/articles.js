import axios from "axios";

const index = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const destroy = id => axios.delete(`/articles/${id}`);

const articlesApi = {
  index,
  create,
  destroy,
};

export default articlesApi;
