import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";

//Pages
import Dashboard from "./Dashboard";

const Routes = ({ user }) => {
  return (
    <React.Fragment>
      <FullPageLoader />

      {!user.isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={Dashboard} />

          <Redirect to="/" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path={`/`} component={Dashboard} />
          <Redirect to={`/`} />
        </Switch>
      )}
    </React.Fragment>
  );
};

export default connect((state) => ({ user: state.user }), null)(Routes);
