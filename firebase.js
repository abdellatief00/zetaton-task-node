const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
} = require("firebase/firestore");
require("dotenv").config();

const serviceAccount = {
  apiKey: "AIzaSyDWWW0vpxX4ulgWCJjUNSyhF7Zk3RtG0mU",
  authDomain: "zetaton-react.firebaseapp.com",
  projectId: "zetaton-react",
  storageBucket: "zetaton-react.appspot.com",
  messagingSenderId: "415548537438",
  appId: "1:415548537438:web:2af1f8f16f0b8cef9092cf",
  measurementId: "G-Z6EBF4SPNY",
};
// Initialize the Firebase app with the service account
initializeApp(serviceAccount);
// Initialize Firestore
const db = getFirestore();
const colres = collection(db, "Images");
getDocs(colres).then((snapshot) => {
  let images = [];
  snapshot.docs.forEach((doc) => {
    images.push({ ...doc.data() });
  });
});

module.exports = { db, colres };
