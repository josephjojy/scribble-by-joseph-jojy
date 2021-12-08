import React, { useState } from "react";

import { Input, Typography, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";

import Image from "../../../../assets/images/Group.png";

const Authentication = ({ name }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await authApi.login({ login: { password } });
      sessionStorage.setItem("authToken", response.data.authentication_token);
      setAuthHeaders();
      window.location.href = "./scribble";
    } catch (error) {
      Logger.error(error);
    }
  };
  return (
    <div className="mx-auto w-1/4 flex flex-col space-y-4 my-48">
      <img src={Image} className="block m-auto" />
      <div>
        <Typography style="h2">{name} is password protected!</Typography>
        <Typography className="text-gray-600">
          Enter the password to gain access to {name}.
        </Typography>
      </div>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <Input
          label="Password"
          type="text"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          label="Continue"
          onClick={handleSubmit}
          className="bg-indigo-500"
        />
      </form>
    </div>
  );
};

export default Authentication;
