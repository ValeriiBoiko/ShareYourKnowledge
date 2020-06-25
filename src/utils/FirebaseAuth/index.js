import firebase from '../../component/Firebase';
import FireStore from '../FireStore';

class FirebaseAuth {
  static provider = new firebase.auth.GoogleAuthProvider();

  static loginWithPopUp() {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(FirebaseAuth.provider)
        .then(result => {
          if (result.user) {
            FireStore.getAdminEmails()
              .then(emails => {
                if (emails.indexOf(result.user.email) >= 0) {
                  resolve(result.user);
                } else {
                  reject(new Error('You need to have Sigmetix corporate account to login successfully. Enjoy the reading'));
                }
              })
          }
        })
        .catch(error => {
          throw new Error(error);
        })
    })
  }

  static logOut() {
    firebase.auth().signOut();
  }

}

export default FirebaseAuth;