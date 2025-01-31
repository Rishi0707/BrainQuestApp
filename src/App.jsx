import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './contexts/QuizContext';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import { useQuiz } from './contexts/QuizContext';

// Protected Route Component
function ProtectedQuizRoute() {
  const { state } = useQuiz();
  if (!state.isQuizStarted) {
    return <Navigate to="/" replace />;
  }
  return <Quiz />;
}

// Protected Results Route Component
function ProtectedResultsRoute() {
  const { state } = useQuiz();
  if (!state.isQuizFinished) {
    return <Navigate to="/" replace />;
  }
  return <Results />;
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<ProtectedQuizRoute />} />
        <Route path="/results" element={<ProtectedResultsRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <Router>
        <AppRoutes />
      </Router>
    </QuizProvider>
  );
}

export default App; 