import axios from "axios";

const index = () => axios.get("/public");

const show = slug => axios.get(`/public/${slug}`);

const publicApi = {
  index,
  show,
};

export default publicApi;
