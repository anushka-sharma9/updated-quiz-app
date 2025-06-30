import React, { useState } from 'react';
import axios from 'axios';

export default function Teacher() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [email, setEmail] = useState('');

  const handleOptionChange = (val, idx) => {
    const newOptions = [...options];
    newOptions[idx] = val;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!email || !question || options.includes('') || !correctAnswer) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/questions/add', {
        teacherEmail: email,
        question,
        options,
        correctAnswer,
      });

      // ✅ Store teacher email in localStorage
      localStorage.setItem('teacherEmail', email);

      alert('Question added successfully!');
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } catch (err) {
      console.error(err);
      alert('Error adding question');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '1rem' }}>Add a Quiz Question</h2>
      <input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(e.target.value, idx)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      ))}
      <input
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      <button
        onClick={handleSubmit}
        style={{ width: '100%', backgroundColor: '#4CAF50', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add Question
      </button>
    </div>
  );
}