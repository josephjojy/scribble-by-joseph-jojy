import React, { useState } from "react";

import ArticleTable from "../ArticleTable";
import SideBar from "../SideBar";

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState();
  return (
    <div className="flex">
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ArticleTable selectedCategory={selectedCategory} />
    </div>
  );
};

export default Articles;
