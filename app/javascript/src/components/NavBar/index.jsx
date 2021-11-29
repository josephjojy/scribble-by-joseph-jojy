import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="border-b-2 px-8">
      <Header
        title={
          <span className="text-xl">
            <NavLink className="p-4" to="/">
              {" "}
              Scribble
            </NavLink>
            <NavLink
              activeClassName="text-indigo-500"
              className="p-4 text-gray-500"
              to="/articles"
            >
              Articles
            </NavLink>
            <NavLink
              activeClassName="text-indigo-500"
              className="p-4 text-gray-500"
              to="/security"
            >
              Security
            </NavLink>
          </span>
        }
        actionBlock={
          <Button
            label="Preview"
            style="secondary"
            size="large"
            icon={() => <ExternalLink size={20} className="ml-2" />}
          />
        }
      />
    </div>
  );
};

export default NavBar;
