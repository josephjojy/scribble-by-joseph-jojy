import axios from "axios";

const index = () => axios.get("/public");

const publicApi = {
  index,
};

export default publicApi;
