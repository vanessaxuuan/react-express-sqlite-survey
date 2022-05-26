import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Survey from "./components/Survey"
import ResponseDisplay from './components/ResponseDisplay';
import ViewForm from './components/ViewForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="/Survey" element={<Survey />}/>
        <Route exact path="/Result/:id" element={<ResponseDisplay />}/>
        <Route exact path="/View/:id" element={<ViewForm />}/>
    </Routes>
  </Router>
);
