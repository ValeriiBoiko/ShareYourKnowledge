import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';

function Notification(props) {
    const [isVisible, setVisibility] = useState(props.visible);
    let type = props.type;

    useEffect(() => {
        setVisibility(true);

        setTimeout(() => {
          setVisibility(false);
        }, props.time - 350)
    }, []);

    return (
        <div className={`${styles.container} ${styles[type]} ${isVisible ? styles.visible : ''}`}>
            <h3 className={styles.title}>{props.title}</h3>
            <p className={styles.message}>{props.message}</p>
        </div>
    )
}

export default Notification;