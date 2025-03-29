import React from "react";
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white p-10 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-xl text-orange-500 font-bold pb-3">Sneekers</h2>
            <p>
              Your ultimate destination for premium sneakers. Stay stylish and
              comfortable with our latest collections.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-orange-500 pb-3">
              Quick Links
            </h2>
            <ul className="space-y-4">
              <Link to="/"><li className="hover:underline hover:text-orange-500">
                  Home
              </li></Link>
              <Link to="/allsneakers"><li className="hover:underline hover:text-orange-500">
                  All Sneakers
              </li></Link>
              <Link to="/about"><li  className="hover:underline hover:text-orange-500">
                  About Us
              </li></Link>
              <Link to="/contact"><li className="hover:underline hover:text-orange-500">
                  Contact
              </li></Link>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold pb-3 text-orange-500">
              Follow Us
            </h2>
            <ul className="space-y-2">
              <li>
                <i className="fa-brands fa-facebook mr-3"></i>
                <a href="#" className="hover:underline hover:text-orange-500">
                  Facebook
                </a>
              </li>
              <li>
                <i className="fa-brands fa-instagram mr-3"></i>
                <a href="#" className="hover:underline hover:text-orange-500">
                  Instagram
                </a>
              </li>
              <li>
                <i className="fa-brands fa-twitter mr-3"></i>
                <a href="#" className="hover:underline hover:text-orange-500">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10 border-t border-gray-700 pt-5">
          <p>
            &copy; {new Date().getFullYear()} Sneekers. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
