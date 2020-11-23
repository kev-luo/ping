import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthContext } from "./useAuthContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const authContext = useAuthContext();

  return (
    <Route
      render={(props) =>
        !authContext.user ? <Redirect to="/portal" /> : <Component {...props} />
      }
      {...rest}
    />
  );
}
