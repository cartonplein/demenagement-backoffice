import Firebase from 'firebase';

/*
const db = Firebase
  .initializeApp({
    apiKey: "AIzaSyB9Bx-j5rmskhZdJsfo8sr5Eeb7NW_hJHE",
    authDomain: "plateforme-demenagement.firebaseapp.com",
    storageBucket: "plateforme-demenagement.appspot.com",
    databaseURL: 'https://plateforme-demenagement.firebaseio.com' })
  .database()
*/

const db = Firebase
  .initializeApp({
    apiKey: "AIzaSyB2BG0ugKjJBCd7xBBE86Zl56BwtuMT3HU",
    authDomain: "cartonplein-d4cf1.firebaseapp.com",
    storageBucket: "cartonplein-d4cf1.appspot.com",
    databaseURL: 'https://cartonplein-d4cf1.firebaseio.com/' })
  .database()

const auth = Firebase.auth();
const storage = Firebase.storage();

let rootRef = db.ref('plateforme-demenagement');

export {
    db,
    storage,
    auth,
    rootRef
}

/*
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
const storage = firebase.storage()
const auth = firebase.auth()
const currentUser = auth.currentUser

const rootRef = app.database().ref();

let rootRef.child('agenda') = rootRef.child('agenda');
let inventaireRef = rootRef.child('inventaire');

// firebase collections


export {
    db,
    storage,
    auth,
    currentUser,
    rootRef,
    rootRef.child('agenda'),
    inventaireRef
}
*/
