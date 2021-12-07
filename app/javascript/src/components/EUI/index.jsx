import React, { useEffect, useState } from "react";

import Logger from "js-logger";

import siteSettingsApi from "apis/site_settings";

import ArticlesBoard from "./ArticlesBoard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const EUI = () => {
  const [siteSetting, setSiteSetting] = useState({});

  const fetchSiteSettings = async () => {
    try {
      const response = await siteSettingsApi.show();
      const { site_setting } = await response.data;
      setSiteSetting(site_setting);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  return (
    <div>
      <Navbar name={siteSetting.name} />
      <div className="flex">
        <Sidebar />
        <ArticlesBoard />
      </div>
    </div>
  );
};

export default EUI;
