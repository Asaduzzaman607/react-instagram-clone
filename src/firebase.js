import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB9pTYfp7ko9Lylc_T_ywX42SPrtlsvwwA",
    authDomain: "react-instagramm-clone.firebaseapp.com",
    databaseURL: "https://react-instagramm-clone.firebaseio.com",
    projectId: "react-instagramm-clone",
    storageBucket: "react-instagramm-clone.appspot.com",
    messagingSenderId: "601675469004",
    appId: "1:601675469004:web:f30c4d1231a62deb073269"
  });

  const db= firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

export  {db, auth, storage};