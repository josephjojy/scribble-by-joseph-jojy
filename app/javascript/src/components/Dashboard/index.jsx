import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Articles from "../Articles";
import AddArticles from "../Articles/AddArticles";
import EditArticles from "../Articles/EditArticles";
import NavBar from "../NavBar";
import Settings from "../Settings";

const Dashboard = () => (
  <div className="flex flex-col h-screen">
    <NavBar />
    <Switch>
      <Route exact path="/Articles/dashboard" component={Articles} />
      <Route exact path="/Articles/create" component={AddArticles} />
      <Route exact path="/Articles/:id/edit" component={EditArticles} />
      <Route path="/Settings" component={Settings} />
      <Redirect to="/Articles/dashboard" />
    </Switch>
  </div>
);

export default Dashboard;
