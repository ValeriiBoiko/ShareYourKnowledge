import React, { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { store } from '../../store';
import { setArticleAction } from '../../actions';
import NotFound from '../NotFound';
import FireStore from '../../utils/FireStore';
import { useState } from 'react';
import Loader from '../Loader';
import Article from './Article';

function ArticleContainer(props) {
  const { dispatch } = useContext(store);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const urlParams = useParams();
  const isSingle = props.preview !== null ? !props.preview : true;

  useEffect(() => {
    if (isSingle) {
      FireStore.getArticleByID(urlParams.id)
        .then(article => {
          setArticle(article);
          setIsLoading(false);
        })
        .catch(error => {
          if (error.error === 'DOCUMENT_MISSED') {
            return <NotFound />
          }
        });
    } else {
      const regex = /<h\d>.*?<\/h\d>/gmi;
      const content = props.content.replace(regex, '');
      let article = {
        ...props,
        content: content.substring(0, 750) + ' ...',
      };

      setArticle(article);
      setIsLoading(false);
    }
  }, []);

  const openArticle = () => {
    window.scrollTo({
      top: 0
    })
    dispatch(setArticleAction(article.id));
  };

  return (
    isLoading ? (
      <Loader />
    ) : (
        <Article {...article} onOpenArticle={openArticle} isSingle={isSingle} />
      )
  )
}

export default ArticleContainer;