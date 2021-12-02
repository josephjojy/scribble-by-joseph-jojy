import React from "react";

import { Settings, Repeat, Seo } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { NavLink } from "react-router-dom";

const Menubar = () => {
  return (
    <div className="max-w-xs border-r-2 h-screen">
      <div className="py-4 mx-1 space-y-2">
        <NavLink
          to={"/Settings/General"}
          className="flex p-3"
          activeClassName="bg-indigo_50"
        >
          <Settings size="28" className="my-auto" />
          <div className="pl-2">
            <Typography style="h3">General</Typography>
            <Typography style="body3">
              Page Title, Brand Name & Meta Description
            </Typography>
          </div>
        </NavLink>
        <NavLink
          to={"/Settings/Redirections"}
          className="flex p-3"
          activeClassName="bg-indigo_50"
        >
          <Repeat size="28" className="my-auto" />
          <div className="pl-2">
            <Typography style="h3">Redirections</Typography>
            <Typography style="body3">
              Create & configure redirection rules
            </Typography>
          </div>
        </NavLink>
        <NavLink
          to={"/Settings/Manage-Categories"}
          className="flex p-3"
          activeClassName="bg-indigo_50"
        >
          <Seo size="28" className="my-auto" />
          <div className="pl-2">
            <Typography style="h3">Manage Categories</Typography>
            <Typography style="body3">Edit and Reorder KB Structure</Typography>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Menubar;
