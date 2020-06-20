import React from 'react';
import styles from './FooterNavigation.module.css';

function FooterNavigation(props) {
  const children = props.children.map((child, index) => {
    if (child.props.disabled) {
      return React.cloneElement(child, {
        ...child.props,
        key: index,
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