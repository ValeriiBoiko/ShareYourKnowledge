import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebase from '../Firebase';

function PrivateRoute(props) {
  const [isAuthentificated, setIsAuthIsAuthentificated] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsAuthIsAuthentificated(true)
    } else {
      setIsAuthIsAuthentificated(false);
    }
  })


  return (
    isAuthentificated ? (
      <Route {...props} >
        {props.children}
      </Route>
    ) : <Redirect to={props.redirectTo} />
  )
}

export default PrivateRoute;