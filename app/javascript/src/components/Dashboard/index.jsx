import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Articles from "../Articles";
import AddArticles from "../Articles/AddArticles";
import EditArticles from "../Articles/EditArticles";
import NavBar from "../NavBar";

const Dashboard = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/Articles" component={Articles} />
      <Route exact path="/Articles/create" component={AddArticles} />
      <Route exact path="/Articles/:id/edit" component={EditArticles} />
      <Redirect to="/Articles" />
    </Switch>
  </>
);

export default Dashboard;
