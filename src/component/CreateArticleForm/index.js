import React, { useState } from 'react';
import styles from './CreateArticleForm.module.css';
import TextEditor from '../TextEditor';
import FireStore from '../../utils/FireStore';

function CreateArticleForm(props) {
  const [content, setContent] = useState('');

  return (
    <form action="" className={styles.form}>
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

    </form>
  )
}

export default CreateArticleForm;