import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './component/Header';
import Category from './component/Category';
import Feed from './component/Feed';
import Article from './component/Article';
import firebase from './component/Firebase';
import Pagination from './component/Pagination';
import FooterNavigation from './component/FooterNavigation';
import Navigation from './component/Navigation';
import CreateArticleForm from './component/CreateArticleForm';
import { store } from './store';
import Notification from './component/Notification';

function App() {
  var provider = new firebase.auth.GithubAuthProvider();
  const { state } = useContext(store);

  return (
    <Router>
      <div className="App">

        {
          state.notification.visible &&
          <Notification
            type={state.notification.type}
            title={state.notification.title}
            message={state.notification.message}
            time={state.notification.time}
          />
        }

        <div className="content">
          <Header />
        </div>

        <Navigation className={'main-navigation'} />

        <div className="content main-content">

          <Switch>

            <Route path="/article/:id">
              <Article isSingle={true} />
            </Route>

            <Route path="/feed">
              <Feed />

              <Pagination className={'footer-navigation'} />
            </Route>

            <Route path="/create-article">
              <CreateArticleForm />
            </Route>

          </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
