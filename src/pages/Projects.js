// src/pages/Projects.js
import React from 'react';
import { Link } from 'react-router-dom';

function Projects() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="project-card bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">Guess the Capital</h3>
          <p className="text-gray-600 mb-6 text-lg">An interactive game testing knowledge of world capitals, built with React and Bootstrap.</p>
          <Link 
            to="/projects/guess-the-capital" 
            className="btn btn-primary inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-center w-full md:w-auto"
          >
            Play Game
          </Link>
        </div>

        <div className="project-card bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">Data Management App</h3>
          <p className="text-gray-600 mb-6 text-lg">A full-stack application for managing data, featuring a separate frontend and backend.</p>
          <a 
            href="https://github.com/BFurkan/Blog/tree/main/src/pages/projects/data-management" 
            className="btn btn-secondary inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-center w-full md:w-auto"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {/* Add other project cards here */}
        
      </div>
    </div>
  );
}

export default Projects;
