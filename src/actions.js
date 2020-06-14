import firebase from './component/Firebase';
import { store } from './store';

export const Action = {
    SET_PAGE: 'SET_PAGE',
    SET_ARTICLES: 'SET_ARTICLES',
    SET_CURRENT_ARTICLE: 'SET_CURRENT_ARTICLE',
    SET_URL_PARAMS: 'SET_URL_PARAMS',
    SET_IS_FIRST: 'SET_IS_FIRST',
    SET_IS_LAST: 'SET_IS_LAST',
    SET_NEW_ARTICLE_TITLE: 'SET_NEW_ARTICLE_TITLE',
    SET_NEW_ARTICLE_CATEGORIES: 'SET_NEW_ARTICLE_CATEGORIES',
    SET_NEW_ARTICLE_AUTHOR: 'SET_NEW_ARTICLE_AUTHOR',
    SET_NEW_ARTICLE_CONTENT: 'SET_NEW_ARTICLE_CONTENT',
    SET_SELECTION_MODIFIERS: 'SET_SELECTION_MODIFIERS' 
}

export const setPageAction = (pageNumber) => ({
    type: Action.SET_PAGE,
    pageNumber: pageNumber
});

export const setArticleAction = (articleId) => ({
    type: Action.SET_CURRENT_ARTICLE,
    id: articleId
});

export const setArticlesAction = (articles) => ({
    type: Action.SET_ARTICLES,
    articles: articles
});

export const setUrlParamsAction = (params) => ({
    type: Action.SET_URL_PARAMS,
    params: params
});

export const setIsLastAction = (isLast) => ({
    type: Action.SET_IS_LAST,
    value: isLast
});

export const setIsFirstAction = (isFirst) => ({
    type: Action.SET_IS_FIRST,
    value: isFirst
});

export const setNewArticleTitleAction = (title) => ({
  type: Action.SET_NEW_ARTICLE_TITLE,
  title: title,
});

export const setNewArticleCategoriesAction = (categories) => ({
  type: Action.SET_NEW_ARTICLE_CATEGORIES,
  categories: categories,
});

export const setNewArticleAuthorAction = (author) => ({
  type: Action.SET_NEW_ARTICLE_AUTHOR,
  author: author,
});

export const setNewArticleContentAction = (content) => ({
  type: Action.SET_NEW_ARTICLE_CONTENT,
  content: content
});

export const setModifiersAction = (modifiers) => ({
  type: Action.SET_SELECTION_MODIFIERS,
  modifiers: modifiers
});
