import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Upslash from './pages/Upslash';
import GuessTheCapital from './pages/projects/guess-the-capital/GuessTheCapital';
import './App.css';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-800 mb-4">Page not found</h1>
      <p className="text-slate-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Go back home
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-shell min-h-screen bg-slate-50 text-slate-900">
        <NavBar />
        <main className="main-content mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/guess-the-capital" element={<GuessTheCapital />} />
            <Route path="/upslash" element={<Upslash />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
