import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import Quiz from './pages/Quiz';
import Submitted from './pages/Submitted';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/submitted" element={<Submitted />} />
      </Routes>
    </Router>
  );
}