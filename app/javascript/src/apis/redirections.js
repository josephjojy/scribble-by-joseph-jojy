import axios from "axios";

const index = () => axios.get("/redirections");

const create = payload => axios.post("/redirections", payload);

const destroy = id => axios.delete(`/redirections/${id}`);

const update = (id, payload) => axios.put(`/redirections/${id}`, payload);

const redirectionsApi = {
  index,
  create,
  destroy,
  update,
};

export default redirectionsApi;
