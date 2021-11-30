import React, { useState } from "react";

import ArticleTable from "../ArticleTable";
import SideBar from "../SideBar";

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  return (
    <div className="flex">
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      <ArticleTable
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
      />
    </div>
  );
};

export default Articles;
