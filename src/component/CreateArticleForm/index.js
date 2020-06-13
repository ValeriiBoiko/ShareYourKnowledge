import React from 'react';
import styles from './CreateArticleForm.module.css';
import TextEditor from '../TextEditor';

function CreateArticleForm(props) {

  return (
    <form action="" className={styles.form}>
      <div style={{
        display: 'flex',
      }}>
        <input type="text" className={styles.input + ' text-input ' + styles.titleInput} placeholder={'Title'} />
        <input type="text" className={styles.input + ' text-input ' + styles.categoriesInput} placeholder="react, idx, php, laravel ..." />
      </div>
      
      <TextEditor style={{
        flexGrow: 1
      }} />
    </form>
  )
}

export default CreateArticleForm;