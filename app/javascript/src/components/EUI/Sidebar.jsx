import React, { useEffect, useState } from "react";

import { Accordion } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { NavLink } from "react-router-dom";

import publicApi from "apis/public";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await publicApi.index();
      const { categories } = response.data;
      setCategories(categories);
    } catch (error) {
      Logger.error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" w-1/5 border-r-2 h-screen">
      <Accordion padded>
        {categories.map((category, index) => (
          <Accordion.Item
            key={index}
            title={category.name}
            className="border-none font-bold"
          >
            {category.articles?.map((article, index) => (
              <NavLink
                className="ml-6 py-1 flex"
                key={index}
                to={`/scribble/${article.slug}`}
                activeClassName="text-indigo-500"
              >
                {article.title}
              </NavLink>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Sidebar;
