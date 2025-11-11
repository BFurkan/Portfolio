import React from 'react';

const heroImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80';

// Data for the articles
const articles = [
  {
    title: 'Building a React Portfolio',
    description: 'An in-depth look at how to build a personal portfolio using React and Tailwind CSS.',
    date: 'October 17, 2024',
    imageUrl:
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80',
    link: '/writing/react-portfolio', // The link to the detailed writing
  },
  // {
  //   title: 'Understanding JavaScript Closures',
  //   description: 'Learn about closures in JavaScript and how they work under the hood.',
  //   date: 'September 20, 2024',
  //   imageUrl: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
  //   link: '/writing/js-closures', // The link to the detailed writing
  // },
  // {
  //   title: 'Deploying a Website with Vercel',
  //   description: 'A guide to deploying and hosting your React applications using Vercel.',
  //   date: 'August 18, 2024',
  //   imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
  //   link: '/writing/deploy-vercel', // The link to the detailed writing
  // },
];

function Home() {
  return (
    <div>
      {/* Header Section with auto-sizing based on the background image */}
      <div
        className="text-center bg-cover bg-center bg-gray-700 bg-blend-multiply relative"
        style={{
          backgroundImage: `url(${heroImage})`,
          paddingTop: '30%', // Controls the height dynamically based on the image size
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center p-4 transition-opacity duration-300">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6 text-center transition-transform duration-300 hover:scale-105">Hello, I'm Furkan</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 text-center px-4">
            I'm a Software Engineer. On this website, you'll see a reflection of my life and hobbies, such as
            Photography, Design, Programming, and Traveling.
          </p>
        </div>
      </div>

      {/* Article Cards Section with the entire card as a clickable link */}
      <div className="container mx-auto p-4 md:p-8">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.link}
            className="group block mb-8 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
              <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{article.title}</h2>
                <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">{article.description}</p>
                <span className="text-gray-500 text-sm">{article.date}</span>
              </div>

              <div className="w-full md:w-1/3">
              <img src={article.imageUrl} alt={article.title} className="rounded-lg object-cover h-auto w-full" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
