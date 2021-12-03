import React, { useState } from "react";

import ArticleTable from "./ArticleTable";
import SideBar from "./SideBar";

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [articles, setArticles] = useState([]);

  return (
    <div className="flex">
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        articles={articles}
      />
      <ArticleTable
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        articles={articles}
        setArticles={setArticles}
      />
    </div>
  );
};

export default Articles;
