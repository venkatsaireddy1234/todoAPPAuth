import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOD0nDtvjJjMX28fGPk7Sc3MtxsiHSj8I",
  authDomain: "todoapp-95d7a.firebaseapp.com",
  projectId: "todoapp-95d7a",
  storageBucket: "todoapp-95d7a.appspot.com",
  messagingSenderId: "1088259873063",
  appId: "1:1088259873063:web:c4deb3db4683d12193b102",
  measurementId: "G-X46JGXY48J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
