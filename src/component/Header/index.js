import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

function Header(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = isLoggedIn ? '#' : '/login';
  const className = isLoggedIn ? 'icon-logout' : 'icon-login';

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Share your knowledge, bleat'!</h1>
      <div className={styles.quote}>
        <h3>“Share your knowledge. It is a way to achieve immortality.”</h3>
        <h3>― Dalai Lama XIV</h3>
      </div>
      <span className={styles.limiter}></span>

      <Link to={path}><span className={className}></span></Link>
    </div>
  )
}

export default Header;