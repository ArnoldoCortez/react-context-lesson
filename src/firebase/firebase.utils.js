import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC3Bfw0T5un5aYDx0KSLpuKjRS1STf6j5A",
  authDomain: "crwn-db-7c887.firebaseapp.com",
  projectId: "crwn-db-7c887",
  storageBucket: "crwn-db-7c887.appspot.com",
  messagingSenderId: "799463044357",
  appId: "1:799463044357:web:0ae7c50b604235cdf6736c",
  measurementId: "G-VQW8LF80QN",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
