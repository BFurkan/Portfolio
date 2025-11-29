import React from 'react';
import { Link } from 'react-router-dom';

const heroImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80';

// Featured projects for home page
const featuredProjects = [
  {
    title: 'Toronto Handyman Pro',
    description: 'A professional handyman services website for Toronto area, showcasing services and contact information.',
    link: 'https://torontohandymanpro.ca',
    color: 'purple',
    external: true,
  },
  {
    title: 'Guess the Capital',
    description: 'An interactive game testing knowledge of world capitals, built with React and Bootstrap.',
    link: '/projects/guess-the-capital',
    color: 'blue',
    external: false,
  },
  {
    title: 'Data Management App',
    description: 'A full-stack application for managing data, featuring a separate frontend and backend.',
    link: 'https://github.com/BFurkan/Blog/tree/main/src/pages/projects/data-management',
    color: 'green',
    external: true,
  },
];

// Skills/Technologies
const skills = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'JavaScript/TypeScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Git/GitHub', category: 'Tools' },
  { name: 'Azure', category: 'Cloud' },
];

// Data for the articles
const articles = [
  {
    title: 'Building a React Portfolio',
    description: 'An in-depth look at how to build a personal portfolio using React and Tailwind CSS.',
    date: 'October 17, 2024',
    imageUrl:
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80',
    link: '/writing/react-portfolio',
  },
];

function Home() {
  return (
    <div>
      {/* Header Section with auto-sizing based on the background image */}
      <div
        className="text-center bg-cover bg-center bg-gray-700 bg-blend-multiply relative"
        style={{
          backgroundImage: `url(${heroImage})`,
          paddingTop: '30%',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4 transition-opacity duration-300">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 text-center transition-transform duration-300 hover:scale-105">
            Hello, I'm Furkan
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center px-4 mb-6">
            I'm a Software Engineer. On this website, you'll see a reflection of my life and hobbies, such as
            Photography, Design, Programming, and Traveling.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/projects"
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              View Projects
            </Link>
            <Link
              to="/resume"
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              View Resume
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Me</h2>
            <p className="text-lg text-gray-600 mb-4">
              I'm a Software Developer based in Toronto, Canada, currently working at the Government of Ontario where I develop scalable web applications and tackle complex problems using modern technologies.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              My areas of interest include Web Development, Distributed Systems, Cloud Technologies, and AI Applications. I also enjoy photography, tennis, and working on community-driven projects.
            </p>
            <Link
              to="/about"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Featured Projects</h2>
          <p className="text-gray-600 text-center mb-12">Some of my recent work and projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => {
              const colorClasses = {
                purple: 'border-purple-500 hover:border-purple-600 bg-purple-50',
                blue: 'border-blue-500 hover:border-blue-600 bg-blue-50',
                green: 'border-green-500 hover:border-green-600 bg-green-50',
              };
              const buttonColors = {
                purple: 'bg-purple-600 hover:bg-purple-700',
                blue: 'bg-blue-600 hover:bg-blue-700',
                green: 'bg-green-600 hover:bg-green-700',
              };

              const ProjectLink = project.external ? 'a' : Link;
              const linkProps = project.external
                ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                : { to: project.link };

              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-lg shadow-lg border-2 ${colorClasses[project.color]} transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{project.description}</p>
                  <ProjectLink
                    {...linkProps}
                    className={`inline-block px-6 py-3 text-white rounded-lg font-semibold transition-colors duration-300 text-center w-full ${buttonColors[project.color]}`}
                  >
                    {project.external ? 'Visit Project' : 'View Project'}
                  </ProjectLink>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-200"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Technologies & Skills</h2>
          <p className="text-gray-600 text-center mb-12">Technologies I work with</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gray-100 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
              >
                <span className="text-gray-800 font-medium">{skill.name}</span>
                <span className="text-gray-500 text-sm ml-2">({skill.category})</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Cards Section */}
      {articles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">Latest Articles</h2>
            <p className="text-gray-600 text-center mb-12">Thoughts and tutorials on web development</p>
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                className="group block mb-8 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out bg-white"
              >
                <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
                  <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">{article.description}</p>
                    <span className="text-gray-500 text-sm">{article.date}</span>
                  </div>
                  <div className="w-full md:w-1/3">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="rounded-lg object-cover h-auto w-full"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Feel free to reach out!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/about"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get In Touch
            </Link>
            <a
              href="mailto:bfurkanbayar@gmail.com"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
