import React, { useState, useEffect } from "react";

import { Search, Plus, Close } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";
import { MenuBar } from "@bigbinary/neetoui/v2/layouts";

import categoriesApi from "apis/categories";

import AddCategory from "./AddCategory";

const SideBar = ({ selectedCategory, setSelectedCategory }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCategories = async () => {
    try {
      const respsonse = await categoriesApi.index();
      const { categories } = await respsonse.data;
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleClick = id => {
    if (selectedCategory === id) setSelectedCategory();
    else setSelectedCategory(id);
  };

  useEffect(() => {
    fetchCategories();
  }, [categories]);

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
              onClick: () => {
                setIsSearchCollapsed(!isSearchCollapsed),
                  setIsAddCollapsed(true);
              },
            },
            {
              icon: isAddCollapsed ? Plus : Close,
              onClick: () => {
                setIsAddCollapsed(!isAddCollapsed), setIsSearchCollapsed(true);
              },
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
          onCollapse={() => {
            setIsSearchCollapsed(true);
            setSearchText("");
          }}
          onChange={e => setSearchText(e.target.value)}
        />
        <AddCategory
          isAddCollapsed={isAddCollapsed}
          setIsAddCollapsed={setIsAddCollapsed}
        />
        {categories
          .filter(category =>
            category.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((category, index) => {
            return (
              <MenuBar.Block
                key={index}
                label={category.name}
                onClick={() => handleClick(category.id)}
                count={0}
                active={selectedCategory === category.id}
              />
            );
          })}
      </MenuBar>
    </div>
  );
};

export default SideBar;
