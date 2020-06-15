import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './component/Header';
import Category from './component/Category';
import Feed from './component/Feed';
import Article from './component/Article';
import Navigation from './component/Navigation';
import firebase from './component/Firebase';
import Pagination from './component/Pagination';
import CreateArticleForm from './component/CreateArticleForm';
import { store } from './store';
import Notification from './component/Notification';

function App() {
  var provider = new firebase.auth.GithubAuthProvider();
  const { state } = useContext(store);

  // firebase.auth().signInWithPopup(provider).then(function (result) {
  //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  //   var token = result.credential.accessToken;
  //   // The signed-in user info.
  //   var user = result.user;
  //   // ...
  // }).catch(function (error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // The email of the user's account used.
  //   var email = error.email;
  //   // The firebase.auth.AuthCredential type that was used.
  //   var credential = error.credential;
  //   // ...
  // });

  console.log(state.notification)

  return (
    < Router >
      <div className="App">

        {
          state.notification.visible &&
          <Notification
            type={state.notification.type}
            title={state.notification.title}
            message={state.notification.message}
          />
        }

        <div className="content">
          <Header />
        </div>

        <Navigation className={'main-navigation'} />


        <Switch>
          <Route path="/article/:id">
            <div className="content main-content">
              <Article isSingle={true} />
            </div>
          </Route>

          <Route path="/feed">
            <div className="content main-content">
              <Feed />
            </div>
          </Route>

          <Route path="/create-article">
            <div className="content main-content screen-height-content">
              <CreateArticleForm />
            </div>
          </Route>
        </Switch>

        <Pagination className={'main-pagination'} />

      </div>
    </Router >
  );
}

export default App;
