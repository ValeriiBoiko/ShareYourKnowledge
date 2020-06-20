import React from 'react';
import Article from '../Article';

function Feed(props) {
  let articles = props.articles.sort((article, nextArticle) => {
    return nextArticle.date.seconds - article.date.seconds;
  });

  articles = articles.map(article => {
    return <Article key={article.id} {...article} preview={true} />
  });

  return (
    <div>
      {articles}
    </div>
  )
}

export default Feed;