import React from "react";

import { ExternalLink } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";

const NavBar = () => {
  return (
    <div className="border-b-2 px-8">
      <Header
        title={
          <span className="text-xl space-x-8">
            <span>Scribble</span>
            <Button
              label="Articles"
              style="link"
              size="large"
              className="text-xl"
              to="/"
            />
            <Button
              label="Settings"
              style="link"
              size="large"
              className="text-xl text-gray-500"
              to="/settings"
            />
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
