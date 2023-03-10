import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <>
        <NavBar/>
        <App />
        </>
    </StrictMode>
);