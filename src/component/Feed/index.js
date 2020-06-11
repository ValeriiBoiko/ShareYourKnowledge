import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import { setArticlesAction, setUrlParamsAction, setIsFirstAction, setIsLastAction } from '../../actons';
import FireStore from '../../utils/FireStore';
import useQuery from '../../hooks/useQuery';
import Feed from './Feed';

function isLast(articles, articlesPerPage, params) {
    let result = false;

    if (
        articles.length < articlesPerPage + 1 &&
        (!params['sort'] || params['sort'] == 'desc')
    ) {
        result = true;
    }

    return result;
}

function isFirst(articles, articlesPerPage, params) {
    let result = false;

    if (
        articles.length < articlesPerPage + 1 &&
        params['sort'] == 'asc' ||
        !Object.keys(params).length
    ) {
        result = true;
    }

    return result;
}

function FeedContainer(props) {
    const { state, dispatch } = useContext(store);
    let urlParams = state.urlParams;

    useQuery((params) => {
        dispatch(setUrlParamsAction(params))
    })

    useEffect(() => {
        FireStore.getArticles(state.articlesPerPage + 1, urlParams['startAfter'], urlParams['sort'] || 'desc')
            .then((articles) => {
                if (articles.length < state.articlesPerPage + 1) {
                    dispatch(setArticlesAction(articles));
                } else {
                    dispatch(setArticlesAction(articles.slice(0, articles.length - 1)));
                }

                dispatch(setUrlParamsAction(urlParams));
                dispatch(setIsLastAction(isLast(articles, state.articlesPerPage, urlParams)));
                dispatch(setIsFirstAction(isFirst(articles, state.articlesPerPage, urlParams)));
            })
            .catch(error => {
                console.log(error)
            });

    }, [state.urlParams])

    console.log('isFirst: ', state.isFirst, 'isLast: ', state.isLast);
    return (

        <Feed articles={state.articles} />
    )
}

export default FeedContainer;