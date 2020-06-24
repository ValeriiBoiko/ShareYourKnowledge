import React, { useEffect } from 'react';
import firebase from '../component/Firebase';
import { useHistory } from 'react-router-dom';
import FireStore from '../utils/FireStore';

function Login(props) {

  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();


  console.log(history)

  useEffect(() => {


  }, []);

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
                FireStore.getAdminEmails()
                  .then(emails => {
                    console.log(emails.indexOf(result.user.email))
                    if (emails.indexOf(result.user.email) >= 0) {
                      const redirectTo = '/create-article';
                      history.push(redirectTo);
                    } else {
                      alert('You need to have Sigmetix corporate account to login successfully. Enjoy the reading');
                      firebase.auth().signOut();
                      history.push('/feed');
                    }
                  })
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