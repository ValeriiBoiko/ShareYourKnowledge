import React from 'react';
import styles from './CreateArticleForm.module.css';

function CreateArticleForm(props) {

    return (
        <div>
            <form action="" className={styles.form}>
                <input type="text" className={styles.input + ' text-input ' + styles.titleInput} placeholder={'Title'} />
                <input type="text" className={styles.input + ' text-input ' + styles.categoriesInput} placeholder="react, idx, php, laravel ..." />
                <textarea name="" id="" cols="30" rows="10" className={'textarea ' + styles.contentTextarea} >

                </textarea>
            </form>
        </div>
    )
}

export default CreateArticleForm;