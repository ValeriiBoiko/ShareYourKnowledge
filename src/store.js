import React, { createContext, useReducer } from 'react';
import { Action } from './actons';

const initialState = {
    articles: [],
    articlesPerPage: 3,
    currentPage: 0,
    currentArticleId: null,
    urlParams: {},
    isLast: false,
    isFirst: false,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {

            case Action.SET_PAGE:
                return {
                    ...state,
                    currentPage: action.pageNumber
                };

            case Action.SET_ARTICLES:
                return {
                    ...state,
                    articles: action.articles
                };

            case Action.SET_CURRENT_ARTICLE:
                return {
                    ...state,
                    currentArticleId: action.id
                };

            case Action.SET_URL_PARAMS:
                return {
                    ...state,
                    urlParams: action.params
                };

            case Action.SET_IS_FIRST:
                return {
                    ...state,
                    isFirst: action.value
                };

            case Action.SET_IS_LAST:
                return {
                    ...state,
                    isLast: action.value
                };

            default:
                return state;
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }