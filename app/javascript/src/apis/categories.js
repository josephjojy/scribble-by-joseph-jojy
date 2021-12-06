import axios from "axios";

const index = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const destroy = id => axios.delete(`/categories/${id}`);

const update = (id, payload) => axios.put(`/categories/${id}`, payload);

const categoriesApi = {
  index,
  create,
  destroy,
  update,
};

export default categoriesApi;
