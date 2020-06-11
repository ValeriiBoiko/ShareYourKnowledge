import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './component/Header';
import Category from './component/Category';
import Feed from './component/Feed';
import Article from './component/Article';
import Navigation from './component/Navigation';
import firebase from './component/Firebase';
import Pagination from './component/Pagination';
import CreateArticleForm from './component/CreateArticleForm';

function App() {
  var provider = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  return (
    < Router >
      <div className="App">
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
            </Route>

            <Route path="/create-article">
              <CreateArticleForm />
            </Route>
          </Switch>

          <Pagination className={'main-pagination'} />
        </div>

      </div>
    </Router >
  );
}

export default App;
