import React from "react";
import { FaUsers, FaLightbulb, FaComments } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <title>About Us | ThinkHub</title>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-500">ThinkHub</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            The collaborative platform where ideas flourish and discussions
            thrive.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Our mission is to provide a dynamic and user-friendly space for
            individuals to share knowledge, engage in meaningful conversations,
            and build a community around shared interests. We believe that great
            ideas come from collaboration and open discussion.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <FaUsers className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Community Driven
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with like-minded individuals, share your expertise, and
              learn from others in a welcoming environment.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <FaLightbulb className="text-3xl text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Share & Discover
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Post your thoughts, tutorials, and questions. Explore a wide range
              of topics and discover new perspectives.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
              <FaComments className="text-3xl text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Engage in Discussions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Participate in vibrant comment sections, provide feedback, and
              collaborate to refine ideas.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join Us Today!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Become a part of our growing community. Sign up now to start sharing
            your voice and connecting with others.
          </p>
          <Link to="/register">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
