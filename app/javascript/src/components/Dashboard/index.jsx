import React from "react";

import ArticleTable from "../ArticleTable";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar />
        <ArticleTable />
      </div>
    </div>
  );
};

export default Dashboard;
