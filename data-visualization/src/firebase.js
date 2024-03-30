import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0C0RuyqSvvG9GFayldmvYERmd3OOHoiM",
    authDomain: "data-management-application.firebaseapp.com",
    projectId: "data-management-application",
    storageBucket: "data-management-application.appspot.com",
    messagingSenderId: "1053561833769",
    appId: "1:1053561833769:web:800548ac1b4e627a6d4f38",
    measurementId: "G-95P0Y4RB89"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;