import React from "react";
import {
  Mail,
  Phone,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { AiFillBank } from "react-icons/ai";
const Footer = () => {
  return (
    <div>
      <footer className="bg-green-800  text-gray-300 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-white text-2xl font-bold flex items-center">
              <AiFillBank className="text-orange-500 mr-2 h-20 w-20" />
              <div className="  text-xl leading-none font-bold ">
                <p>National</p>
                <p>Scholarship</p>
                <p>Trust</p>
              </div>
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Ipsum pretium earum? Totam! Aliquet felis. Nonummy cum posuere.
              Primis. Magnam nec, tempor tellus. Dolor harum voluptates porta
              penatibus dictumst, labore labore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-orange-500 cursor-pointer flex items-center">
                <span className="text-orange-500 mr-2">›</span> Courses
              </li>
              <li className="hover:text-orange-500 cursor-pointer flex items-center">
                <span className="text-orange-500 mr-2">›</span> Cookie Policy
              </li>
              <li className="hover:text-orange-500 cursor-pointer flex items-center">
                <span className="text-orange-500 mr-2">›</span> Terms of Service
              </li>
              <li className="hover:text-orange-500 cursor-pointer flex items-center">
                <span className="text-orange-500 mr-2">›</span> Privacy Policy
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <div className="flex items-center text-sm mb-2">
              <Phone className="w-4 h-4 text-orange-500 mr-2" />
              00047585785
            </div>
            <div className="flex items-center text-sm mb-4">
              <Mail className="w-4 h-4 text-orange-500 mr-2" />
              <a
                href="mailto:userdemo123@gmail.com"
                className="hover:text-orange-500"
              >
                userdemo123@gmail.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              <a
                href="#"
                className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h3>
            <p className="text-sm mb-4">
              To get the latest news and latest updates from us.
            </p>
            <div className="flex items-center bg-white rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-grow px-3 py-2 text-black outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-3 py-2">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-4">
          © 2025 SkillSet. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
