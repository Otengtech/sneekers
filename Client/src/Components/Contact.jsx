import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Footer from "./Footer";

const Contact = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  return (
    <>
      {loader && <Loader />}

      {!loader && (
        <div className="bg-gray-200 min-h-myScreen">
          {/* Contact Section */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-16 bg-black text-white text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-orange-500">
              Contact Us
            </h1>
            <div className="max-w-4xl mx-auto mt-10 text-lg">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 mb-5">
                Get in Touch
              </h2>
              <p className="text-gray-300">
                Have questions or need assistance? We're here to help! Reach out
                to us via email, phone, or visit our store.
              </p>
              <div className="mt-6 space-y-4 text-lg">
                <p className="flex items-center justify-center">
                  <i className="fa-solid fa-envelope text-orange-500 mr-3"></i>
                  <span>Email: support@sneekers.com</span>
                </p>
                <p className="flex items-center justify-center">
                  <i className="fa-solid fa-phone text-orange-500 mr-3"></i>
                  <span>Phone: (+233) 593-957373</span>
                </p>
                <p className="flex items-center justify-center">
                  <i className="fa-solid fa-house text-orange-500 mr-3"></i>
                  <span>Address: 123 Sneeker Street, GHANA, SPINTEX</span>
                </p>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="max-w-2xl mx-auto mt-16 px-6">
            <form className="p-8 space-y-6">
              <h2 className="text-center text-2xl sm:text-3xl font-bold text-orange-500 mb-6">
                Send a Message
              </h2>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-4 border border-gray-400 rounded-full bg-transparent text-gray-500 placeholder:text-md focus:outline-none placeholder-gray-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-4 border border-gray-400 rounded-full bg-transparent text-gray-500 placeholder:text-md focus:outline-none placeholder-gray-400"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-4 border border-gray-400 rounded-3xl bg-transparent text-gray-500 focus:outline-none placeholder-gray-400"
              ></textarea>
              <button className="w-full bg-orange-500 text-gray-900 p-4 rounded-full text-md transition hover:bg-orange-600">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Contact;
