import axios from "axios";

const index = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const destroy = id => axios.delete(`/categories/${id}`);

const categoriesApi = {
  index,
  create,
  destroy,
};

export default categoriesApi;
