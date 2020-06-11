import React, { useContext } from 'react';
import { store } from '../../store';
import styles from './Pagination.module.css';
import { Link, useLocation } from 'react-router-dom';

function Pagination(props) {
    const { state, dispatch } = useContext(store);
    const firstLinkClass = state.isFirst ? styles.disabled : '';
    const lastLinkClass = state.isLast ? styles.disabled : '';

    const onPrevClick = e => {
        if (state.isFirst) e.preventDefault()
    }

    const onNextClick = e => {
        if (state.isLast) e.preventDefault()
    }

    const nextLink = state.articles.length ? '/feed?sort=desc&startAfter=' + state.articles[state.articles.length - 1].id : '/feed';
    const prevLink = state.articles.length ? '/feed?sort=asc&startAfter=' + state.articles[0].id : '/feed';

    return (
        <div className={styles.wrapper + ' ' + props.className}>
            <Link className={`${styles.item} ${firstLinkClass}`} to={prevLink} onClick={onPrevClick}>Newer articles</Link>
            <Link className={styles.item} to="/feed">Go to first page</Link>
            <Link className={`${styles.item} ${lastLinkClass}`} to={nextLink} onClick={onNextClick}>Older articles</Link>
        </div >
    )
}

export default Pagination;