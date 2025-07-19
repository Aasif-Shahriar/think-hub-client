import React from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import ThinkHubLogo from "../logo/ThinkHubLogo";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-200  py-10">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          {/* Logo & Description */}
          <div data-aos="fade-right">
            <div className="mb-6">
              <ThinkHubLogo />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              ThinkHub is a place to share ideas, ask questions, and connect
              with developers & learners worldwide.
            </p>
            <div className="flex gap-3 text-xl text-gray-400">
              <a href="#" className="hover:text-blue-500 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FaGithub />
              </a>
              <a href="#" className="hover:text-blue-500 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="150">
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-500 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-500 transition">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/membership"
                  className="hover:text-blue-500 transition"
                >
                  Membership
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-500 transition">
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
                <a href="/terms" className="hover:text-blue-500 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-blue-500 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-blue-500 transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-400 mt-6">
          © 2025 <span className="font-semibold text-white">ThinkHub</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
