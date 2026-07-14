import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import { formatTime } from '../utils/helpers';

const ExamPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExamData();
  }, [examId]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const fetchExamData = async () => {
    try {
      const examResponse = await apiClient.get(`/exams/${examId}`);
      setExam(examResponse.data);
      setTimeLeft(examResponse.data.duration_minutes * 60);

      const questionsResponse = await apiClient.get(`/questions/exam/${examId}`);
      setQuestions(questionsResponse.data);
    } catch (err) {
      console.error('Error fetching exam data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    try {
      await apiClient.post(`/exams/${examId}/submit`, { answers });
      navigate('/results');
    } catch (err) {
      console.error('Error submitting exam:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading exam...</div>;
  }

  if (!exam || questions.length === 0) {
    return <div className="text-center py-8">Exam not found</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="exam-timer">
        Time Left: {formatTime(timeLeft)}
      </div>

      <div className="exam-container mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{exam.title}</h1>
            <p className="text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{question.question_text}</h2>
            {question.question_type === 'mcq' && (
              <div className="space-y-3">
                {question.options?.map((option) => (
                  <label key={option.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={() => handleAnswerChange(question.id, option.id)}
                      className="mr-3"
                    />
                    <span>{option.option_text}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === questions.length - 1}
              className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
