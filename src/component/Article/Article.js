import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import styles from './Article.module.css';
import FooterNavigation from '../FooterNavigation';
import FireStore from '../../utils/FireStore';
import Badge from '../Badge';

function getDateFromSeconds(seconds) {
  const date = new Date(seconds * 1000);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

  return date.toLocaleDateString('en-US', options)
}

function Article(props) {
  const isSingle = props.isSingle;
  const title = props.isSingle ? (
    <h1 className={styles.title} >{props.title}</h1>
  ) : (
      <h2 className={styles.title}><Link to={`/article/${props.id}`} onClick={props.onOpenArticle}>{props.title}</Link></h2>
    );

  const categories = Object.keys(props.categories).map(value => {
    return <Link
      key={value}
      className={styles.category}
      to={'/feed/?categories=' + value}>{value}</Link>
  })

  return (
    <Fragment>
      <div className={styles.article + ' ' + isSingle ? styles.singleArticle : ''}>
        {title}
        <div className={styles.categories}>
          {categories}
        </div>
        <div className={styles.content}>
          <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
        </div>

        <div className={styles.metadata}>
          <span>{props.author}</span>
          {
            !isSingle && <span className={styles.readMore}><Link to={`/article/${props.id}`} onClick={props.onOpenArticle}>Read More</Link></span>
          }
          <span>{getDateFromSeconds(props.date.seconds)}</span>
        </div>
      </div >

      <FooterNavigation className='footer-navigation'>
        <Link disabled={props.isFirst} to={'/article/'} onClick={props.onPrev}>Newer articles</Link>
        <Link to="/feed">Go to feed</Link>
        <Link disabled={props.isLast} to={'/article/'} onClick={props.onNext}>Older articles</Link>
      </FooterNavigation>
    </Fragment>
  )
}

export default Article;