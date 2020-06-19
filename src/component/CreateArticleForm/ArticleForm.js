import React from 'react';
import styles from './ArticleForm.module.css';
import TextEditor from '../TextEditor';
import FireStore from '../../utils/FireStore';
import FooterNavigation from '../FooterNavigation';
import { Link } from 'react-router-dom';

function ArticleForm(props) {

    return (
        <div style={{ width: '100%' }}>

            <form action="" className={styles.form}>
                <div style={{
                    display: 'flex',
                }}>
                    <input type="text" className={styles.input + ' text-input ' + styles.titleInput} placeholder={'Title'} onBlur={props.onTitleChange} />
                    <input type="text" className={styles.input + ' text-input ' + styles.categoriesInput} placeholder="react, idx, php, laravel ..." onChange={props.onCategoryChange} />
                </div>

                <TextEditor className={styles.textEditor} onContentChange={props.onContentChange} />
            </form>

            <FooterNavigation className={'footer-navigation'} >
                <Link to={'prevLink'} onClick={'onPrevClick'}>Back to feed</Link>
                <Link disabled={true} className='link' onClick={(e) => {
                    // e.preventDefault();
                    // setShowLoader(true);
                    // FireStore.addArticle('Title', '', content)
                    //     .then((docRef) => {
                    //         setShowLoader(false);
                    //         showNotification('Success!', 'success');
                    //     })
                    //     .catch(error => {
                    //         setShowLoader(false);
                    //         showNotification('Error happend :( Try again.', 'error');
                    //     })
                }}>Publish article</Link>
            </FooterNavigation>
        </div>
    )
}

export default ArticleForm;