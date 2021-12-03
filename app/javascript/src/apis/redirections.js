import axios from "axios";

const index = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", payload);

const redirectionsApi = {
  index,
  create,
};

export default redirectionsApi;
