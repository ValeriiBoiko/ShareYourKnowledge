import React from 'react';
import { Link } from "react-router-dom";
import styles from './Article.module.css';

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

  return (
    <div className={styles.article + ' ' + isSingle ? styles.isSingle : ''}>
      {title}
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
  )
}

export default Article;