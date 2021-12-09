import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { either, isEmpty, isNil } from "ramda";

import siteSettingsApi from "apis/site_settings";

import ArticlesBoard from "./ArticlesBoard";
import Authentication from "./Authentication";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const EUI = () => {
  const authToken = sessionStorage.getItem("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

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
    <div className="flex flex-col h-screen">
      <Navbar name={siteSetting.name} />
      {!isLoggedIn && siteSetting.hasPassword ? (
        <Authentication name={siteSetting.name} />
      ) : (
        <div className="flex overflow-y-hidden">
          <Sidebar />
          <ArticlesBoard />
        </div>
      )}
    </div>
  );
};

export default EUI;
