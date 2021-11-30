import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Articles from "../Articles";
import NavBar from "../NavBar";

const Dashboard = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/Articles" component={Articles} />
      <Redirect to="/Articles" />
    </Switch>
  </>
);

export default Dashboard;
