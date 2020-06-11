import React from 'react';
import styles from './Category.module.css';

function Category(props) {
    const customStyle = {
        'backgroundColor': props.backgroundColor,
        'color': props.color
    };

    return (
        <span className={props.className} >
            <a className={styles.category} style={customStyle} href={'#' + props.value}>
                {props.label}
            </a>
        </span>
    )
}

Category.defaultProps = {
    backgroundColor: '#333',
    color: "#f5f5f5"
}

export default Category;