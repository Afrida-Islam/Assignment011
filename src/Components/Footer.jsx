import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  Send,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react";
import { AiFillBank } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Logo & About Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <AiFillBank className="text-orange-500 h-12 w-12" />
            <div className="text-white text-xl leading-tight font-extrabold uppercase tracking-wider">
              <p>National</p>
              <p>Scholarship</p>
              <p>Trust</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Empowering students worldwide by providing transparent access to 
            life-changing scholarship opportunities. We help you protect your academic legacy.
          </p>
        </div>

        {/* Quick Links - Working Routes */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-orange-500 w-fit">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-500 transition-colors flex items-center">
                <span className="text-orange-500 mr-2">›</span> Home
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="hover:text-orange-500 transition-colors flex items-center">
                <span className="text-orange-500 mr-2">›</span> All Scholarships
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-500 transition-colors flex items-center">
                <span className="text-orange-500 mr-2">›</span> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-500 transition-colors flex items-center">
                <span className="text-orange-500 mr-2">›</span> Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us & Social Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-orange-500 w-fit">
            Contact Us
          </h3>
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-sm group">
              <Phone className="w-5 h-5 text-orange-500 mr-3" />
              <span>+880 1738128752</span>
            </div>
            <div className="flex items-center text-sm group">
              <Mail className="w-5 h-5 text-orange-500 mr-3" />
              <a href="mailto:support@nst.com" className="hover:text-orange-500 transition-colors">
               afrida0627@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links with your specific URLs */}
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/share/1AUz1wrFPE/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/afrida-islam-ritu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://github.com/Afrida-Islam"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 border-b-2 border-orange-500 w-fit">
            Newsletter
          </h3>
          <p className="text-sm mb-4 text-gray-400">
            Subscribe to get the latest scholarship news and application deadlines.
          </p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden border-2 border-transparent focus-within:border-orange-500 transition-all">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow bg-white px-4 py-3 text-black text-sm outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-4 py-3 transition-colors">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <p>© 2026 National Scholarship Trust. All rights reserved.</p>
        <div className="flex space-x-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;