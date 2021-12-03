import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import General from "./General";
import MenuBar from "./Menubar";
import Redirections from "./Redirections";

const Settings = () => (
  <div className="flex">
    <MenuBar />
    <Switch>
      <Route exact path="/Settings/General" component={General} />
      <Route exact path="/Settings/Redirections" component={Redirections} />
      <Redirect to="/Settings/General" />
    </Switch>
  </div>
);

export default Settings;
