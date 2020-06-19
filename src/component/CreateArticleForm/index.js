import React, { useState, useContext } from 'react';
import styles from './ArticleForm.module.css';
import TextEditor from '../TextEditor';
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
  const [content, setContent] = useState('');

  const showNotification = (title, type) => {
    dispatch(setNotificationAction({
      type: type,
      visible: true,
      title: title
    }))

    setTimeout(() => {
      dispatch(setNotificationAction({
        type: null,
        visible: false,
        title: ''
      }))
    }, 2000)
  }

  const onTitleChange = (e) => {
    const title = e.currentTarget.value;

    if (title) {
      setNewArticleTitleAction(title);
    }
  }

  const onCategoryChange = (e) => {
    const regexp = /[\w\d\-_]/;
    const categories = e.currentTarget.value.split(/,\s?/).filter(category => regexp.test(category));

    if (categories) {
      setNewArticleCategoriesAction(categories);
    }
  }

  const onContentChange = (e) => {
    const content = e.currentTarget.value;

    setContent(content);

    if (content) {
      setNewArticleContentAction(content);
    }
  }

  const addArticle = () => {
    const { title, categories, content } = state.newArticle;

    setShowLoader(true);

    if (title && content) {
      FireStore.addArticle(title, categories, content)
        .then((docRef) => {
          setShowLoader(false);
          showNotification('Success!', 'success');
        })
        .catch(error => {
          setShowLoader(false);
          showNotification('Error happend :( Try again.', 'error');
        })
    }
  }

  return (
    <ArticleForm
      onTitleChange={onTitleChange}
      onCategoryChange={onCategoryChange}
      onContentChange={onContentChange}
      onSubmit={addArticle}
    />
  )
}

export default CreateArticleForm;