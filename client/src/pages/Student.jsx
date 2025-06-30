import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Student() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', teacherEmail: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.teacherEmail) {
      alert('Please fill in all fields');
      return;
    }

    localStorage.setItem('studentData', JSON.stringify(form));
    navigate('/quiz');
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Student Details</h2>
      <input name="name" placeholder="Name" onChange={handleChange} className="mb-2 p-2 border w-full max-w-md" />
      <input name="email" placeholder="Email" onChange={handleChange} className="mb-2 p-2 border w-full max-w-md" />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="mb-2 p-2 border w-full max-w-md" />
      <input name="teacherEmail" placeholder="Teacher's Email" onChange={handleChange} className="mb-4 p-2 border w-full max-w-md" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">Take the Quiz</button>
    </div>
  );
}