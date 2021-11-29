import React from "react";

import ArticleTable from "../ArticleTable";
import SideBar from "../SideBar";

const Articles = () => {
  return (
    <div className="flex">
      <SideBar />
      <ArticleTable />
    </div>
  );
};

export default Articles;
