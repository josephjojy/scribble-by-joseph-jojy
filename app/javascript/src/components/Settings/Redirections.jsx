import React, { useState } from "react";

import { Edit, Delete, Plus, Check } from "@bigbinary/neeto-icons";
import { Typography, Button, Input } from "@bigbinary/neetoui/v2";

const Redirections = () => {
  const [isAddRedirection, setIsAddRedirection] = useState(false);
  const [toUrl, setToUrl] = useState("");
  const [fromUrl, setFromUrl] = useState("");

  const handleCreateSubmit = () => {
    setIsAddRedirection(false);
  };

  return (
    <div className="mx-auto my-10">
      <div className="w-700">
        <Typography style="h2">Redirections</Typography>
        <Typography className="text-gray-600" style="body1">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </Typography>
        <div className="bg-indigo_50 px-6 py-6 mt-6">
          <table className="w-full text-left">
            <tr className="text-gray-500 ">
              <th className="p-4">From Path</th>
              <th className="p-4">To Path</th>
              <th className="text-center p-4">Action</th>
            </tr>
            <tr className="bg-white border-8 border-indigo_50">
              <td className=" p-4">
                <span className="text-gray-500">{window.location.host}</span>
                /welcome
              </td>
              <td className=" p-4">{window.location.host}</td>
              <td className="flex justify-evenly  p-4">
                <Button icon={() => <Edit />} style="text" />
                <Button icon={() => <Delete />} style="text" />
              </td>
            </tr>
            {isAddRedirection && (
              <tr className="bg-white border-8 border-indigo_50">
                <td className=" p-4">
                  <Input
                    value={fromUrl}
                    onChange={e => setFromUrl(e.target.value)}
                  />
                </td>
                <td className=" p-4">
                  <Input
                    value={toUrl}
                    onChange={e => setToUrl(e.target.value)}
                  />
                </td>
                <td className="flex justify-evenly  p-4">
                  <Button
                    icon={() => <Check />}
                    style="text"
                    onClick={() => handleCreateSubmit()}
                  />
                </td>
              </tr>
            )}
          </table>
          <div
            className="mt-4 flex cursor-pointer"
            onClick={() => setIsAddRedirection(true)}
          >
            <Plus />
            <Typography className="my-auto text-indigo-500 font-semibold">
              Add New Redirections
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirections;
