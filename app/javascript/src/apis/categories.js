import axios from "axios";

const index = () => axios.get("/categories");

const categoriesApi = {
  index,
};

export default categoriesApi;
