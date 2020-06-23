import React, { useEffect } from 'react';
import firebase from '../component/Firebase';
import { useHistory } from 'react-router-dom';

function Login(props) {

  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();


  console.log(history)

  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log(user);

  //     setTimeout(() => {
  //       firebase.auth().signOut();
  //     }, 3000);
  //   } else {
  //     console.log(user)
  //   }
  // })

  return (
    <div>
      <form action="">
        <button onClick={(e) => {
          e.preventDefault();

          firebase.auth().signInWithPopup(provider)
            .then(result => {
              if (result.user) {
                const redirectTo = history.location.state ? history.location.state.from.pathname : '/feed';
                history.push(redirectTo);
              }
            })
            .catch(error => {
              throw new Error(error);
            })
        }}>Button</button>
      </form>
    </div>
  )
}

export default Login;