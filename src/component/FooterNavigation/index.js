import React, { useContext } from 'react';
import { store } from '../../store';
import styles from './FooterNavigation.module.css';
import { Link } from 'react-router-dom';

function FooterNavigation(props) {
    const { state, dispatch } = useContext(store);

    const children = props.children.map(child => {
        if (child.props.disabled) {
            return React.cloneElement(child, {
                ...child.props,
                className: child.props.className + ' ' + styles.disabled
            });
        }

        return child;
    })

    return (
        <div className={styles.wrapper + ' ' + props.className}>
            {children}
        </div >
    )
}

export default FooterNavigation;