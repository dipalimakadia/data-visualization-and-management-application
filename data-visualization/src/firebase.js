import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBP8z15Yv5RsJSmxP6r9j2qZXOgKut9dAo",
    authDomain: "data-visualization-application.firebaseapp.com",
    projectId: "data-visualization-application",
    storageBucket: "data-visualization-application.appspot.com",
    messagingSenderId: "941316636317",
    appId: "1:941316636317:web:81f8b4aa31789d536f9e74",
    measurementId: "G-17EGDLJSST"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;