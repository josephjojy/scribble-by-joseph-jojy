import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import General from "./General";
import MenuBar from "./Menubar";

const Settings = () => (
  <div className="flex">
    <MenuBar />
    <Switch>
      <Route exact path="/Settings/General" component={General} />
      <Redirect to="/Settings/General" />
    </Switch>
  </div>
);

export default Settings;
