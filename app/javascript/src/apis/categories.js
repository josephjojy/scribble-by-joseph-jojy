import axios from "axios";

const index = () => axios.get("/categories");

const create = payload => axios.post("/categories", payload);

const categoriesApi = {
  index,
  create,
};

export default categoriesApi;
