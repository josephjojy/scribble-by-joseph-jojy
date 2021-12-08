import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const Navbar = ({ name }) => {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="text-center py-6 border-b-2">
        <Typography style="h2">{name}</Typography>
      </div>
    </div>
  );
};

export default Navbar;
