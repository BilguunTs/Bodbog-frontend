import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "../Context";
const AuthRoute = ({ component: Component, context, ...rest }) => {
  const { isAuth } = context.state;
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default connect(AuthRoute);
