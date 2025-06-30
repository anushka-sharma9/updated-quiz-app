import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Login / SignUp as?</h1>
        <div className="flex flex-col gap-6">
          <button onClick={() => navigate('/student')} className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
            Student
          </button>
          <button onClick={() => navigate('/teacher')} className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition text-lg font-semibold">
            Teacher
          </button>
        </div>
      </div>
    </div>
  );
}