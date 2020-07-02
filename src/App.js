import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from "react-router-dom";
import Header from './component/Header';
import Feed from './component/Feed';
import Article from './component/Article';
import Pagination from './component/Pagination';
import Navigation from './component/Navigation';
import CreateArticleForm from './component/CreateArticleForm';
import { store } from './store';
import Notification from './component/Notification';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  const history = useHistory();
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

            <ProtectedRoute path="/create-article">
              <CreateArticleForm />
            </ProtectedRoute>

            <Route path="/" exact={true}>
              <Redirect to="/feed" />
            </Route>

          </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
