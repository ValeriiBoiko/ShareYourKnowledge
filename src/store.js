import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  articles: [],
  articlesPerPage: 3,
  currentPage: 0,
  currentArticleId: null,
  urlParams: {},
  isLast: false,
  isFirst: false,
  newArticle: {
    title: '',
    categories: {},
    content: '',
    modifiers: [],
  },
  notification: {
    visible: false,
    message: '',
    title: '',
    type: '',
    time: 0,
  }
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }