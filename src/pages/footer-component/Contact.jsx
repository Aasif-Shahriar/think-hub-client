import React from "react";
// Import icons from react-icons
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here, like sending data to an API.
    // For this example, we'll just show an alert.
    alert("Thank you for your message! We will get back to you soon.");
    e.target.reset(); // Resets the form after submission
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <title>Contact Us | ThinkHub</title>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Get in{" "}
            <span className="text-blue-600 dark:text-blue-500">Touch</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you. Whether you have a question, feedback,
            or just want to say hello, feel free to reach out.
          </p>
        </div>

        {/* Contact Info and Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {/* Replaced FontAwesome with react-icons component */}
                  <FaMapMarkerAlt className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Our Address
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Mohammadpur, Dhaka, Bangladesh, 1207
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {/* Replaced FontAwesome with react-icons component */}
                  <FaEnvelope className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Email Us
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  support@thinkhub.com
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {/* Replaced FontAwesome with react-icons component */}
                  <FaPhone className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Call Us
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  +1 (123) 456-7890
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
