import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await apiClient.get('/results/my-results');
      setResults(response.data || []);
    } catch (err) {
      console.error('Error fetching results:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Results</h1>
      {loading ? (
        <div className="text-center py-8">Loading results...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No results available</div>
      ) : (
        <div className="grid gap-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{result.exam_title}</h2>
                  <p className="text-gray-600">Attempted on {new Date(result.end_time).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{result.score}%</p>
                  <p className={result.passed ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {result.passed ? 'PASSED' : 'FAILED'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
