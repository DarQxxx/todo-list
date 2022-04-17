import { getAuth } from 'firebase/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


//Tworzenie configu dla firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}
//inicjalizacja firebase
const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()
export const auth = getAuth(app)
//Rejestrowanie użytkownika z defaultowym avatarem jeśli nie doda żadnego / jego jeśli doda podczas rejestracji
/*






//Wchodzenie do bazy danych do kolekcji "messages"
export const getMessages = () => {
  return firebase.firestore().collection('messages')
}

//Wchodzenie do bazy danych do kolekcji w której są wiadomości dwóch odpowiednich użytkowników
export const getMessagesWithFriend = (myUid, friendUid) => {
  return firebase.firestore().collection(`${myUid}${friendUid}_messages`)
}

//Wchodzenie do bazy danych do kolekcji "users"
export const getUsers = () => {
  return firebase.firestore().collection('users')
}


*/

export const register = (
  email,
  password,
  //img,
  name,
  surname
  //setErrorStatus
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const userek = userCredential.user
      

    /*  if (img !== null) {
        storage
          .ref(`images/${userek.uid}/${img.name}`)
          .put(img)
          .on(
            'state_changed',
            snapshot => {},
            error => {
              console.log(error)
            },
            () => {
              storage
                .ref(`images/${userek.uid}`)
                .child(img.name)
                .getDownloadURL()
                .then(url => {
                  firebase
                    .firestore()
                    .collection('users')
                    .doc(userek.uid)
                    .set({
                      email: userek.email,
                      uid: userek.uid,
                      url: url,
                      name: name,
                      surname: surname
                    })
                })
            }
          )
      } else  {
        storage
          .ref(`placeholder`)
          .child('avatar.png')
          .getDownloadURL()
          .then(url => {
            firebase
              .firestore()
              .collection('users')
              .doc(userek.uid)
              .set({
                email: userek.email,
                uid: userek.uid,
                url: url,
                name: name,
                surname: surname
              })
          })
      }
      setErrorStatus(null)
    })*/

  })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('error code = ' + errorCode)
      console.log('error message = ' + errorMessage)
    })
}


//Logowanie użytkownika
export const login = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const userek = userCredential.user
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log('error code = ' + errorCode)
      console.log('error message = ' + errorMessage)
    })
}

//wylogowanie użytkownika
export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Wylogowano poprawnie')
    })
    .catch(err => {
      console.log(err)
    })
}

//Wchodzenie do wybranej przez deva kolekcji jako argument col
export const getAnything = col => {
  return firebase.firestore().collection(col)
}
//Tworzenie timestampu, którym sygnujemy wiadomości
export const time = () => {
  return firebase.firestore.FieldValue.serverTimestamp()
}