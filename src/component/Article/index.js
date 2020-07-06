import React, { useContext, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { store } from '../../store';
import { setArticleAction, setIsFirstAction, setIsLastAction } from '../../actions';
import FireStore from '../../utils/FireStore';
import { useState } from 'react';
import Loader from '../Loader';
import Article from './Article';

function ArticleContainer(props) {
  const history = useHistory();
  const { state, dispatch } = useContext(store);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const urlParams = useParams();
  const isSingle = props.preview !== null ? !props.preview : true;

  /**
   * function loads and shows article based on id passed to url
   */
  const showArticleFromUrl = () => {
    FireStore.getArticleByID(urlParams.id)
      .then(article => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        history.push('/404')
      });
  }

  /**
   * function that shows previous or next article when it is requested via footer navigation
   * 
   * @param {string} direction specifies if previous or next article is requested. 
   * Possible values are 'prev' and 'next' 
   */
  const showSiblingArticle = (direction) => {
    setIsLoading(true);

    FireStore.getArticles({
      limit: 1,
      startAfter: state.currentArticleId,
      sort: direction === 'prev' ? 'asc' : 'desc'
    })
      .then(articles => {
        if (articles[0]) {
          history.push('/article/' + articles[0].id);
          setArticle(articles[0])
          dispatch(setArticleAction(articles[0].id));
          if (direction === 'prev') {
            dispatch(setIsFirstAction(false));
          } else {
            dispatch(setIsLastAction(false));
          }
        } else {
          if (direction === 'prev') {
            dispatch(setIsFirstAction(true));
          } else {
            dispatch(setIsLastAction(true));
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        alert('Unpredicted error happened, you will be redirected');
        history.push('/feed');
      })
  }

  useEffect(() => {
    if (isSingle) {
      dispatch(setArticleAction(urlParams.id));
      dispatch(setIsFirstAction(false));
      showArticleFromUrl();
    } else {
      const regex = /<h\d.*?>.*?<\/h\d>/gmi;
      const content = props.content.replace(regex, '');
      let article = {
        ...props,
        content: content.substring(0, 750) + ' ...',
      };

      setArticle(article);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (article && isSingle && state.currentArticleId !== article.id) {
      history.push('/article/' + state.currentArticleId)
      showArticleFromUrl();
    }
  }, [state.currentArticleId])

  const openArticle = () => {
    window.scrollTo({
      top: 0
    })
    dispatch(setArticleAction(article.id));
  };

  const onPrev = (e) => {
    e.preventDefault();

    if (!state.isFirst) {
      showSiblingArticle('prev');
    }
  }

  const onNext = (e) => {
    e.preventDefault();

    if (!state.isLast) {
      showSiblingArticle('next');
    }
  }

  return (
    isLoading ? (
      <Loader />
    ) : (
        <Article
          {...article}
          onOpenArticle={openArticle}
          isSingle={isSingle}
          onPrev={onPrev}
          onNext={onNext}
          isFirst={state.isFirst}
          isLast={state.isLast} />
      )
  )
}

export default ArticleContainer;