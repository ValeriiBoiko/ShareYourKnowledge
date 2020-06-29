import React, { useState, useContext, Fragment, useEffect } from 'react';
import FireStore from '../../utils/FireStore';
import Loader from '../Loader';
import { store } from '../../store';
import { setNotificationAction, setNewArticleTitleAction, setNewArticleContentAction, setNewArticleCategoriesAction } from '../../actions';
import FooterNavigation from '../FooterNavigation';
import { Link } from 'react-router-dom';
import ArticleForm from './ArticleForm';

function CreateArticleForm(props) {
  const { state, dispatch } = useContext(store);
  const [showLoader, setShowLoader] = useState(false);
  const [isReadyToPublish, setPublishState] = useState(false);

  const updatePublishState = () => {
    if (state.newArticle.title && state.newArticle.content && state.newArticle.categories.length) {
      if (!isReadyToPublish) {
        setPublishState(true);
      }
    } else {
      if (isReadyToPublish) {
        setPublishState(false);
      }
    }

  }

  const showNotification = (title, type) => {
    dispatch(setNotificationAction({
      type: type,
      visible: true,
      title: title,
      time: 3000
    }))

    setTimeout(() => {
      dispatch(setNotificationAction({
        type: null,
        visible: false,
        title: '',
        time: 0
      }))
    }, 3000)
  }

  const onTitleChange = (e) => {
    const title = e.currentTarget.value;

    if (title) {
      dispatch(setNewArticleTitleAction(title));
    }
  }

  const onCategoryChange = (e) => {
    const regexp = /[\w\d\-_]/;
    const categories = e.currentTarget.value.split(/,\s?/).filter(category => regexp.test(category));
    let categoriesMap = {};
    categories.forEach(category => {
      categoriesMap[category] = true;
    })

    if (categories) {
      dispatch(setNewArticleCategoriesAction(categories));
    }
  }

  const onContentChange = (content) => {
    if (content) {
      dispatch(setNewArticleContentAction(content));
    }
  }

  const addArticle = () => {
    setShowLoader(true);

    if (isReadyToPublish) {
      FireStore.addArticle(state.newArticle)
        .then(() => {
          setShowLoader(false);
          showNotification('Success!', 'success');
        })
        .catch(error => {
          setShowLoader(false);
          showNotification('Error happend :( Try again.', 'error');
        })
    }
  }

  useEffect(updatePublishState, [state.newArticle]);

  return (
    showLoader ? <Loader /> :
      <Fragment>
        <ArticleForm
          onTitleChange={onTitleChange}
          onCategoryChange={onCategoryChange}
          onContentChange={onContentChange}
          onSubmit={addArticle}
        />

        <FooterNavigation className={'footer-navigation'} >
          <Link to={'/feed'}>Back to feed</Link>
          <Link disabled={!isReadyToPublish} onClick={() => {
            isReadyToPublish ? addArticle() : showNotification('Fill in all form fields', 'error');
          }}>Publish article</Link>
        </FooterNavigation>
      </Fragment>
  )
}

export default CreateArticleForm;