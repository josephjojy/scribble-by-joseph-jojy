import axios from "axios";

const index = () => axios.get("/articles");

const create = payload => axios.post("/articles", payload);

const destroy = id => axios.delete(`/articles/${id}`);

const show = id => axios.get(`/articles/${id}`);

const update = (id, payload) => axios.put(`/articles/${id}`, payload);

const articlesApi = {
  index,
  create,
  destroy,
  show,
  update,
};

export default articlesApi;
