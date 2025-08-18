import React from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import ThinkHubLogo from "../logo/ThinkHubLogo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-slate-900 text-gray-900 dark:text-gray-200 py-10 transition-colors duration-300">
      <div className="max-w-[1560px] mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-300 dark:border-gray-700 pb-8">
          {/* Logo & Description */}
          <div data-aos="fade-right">
            <div className="mb-6">
              <ThinkHubLogo />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              ThinkHub is a place to share ideas, ask questions, and connect
              with developers & learners worldwide.
            </p>
            <div className="flex gap-3 text-xl text-gray-500 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="150">
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="/membership"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Membership
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div data-aos="fade-left" data-aos-delay="300">
            <h2 className="text-lg font-semibold mb-3">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/terms"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          © 2025{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            ThinkHub
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
