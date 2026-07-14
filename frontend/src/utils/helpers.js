export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const calculateScore = (answers, correctAnswers) => {
  let correct = 0;
  for (const [questionId, answer] of Object.entries(answers)) {
    if (answer === correctAnswers[questionId]) {
      correct++;
    }
  }
  return Math.round((correct / Object.keys(answers).length) * 100);
};
