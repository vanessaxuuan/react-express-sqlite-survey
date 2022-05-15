import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Home from "./components/Home"
import PostForm from './components/PostForm';
import Summary from "./components/Summary"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
        <Route exact path="/" element={<App />}/>
        <Route exact path="/Home" element={<Home />}/>
        <Route exact path="/Form" element={<PostForm />}/>
        <Route exact path="/Summary" element={<Summary />}/>
        <Route exact path="/Summary/:id" element={<Summary />}/>
    </Routes>
  </Router>
);
