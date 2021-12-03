import axios from "axios";

const index = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", payload);

const destroy = id => axios.delete(`/redirections/${id}`);

const redirectionsApi = {
  index,
  create,
  destroy,
};

export default redirectionsApi;
