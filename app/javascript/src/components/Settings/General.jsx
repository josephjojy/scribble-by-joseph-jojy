import React, { useState, useEffect } from "react";

import { Check, Close } from "@bigbinary/neeto-icons";
import { Typography, Input, Checkbox, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import siteSettingsApi from "apis/site_settings";

const General = () => {
  const defaultErrors = {
    name: null,
    passwordLength: null,
    passwordInclude: null,
  };
  const passwordCheckRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  const [siteName, setSiteName] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState(defaultErrors);

  const handleChange = e => {
    const pass = e.target.value;
    setErrors({
      ...errors,
      passwordLength: pass.length > 5 ? true : false,
      passwordInclude: pass.match(passwordCheckRegex) ? true : false,
    });
    setPassword(pass);
  };

  const handleSubmit = async () => {
    setErrors({
      ...errors,
      name: siteName ? null : "Enter site name",
    });
    if (
      siteName &&
      (!isPassword || (errors.passwordInclude && errors.passwordLength))
    ) {
      try {
        await siteSettingsApi.update({
          site_setting: {
            name: siteName,
            password: password,
          },
        });
      } catch (error) {
        Logger.error(error);
      }
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await siteSettingsApi.show();
      const { site_setting } = await response.data;
      setSiteName(site_setting.name);
    } catch (error) {
      Logger.error(error);
    }
  };
  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="overflow-y-scroll w-full flex justify-center my-10">
      <div className="w-500">
        <Typography style="h2">General Settings</Typography>
        <Typography className="text-gray-600" style="body1">
          Configure general attributes of scribble.
        </Typography>
        <Input
          value={siteName}
          placeholder="Enter site name"
          label="Site Name"
          className="pt-6"
          size="large"
          onChange={e => {
            setSiteName(e.target.value);
            setErrors({ ...errors, name: null });
          }}
          error={errors.name}
        />
        <Typography className="text-gray-500" style="body1">
          Customize the site name which is used to show the site name in{" "}
          <strong>Open Graph Tags</strong>
        </Typography>
        <div className="border-t-2 mt-6 pt-4">
          <Checkbox
            checked={isPassword}
            id="checkbox_name"
            label={
              <span className="font-bold">Password Protect Knowledge Base</span>
            }
            onChange={() => {
              setIsPassword(!isPassword);
              setPassword("");
              setErrors(defaultErrors);
            }}
            style={{ color: "rgba(99, 102, 241)" }}
          />
          {isPassword && (
            <div>
              <Input
                placeholder="Enter password"
                type="password"
                label="Password"
                className="mt-6 w-1/2"
                size="large"
                value={password}
                onChange={e => handleChange(e)}
              />
              <div className="flex flex-row mt-3">
                {errors.passwordLength ? (
                  <Check size="20" style={{ color: "green" }} />
                ) : (
                  <Close size="20" style={{ color: "red" }} />
                )}
                <div className="pl-2 my-auto">Have at least 6 characters</div>
              </div>
              <div className="flex flex-row">
                {errors.passwordInclude ? (
                  <Check size="20" style={{ color: "green" }} />
                ) : (
                  <Close size="20" style={{ color: "red" }} />
                )}
                <div className="pl-2 my-auto">
                  Include at least 1 letter and 1 number
                </div>
              </div>
            </div>
          )}
          <div className="mt-6">
            <Button
              label="Save Changes"
              className="bg-indigo-500"
              onClick={() => handleSubmit()}
            />
            <Button label="Cancel" style="text" to="/" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
