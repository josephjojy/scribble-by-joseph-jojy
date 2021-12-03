import React from "react";

import { Plus, Edit, Delete, Reorder } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";

const ManageCategories = () => {
  return (
    <div className="mx-auto my-10">
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
          <div className="flex justify-between border-t-2 pt-4">
            <Typography className="my-auto font-semibold flex" draggable>
              <Reorder />
              General Settings
            </Typography>
            <div>
              <Button icon={() => <Edit />} style="text" />
              <Button icon={() => <Delete />} style="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
