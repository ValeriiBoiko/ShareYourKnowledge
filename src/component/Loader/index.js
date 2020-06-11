import React from 'react';
import styles from './Loader.module.css';

function Loader(props) {

    return (
        <div className={styles.container}>
            <div className={styles.ldsRipple}><div></div><div></div></div>
        </div>
    )
}

export default Loader;