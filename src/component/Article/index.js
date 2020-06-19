import React, { useContext, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import styles from './Article.module.css';
import { store } from '../../store';
import { setArticleAction, setArticlesPerPageAction } from '../../actions';
import NotFound from '../NotFound';
import FireStore from '../../utils/FireStore';
import { useState } from 'react';
import Loader from '../Loader';

function getArticleById(articles, id) {
    const article = articles.filter(article => article.id.toString() === id)[0];

    if (article) return article;

    return null;
}

function getDateFromSeconds(seconds) {
    const date = new Date(seconds * 1000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    return date.toLocaleDateString('en-US', options)
}

function Article(props) {
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
            setArticle(props);
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        // return null;
        return <Loader />
    }

    const content = isSingle ? article.content : article.content.substring(0, 750) + ' ...';

    const onClick = () => {
        window.scrollTo({
            top: 0
        })
        dispatch(setArticleAction(article.id));
    };

    const title = isSingle ? (
        <h2 className={styles.title} >{article.title}</h2>
    ) : (
            <h2 className={styles.title}><Link to={`/article/${article.id}`} onClick={onClick}>{article.title}</Link></h2>
        );

    return (
        <div className={styles.article}>
            {title}
            <div className={styles.content}>
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>

            <div className={styles.metadata}>
                <span>{article.author}</span>
                {
                    !isSingle && <span className={styles.readMore}><Link to={`/article/${article.id}`} onClick={onClick}>Read More</Link></span>
                }
                <span>{getDateFromSeconds(article.date.seconds)}</span>
            </div>
        </div >
    )
}

export default Article;