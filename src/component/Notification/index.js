import React from 'react';
import styles from './Notification.module.css';

function Notification(props) {
    let type = props.type;

    return (
        <div className={styles.container + ' ' + styles[type]}>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.message}>{props.message}</p>
        </div>
    )
}

export default Notification;