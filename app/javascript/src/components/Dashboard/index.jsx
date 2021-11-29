import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import Articles from "../Articles";
import NavBar from "../NavBar";

const Dashboard = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/articles" component={Articles} />
      <Redirect to="/articles" />
    </Switch>
  </>
);

export default Dashboard;
