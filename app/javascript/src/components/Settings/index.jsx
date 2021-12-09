import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import MenuBar from "./Menubar";
import Redirections from "./Redirections";

const Settings = () => (
  <div className="flex overflow-y-hidden">
    <MenuBar />
    <Switch>
      <Route exact path="/Settings/General" component={General} />
      <Route exact path="/Settings/Redirections" component={Redirections} />
      <Route
        exact
        path="/Settings/Manage-Categories"
        component={ManageCategories}
      />
      <Redirect to="/Settings/General" />
    </Switch>
  </div>
);

export default Settings;
