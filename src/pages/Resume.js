import React from 'react';
import { Link } from 'react-router-dom';
import ResumePdf from './content/Furkan Bayar Resume.pdf'; // Updated path to match actual filename

function Resume() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Furkan Bayar</h1>
          <p className="text-xl text-gray-600">Computer Science Student & Full Stack Developer</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/BFurkan" className="text-blue-600 hover:text-blue-800 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/furkanbayar/" className="text-blue-600 hover:text-blue-800 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              Email
            </a>
            <a href={ResumePdf} download="Furkan_Bayar_Resume.pdf" className="text-blue-600 hover:text-blue-800 transition-colors">
              Download Resume
            </a>
          </div>
        </header>

        {/* Experience Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Professional Experience</h2>
          
          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Government of Ontario | Software Developer</h3>
              <span className="text-gray-600">July 2024 - December 2024</span>
            </div>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Developed a highly functional Asset Management System using full-stack development skills and Agile methodologies</li>
              <li>Built intuitive frontend using React, Tailwind CSS, and implemented responsive design principles</li>
              <li>Developed RESTful APIs and designed PostgreSQL database managing 50,000+ entries</li>
              <li>Utilized Azure for cloud deployment and version control with Git/GitHub</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">York University | Web Developer (Volunteer)</h3>
              <span className="text-gray-600">June 2023 - Feb 2024</span>
            </div>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Developed WordPress CMS for refugee claimants focusing on security and scalability</li>
              <li>Built backend infrastructure using PHP and MySQL, increasing platform capacity by 40%</li>
              <li>Implemented responsive design and web accessibility standards</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Proda Information Technology | Software Developer</h3>
              <span className="text-gray-600">August 2018 - July 2019</span>
            </div>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Optimized server performance using NGINX, Apache, PHP, and MySQL configurations</li>
              <li>Automated package updates improving project efficiency by 40ms</li>
              <li>Led company website development using NGINX Reverse Proxy technology</li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-card p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Guess the Capital</h3>
              <p className="text-gray-600 mb-3">An interactive game testing knowledge of world capitals, built with React and Bootstrap.</p>
              <div className="flex gap-3">
                <Link to="/projects/guess-the-capital" className="text-blue-600 hover:text-blue-800 hover:underline">Demo</Link>
                <a 
                  href="https://github.com/BFurkan/Blog/tree/main/src/pages/projects/guess-the-capital" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="project-card p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">HR Bot</h3>
              <p className="text-gray-600 mb-3">GSoft's sponsor challenge winner at CONUHACKS VII. An AI-powered HR assistant.</p>
              <a 
                href="https://github.com/BFurkan/HRBot" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>

            <div className="project-card p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Lassonde Roborama</h3>
              <p className="text-gray-600 mb-3">Hackathon-winning project focused on robotics and automation.</p>
              <a 
                href="https://github.com/BFurkan/LassondeRoborama" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>

            <div className="project-card p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">IBM Full Stack Developer Course</h3>
              <p className="text-gray-600 mb-3">Comprehensive collection of projects including "Guess It!" game and various full-stack applications using React, Node.js, Python, and Docker.</p>
              <a 
                href="https://github.com/BFurkan/IBM-Fullstack-Developer-Course" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>

            <div className="project-card p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Toronto Handyman Pro</h3>
              <p className="text-gray-600 mb-3">A professional handyman services website for Toronto area, showcasing services and contact information.</p>
              <a 
                href="https://torontohandymanpro.ca" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Languages</h3>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                <li>JavaScript/TypeScript</li>
                <li>Python</li>
                <li>Java</li>
                <li>C++</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Frontend</h3>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                <li>React.js</li>
                <li>HTML5/CSS3</li>
                <li>Tailwind CSS</li>
                <li>Bootstrap</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tools & Technologies</h3>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                <li>Git/GitHub</li>
                <li>Firebase</li>
                <li>Node.js</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section - Moved to bottom */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Education</h2>
          
          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Bachelor of Arts - Computer Science</h3>
              <span className="text-gray-600">2021 - 2025</span>
            </div>
            <p className="text-gray-700 mb-3"><em>York University, Toronto, ON</em></p>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Founder and President of TUSAYU (Turkish Student Association at York University)</li>
              <li>Experience Venture Award Recipient</li>
              <li>Lassonde Roborama Hackathon Winner</li>
              <li>GSoft's sponsor challenge winner in CONUHACKS VII Hackathon</li>
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800">Bachelor of Engineering - Computer Engineering</h3>
              <span className="text-gray-600">2016 - 2019</span>
            </div>
            <p className="text-gray-700 mb-3"><em>Gazi University, Ankara, Turkey</em></p>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Co-President of BMT (Computer Engineering Association)</li>
              <li>IOTURKS Innovator's winner - Developed Arduino Education Interface</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resume;
