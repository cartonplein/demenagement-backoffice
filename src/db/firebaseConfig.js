import Firebase from 'firebase';

const db = Firebase
  .initializeApp({
    apiKey: "AIzaSyB9Bx-j5rmskhZdJsfo8sr5Eeb7NW_hJHE",
    authDomain: "plateforme-demenagement.firebaseapp.com",
    storageBucket: "plateforme-demenagement.appspot.com",
    databaseURL: 'https://plateforme-demenagement.firebaseio.com' })
  .database()

const auth = Firebase.auth();
const storage = Firebase.storage();
let agendaRef = db.ref('agenda');
let inventaireRef = db.ref('inventaire');
let orderRef = db.ref('orders');
let tarificationRef = db.ref('tarification');

export {
    db,
    storage,
    auth,
    agendaRef,
    inventaireRef,
    orderRef,
    tarificationRef
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

let agendaRef = rootRef.child('agenda');
let inventaireRef = rootRef.child('inventaire');

// firebase collections


export {
    db,
    storage,
    auth,
    currentUser,
    rootRef,
    agendaRef,
    inventaireRef
}
*/
