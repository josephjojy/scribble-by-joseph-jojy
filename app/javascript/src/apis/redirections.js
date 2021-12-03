import axios from "axios";

const index = () => axios.get("/redirections");

const redirectionsApi = {
  index,
};

export default redirectionsApi;
