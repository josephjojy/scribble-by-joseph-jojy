import React, { useEffect, useState } from "react";

import { Plus, Edit, Delete, Reorder } from "@bigbinary/neeto-icons";
import { Typography, Button, Alert } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import categoriesApi from "apis/categories";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleDelete = async () => {
    try {
      await categoriesApi.destroy(deleteId);
      fetchCategories();
    } catch (error) {
      Logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.index();
      const { categories } = await response.data;
      setCategories(categories);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mx-auto my-10">
      <Alert
        isOpen={deleteAlert}
        message="Are you sure you want to delete?"
        onClose={() => setDeleteAlert(false)}
        onSubmit={() => {
          handleDelete();
          setDeleteAlert(false);
        }}
        title="Delete Category!"
      />
      <div className="w-600">
        <Typography style="h2">Manage Categories</Typography>
        <Typography className="text-gray-600" style="body1">
          Create and configure the categories inside your scribble.
        </Typography>
        <div className="mt-8 space-y-4">
          <Typography className="my-auto text-indigo-500 font-semibold flex">
            <Plus />
            Add new category
          </Typography>
          {categories.map((category, index) => (
            <div key={index} className="flex justify-between border-t-2 pt-4">
              <Typography className="my-auto font-semibold flex" draggable>
                <Reorder />
                {category.name}
              </Typography>
              <div>
                <Button
                  icon={() => <Delete />}
                  style="text"
                  onClick={() => {
                    setDeleteAlert(true);
                    setDeleteId(category.id);
                  }}
                />
                <Button icon={() => <Edit />} style="text" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
