import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import redirectionsApi from "./apis/redirections";
import Dashboard from "./components/Dashboard";
import EUI from "./components/EUI";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirections, setRedirections] = useState([]);

  const fetchRedirections = async () => {
    try {
      const response = await redirectionsApi.index();
      const { redirections } = response.data;
      setRedirections(redirections);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchRedirections();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {redirections.map((redirection, index) => (
          <Redirect
            key={index}
            exact
            from={`/scribble/${redirection.from_url}`}
            to={`/scribble/${redirection.to_url}`}
          />
        ))}
        <Route path="/scribble/:slug" component={EUI} />
        <Route path="/scribble" component={EUI} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
