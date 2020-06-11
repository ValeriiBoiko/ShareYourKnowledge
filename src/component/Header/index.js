import React from 'react';
import styles from './Header.module.css';

function Header(props) {
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Share your knowledge, bleat'!</h1>
            <div className={styles.quote}>
                <h3>“Share your knowledge. It is a way to achieve immortality.”</h3>
                <h3>― Dalai Lama XIV</h3>
            </div>
            <span className={styles.limiter}></span>
        </div>
    )
}

export default Header;