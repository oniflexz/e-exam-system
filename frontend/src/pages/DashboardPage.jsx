import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import useAuthStore from '../stores/authStore';

const DashboardPage = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await apiClient.get('/exams');
      setExams(response.data || []);
    } catch (err) {
      console.error('Error fetching exams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">E-Exam System</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.fullName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Exams</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading exams...</div>
        ) : exams.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No exams available</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{exam.title}</h3>
                <p className="text-gray-600 mb-4">{exam.description}</p>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <p>Duration: {exam.duration_minutes} minutes</p>
                  <p>Questions: {exam.total_questions}</p>
                  <p>Pass: {exam.passing_percentage}%</p>
                </div>
                <button
                  onClick={() => handleStartExam(exam.id)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded transition"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
