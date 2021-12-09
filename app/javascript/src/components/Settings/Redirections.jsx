import React, { useState, useEffect } from "react";

import { Edit, Delete, Plus, Check } from "@bigbinary/neeto-icons";
import {
  Typography,
  Button,
  Input,
  Alert,
  PageLoader,
} from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import redirectionsApi from "apis/redirections";

const Redirections = () => {
  const [isAddRedirection, setIsAddRedirection] = useState(false);
  const [toUrl, setToUrl] = useState("");
  const [fromUrl, setFromUrl] = useState("");
  const [redirections, setRedirections] = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [editId, setEditId] = useState();
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    try {
      await redirectionsApi.destroy(deleteId);
      fetchRedirections();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleEdit = async () => {
    try {
      await redirectionsApi.update(editId, {
        redirection: {
          from_url: fromUrl,
          to_url: toUrl,
        },
      });
      setEditId();
      fetchRedirections();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleCreate = async () => {
    try {
      await redirectionsApi.create({
        redirection: {
          from_url: fromUrl,
          to_url: toUrl,
        },
      });
      fetchRedirections();
    } catch (error) {
      Logger.error(error);
    }
    setIsAddRedirection(false);
  };

  const fetchRedirections = async () => {
    try {
      const response = await redirectionsApi.index();
      const { redirections } = response.data;
      setRedirections(redirections);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="overflow-y-scroll w-full flex justify-center my-10">
      <Alert
        isOpen={deleteAlert}
        message="Are you sure you want to delete?"
        onClose={() => setDeleteAlert(false)}
        onSubmit={() => {
          handleDelete();
          setDeleteAlert(false);
        }}
        title="Delete Redirection!"
      />
      <div className="w-800">
        <Typography style="h2">Redirections</Typography>
        <Typography className="text-gray-600" style="body1">
          Create and configure redirection rules to send users from old links to
          new links. All redirections are performed with 301 status codes to be
          SEO friendly.
        </Typography>
        <div className="bg-indigo_50 px-6 py-6 mt-6">
          <table className="w-full text-left table-fixed">
            <tr className="text-gray-500 ">
              <th className="p-4">From Path</th>
              <th className="p-4">To Path</th>
              <th className="text-center p-4">Action</th>
            </tr>
            {redirections.map((redirection, index) => {
              return redirection.id === editId ? (
                <>
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
                        onClick={() => handleEdit()}
                      />
                    </td>
                  </tr>
                </>
              ) : (
                <tr key={index} className="bg-white border-8 border-indigo_50">
                  <td className=" p-4 overflow-x-auto border-white">
                    <span className="text-gray-500">
                      {window.location.host}/scribble
                    </span>
                    /{redirection.from_url}
                  </td>
                  <td className=" p-4 overflow-x-auto border-white">
                    {window.location.host}/scribble/{redirection.to_url}
                  </td>
                  <td className="flex justify-evenly  p-4">
                    <Button
                      icon={() => <Edit />}
                      style="text"
                      onClick={() => {
                        setIsAddRedirection(false);
                        setToUrl(redirection.to_url);
                        setFromUrl(redirection.from_url);
                        setEditId(redirection.id);
                      }}
                    />
                    <Button
                      icon={() => <Delete />}
                      style="text"
                      onClick={() => {
                        setDeleteAlert(true);
                        setDeleteId(redirection.id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

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
                    onClick={() => handleCreate()}
                  />
                </td>
              </tr>
            )}
          </table>
          <div
            className="mt-4 flex cursor-pointer"
            onClick={() => {
              setIsAddRedirection(true);
              setEditId();
              setFromUrl("");
              setToUrl("");
            }}
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
