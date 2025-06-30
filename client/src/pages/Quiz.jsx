import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const email = localStorage.getItem('teacherEmail'); // ✅ read email from storage
      if (!email) {
        alert("No teacher email found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/questions/all/${email}`);
        if (!res.data || res.data.length === 0) {
          alert("No quiz found for this teacher.");
          setLoading(false);
          return;
        }

        const shuffled = res.data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setQuestions(shuffled);
      } catch (err) {
        alert("Error fetching quiz.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (qid, selected) => {
    setAnswers(prev => ({ ...prev, [qid]: selected }));
  };

  const handleSubmit = async () => {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const teacherEmail = localStorage.getItem('teacherEmail');

    const responsePayload = {
      student: studentData,
      teacherEmail,
      answers: questions.map(q => ({
        questionId: q._id,
        selectedOption: answers[q._id] || '',
        correctAnswer: q.correctAnswer
      }))
    };

    await axios.post('http://localhost:5000/api/responses/submit', responsePayload);
    navigate('/submitted');
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading Quiz...</div>;

  if (questions.length === 0) {
    return <div style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No quiz available</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f7f7f7',
      borderRadius: '10px',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
        Question {currentIndex + 1} of {questions.length}
      </h2>

      <div style={{
        background: '#fff',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '1.5rem'
      }}>
        <p style={{ fontWeight: '600', marginBottom: '1rem' }}>{currentQuestion.question}</p>
        {currentQuestion.options.map((opt, i) => (
          <label key={i} style={{
            display: 'block',
            padding: '0.8rem 1rem',
            marginBottom: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: answers[currentQuestion._id] === opt ? '#ffe4b3' : '#f9f9f9'
          }}>
            <input
              type="radio"
              name={currentQuestion._id}
              value={opt}
              checked={answers[currentQuestion._id] === opt}
              onChange={() => handleAnswerChange(currentQuestion._id, opt)}
              style={{ marginRight: '10px' }}
            />
            {opt}
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          style={{
            backgroundColor: '#ddd',
            padding: '0.6rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Prev
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            style={{
              backgroundImage: 'linear-gradient(to right, #ff9966, #ff5e62)',
              color: 'white',
              padding: '0.6rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Submit Quiz →
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            style={{
              backgroundColor: '#4285F4',
              color: 'white',
              padding: '0.6rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}