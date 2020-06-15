import React, { useState, useContext } from 'react';
import styles from './CreateArticleForm.module.css';
import TextEditor from '../TextEditor';
import FireStore from '../../utils/FireStore';
import Loader from '../Loader';
import { store } from '../../store';
import { setNotificationAction } from '../../actions';

function CreateArticleForm(props) {
  const {state, dispatch} = useContext(store);
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

  return (
    <form action="" className={styles.form}>
      { showLoader && <Loader /> }
      <div style={{
        display: 'flex',
      }}>
        <input type="text" className={styles.input + ' text-input ' + styles.titleInput} placeholder={'Title'} />
        <input type="text" className={styles.input + ' text-input ' + styles.categoriesInput} placeholder="react, idx, php, laravel ..." />
      </div>
      
      <TextEditor className={styles.textEditor} onChangeContent={(text) => {
        console.log('onChange')
        setContent(text);
      }}/>

      <div className={'row justify-between'}>
        <input type="submit" value="Back to feed" className={'button ' + styles.addButton} onClick={(e) => {
          e.preventDefault();
        }} />

        <input type="submit" value="Add article" className={'button ' + styles.addButton} onClick={(e) => {
          e.preventDefault();
          setShowLoader(true);
          FireStore.addArticle('Title', '', content)
            .then((docRef) => {
              setShowLoader(false);
              showNotification('Success!', 'success');
            })
            .catch(error => {
              setShowLoader(false);
              showNotification('Error happend :( Try again.', 'error');
            })
        }} />
      </div>
    </form>
  )
}

export default CreateArticleForm;