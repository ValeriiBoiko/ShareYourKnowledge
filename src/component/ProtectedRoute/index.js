import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from '../Firebase';
import Loader from '../Loader';

function ProtectedRoute({ children, ...rest }) {
  const [isAuthentificated, setIsAuthentificated] = useState(null);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsAuthentificated(true)
    } else {
      setIsAuthentificated(false);
    }
  })

  if (isAuthentificated === null) {
    return <Loader />
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthentificated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/feed',
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

export default ProtectedRoute;