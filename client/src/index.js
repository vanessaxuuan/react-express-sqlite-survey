import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Survey from "./components/Survey"
import PostForm from './components/PostForm';
import Edit from "./components/Edit"
import ResponseDisplay from './components/ResponseDisplay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="/Survey" element={<Survey />}/>
        <Route exact path="/Result" element={<ResponseDisplay />}/>
        <Route exact path="/Form" element={<PostForm />}/>
        <Route exact path="/Edit" element={<Edit />}/>
        <Route exact path="/Edit/:id" element={<Edit />}/>
    </Routes>
  </Router>
);
