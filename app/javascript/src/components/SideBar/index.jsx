import React, { useState } from "react";

import { Search, Plus, Close } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import AddCategory from "./AddCategory";

const SideBar = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);

  return (
    <div className="flex">
      <MenuBar showMenu={true} title="Articles">
        <MenuBar.Block label="All" count={13} active />
        <MenuBar.Block label="Draft" count={2} />
        <MenuBar.Block label="Published" count={7} />

        <MenuBar.SubTitle
          iconProps={[
            {
              icon: Search,
              onClick: () => setIsSearchCollapsed(!isSearchCollapsed),
            },
            {
              icon: isAddCollapsed ? Plus : Close,
              onClick: () => setIsAddCollapsed(!isAddCollapsed),
            },
          ]}
        >
          <Typography
            component="h4"
            style="h5"
            textTransform="uppercase"
            weight="bold"
          >
            Categories
          </Typography>
        </MenuBar.SubTitle>
        <MenuBar.Search
          collapse={isSearchCollapsed}
          onCollapse={() => setIsSearchCollapsed(true)}
        />
        <AddCategory
          isAddCollapsed={isAddCollapsed}
          setIsAddCollapsed={setIsAddCollapsed}
        />
        <MenuBar.Block label="Getting Started" count={80} />
        <MenuBar.Block label="Apps Integration" count={40} />
        <MenuBar.Block label="Misc" count={20} />
      </MenuBar>
    </div>
  );
};

export default SideBar;
