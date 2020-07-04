import React, { useContext, useEffect, useState } from 'react';
import styles from './Navigation.module.css';
import { Link, useHistory } from 'react-router-dom';
import { store } from '../../store';
import FireStore from '../../utils/FireStore';

function Navigation(props) {
  const { state } = useContext(store);
  const urlParams = state.urlParams;
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    FireStore.getCategories()
      .then(categories => {
        setCategories(categories)
      })
      .catch(() => {
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    const categories = urlParams.categories ? urlParams.categories.split(/,\s*/) : [];
    setActiveCategories(categories)
  }, [urlParams.categories])

  const onItemClick = (e, item) => {
    e.preventDefault();
    const isActive = activeCategories.indexOf(item) >= 0 ? true : false;
    let newCategories = activeCategories;

    if (isActive) {
      newCategories = newCategories.filter(cat => cat !== item);
    } else {
      newCategories.push(item);
    }

    history.push("/feed/?categories=" + newCategories.join(','))
  }

  const items = categories.map(item => {
    const className = activeCategories.indexOf(item) >= 0 ? styles.active : '';
    return (
      <Link
        className={styles.item + ' ' + className}
        to={'/feed'} key={item}
        onClick={(e) => onItemClick(e, item)}>#&nbsp;{item}</Link>
    )
  })

  return (
    <div className={styles.wrapper + ' ' + props.className}>
      {items}
    </div >
  )
}

export default Navigation;