import axios from "axios";

const index = () => axios.get("/site_settings");

const update = (id, payload) => axios.put(`/site_settings/${id}`, payload);

const siteSettingsApi = {
  index,
  update,
};

export default siteSettingsApi;
