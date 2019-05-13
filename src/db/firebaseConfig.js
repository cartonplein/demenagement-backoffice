import firebase from 'firebase'

// firebase init goes here
const config = {
  apiKey: "AIzaSyB9Bx-j5rmskhZdJsfo8sr5Eeb7NW_hJHE",
  authDomain: "plateforme-demenagement.firebaseapp.com",
  databaseURL: "https://plateforme-demenagement.firebaseio.com",
  projectId: "plateforme-demenagement",
  storageBucket: "plateforme-demenagement.appspot.com",
  messagingSenderId: "490144184435"
}
let app = firebase.initializeApp(config);

const db = firebase.database()
const auth = firebase.auth()
const currentUser = auth.currentUser

const rootRef = app.database().ref();

let agendaRef = rootRef.child('agenda');


// firebase collections


export {
    db,
    auth,
    currentUser,
    rootRef,
    agendaRef
}
