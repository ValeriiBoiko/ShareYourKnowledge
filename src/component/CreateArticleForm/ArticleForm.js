import React from 'react';
import styles from './ArticleForm.module.css';
import TextEditor from '../TextEditor';

function ArticleForm(props) {

    return (
        <div style={{ width: '100%' }}>

            <form action="" className={styles.form} onSubmit={(e) => e.preventDefault}>
                <div style={{
                    display: 'flex',
                }}>
                    <input type="text" className={styles.input + ' text-input '} placeholder={'Title'} onChange={props.onTitleChange} />
                    <input type="text" className={styles.input + ' text-input ' + styles.categoriesInput} placeholder="react, idx, php, laravel ..." onChange={props.onCategoryChange} />
                </div>

                <TextEditor className={styles.textEditor} onContentChange={props.onContentChange} />
            </form>

        </div>
    )
}

export default ArticleForm;