import React from 'react';
import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';

function Navigation(props) {
    return (
        <div className={styles.wrapper + ' ' + props.className}>
            <Link className={styles.item} to=""># firebase</Link>
            <Link className={styles.item} to=""># react</Link>
            <Link className={styles.item} to=""># reactnative</Link>
            <Link className={styles.item} to=""># idx</Link>
        </div >
    )
}

export default Navigation;