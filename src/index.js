import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UploadPhoto from './UploadPhoto';
import EditPhoto from './EditPhoto';

import Navbar from './NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const Navigation = () => {
  return (
    <Router>
      <Navbar /> 
        <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/uploadpost" element={<UploadPhoto />} />
        <Route path="/editpost" element={<EditPhoto />} />
        </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navigation />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();