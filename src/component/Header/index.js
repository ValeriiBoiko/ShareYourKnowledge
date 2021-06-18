import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link, useHistory } from 'react-router-dom';
import firebase from '../Firebase';
import FirebaseAuth from '../../utils/FirebaseAuth';

function Header(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = isLoggedIn ? '#' : '/login';
  const className = isLoggedIn ? 'icon-logout' : 'icon-login';
  const history = useHistory();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })

  const loginClick = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      FirebaseAuth.logOut();
      history.push('/feed');
    } else {
      FirebaseAuth.loginWithPopUp()
        .then(user => {
          history.push('/create-article');
        })
        .catch(error => {
          alert(error.message);
          FirebaseAuth.logOut();
          history.push('/feed');
        })
    }
  }

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Share your knowledge, bleat!</h1>
      <div className={styles.quote}>
        <h3>“Share your knowledge. It is a way to achieve immortality.”</h3>
        <h3>― Dalai Lama XIV</h3>
      </div>
      <span className={styles.limiter}></span>

      <Link to={path}><span className={styles.login + ' ' + className} onClick={loginClick}></span></Link>
    </div>
  )
}

export default Header;