import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyBS4p85BYxq2UNr9jnvAPa1zizIl5tBn6s',
  authDomain: 'be-the-heroes.firebaseapp.com',
  projectId: 'be-the-heroes',
  storageBucket: 'be-the-heroes.appspot.com',
  messagingSenderId: '616417999881',
  appId: '1:616417999881:web:378e62db93ac37522f8cd8',
};
const firebaseApp = initializeApp(firebaseConfig);
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const auth = getAuth();

const storage = getStorage(firebaseApp);

export const signInWithGoogleAuth = () => {
  return signInWithPopup(auth, providerGoogle);
};

export const signInWithFacebookAuth = () => {
  return signInWithPopup(auth, providerFacebook);
};
