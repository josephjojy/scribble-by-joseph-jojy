import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="border-b-2 px-8 sticky top-0 z-50 bg-white">
      <Header
        title={
          <span className="text-xl">
            <NavLink className="p-4" to="/Articles">
              {" "}
              Scribble
            </NavLink>
            <NavLink
              activeClassName="text-indigo-500"
              className="p-4 text-gray-500"
              to="/Articles"
            >
              Articles
            </NavLink>
            <NavLink
              activeClassName="text-indigo-500"
              className="p-4 text-gray-500"
              to="/Settings"
            >
              Settings
            </NavLink>
          </span>
        }
        actionBlock={
          <Button
            label="Preview"
            style="secondary"
            size="large"
            icon={() => <ExternalLink size={20} className="ml-2" />}
            to="/scribble"
          />
        }
      />
    </div>
  );
};

export default NavBar;
