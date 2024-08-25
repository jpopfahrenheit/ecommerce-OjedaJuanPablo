import React from 'react'
import { initializeApp } from 'firebase/app';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const firebaseConfig = {
    apiKey: "AIzaSyCJyjNAF8tlJAP3jUIVxaQ2f2wZ9oi-MYY",
    authDomain: "zapatillas-5e4c1.firebaseapp.com",
    projectId: "zapatillas-5e4c1",
    storageBucket: "zapatillas-5e4c1.appspot.com",
    messagingSenderId: "860035363056",
    appId: "1:860035363056:web:74914bc2ddefc680931235"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
        <App />
)
