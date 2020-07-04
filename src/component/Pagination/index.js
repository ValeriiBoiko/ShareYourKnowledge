import React, { useContext } from 'react';
import { store } from '../../store';
import { Link } from 'react-router-dom';
import FooterNavigation from '../FooterNavigation';

function Pagination(props) {
  const { state } = useContext(store);

  const onPrevClick = e => {
    if (state.isFirst) e.preventDefault()
  }

  const onNextClick = e => {
    if (state.isLast) e.preventDefault()
  }

  const nextLink = state.articles.length ? '/feed?sort=desc&startAfter=' + state.articles[state.articles.length - 1].id : '/feed';
  const prevLink = state.articles.length ? '/feed?sort=asc&startAfter=' + state.articles[0].id : '/feed';

  return (
    <FooterNavigation className='footer-navigation'>
      <Link disabled={state.isFirst} to={prevLink} onClick={onPrevClick}>
        <span className="label">Newer articles</span>
      </Link>
      <Link to="/feed">
        <span className="label">Go to first page</span>
      </Link>
      <Link disabled={state.isLast} to={nextLink} onClick={onNextClick}>
        <span className="label">Older articles</span>
      </Link>
    </FooterNavigation>
  )
}

export default Pagination;