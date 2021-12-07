import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import siteSettingsApi from "apis/site_settings";

import Navbar from "./Navbar";

const EUI = () => {
  const [siteSetting, setSiteSetting] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSiteSettings = async () => {
    try {
      const response = await siteSettingsApi.show();
      const { site_setting } = await response.data;
      setSiteSetting(site_setting);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  if (loading) {
    return (
      <div className="absolute items-center w-full h-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <Navbar name={siteSetting.name} />
    </div>
  );
};

export default EUI;
