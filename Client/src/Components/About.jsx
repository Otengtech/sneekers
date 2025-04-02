import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import ChooseUs from "./ChooseUs";
import Footer from "./Footer";

const About = () => {
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
        <div className="bg-black text-white py-20">
          {/* Title */}
          <div className="text-center px-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-orange-500">
              About Us
            </h1>
          </div>
  
          {/* Info Section */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 px-6 md:px-20 py-16">
            {/* Info Box */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 pb-4">
                INFO
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to <span className="text-orange-400 font-semibold">Sneekers</span>,
                your ultimate destination for premium sneakers. We are passionate
                about bringing you the latest and trendiest footwear from top brands 
                around the world. Whether you're a sneakerhead, athlete, or just 
                looking for stylish comfort, we've got something for you.
              </p>
            </div>
  
            {/* Mission Box */}
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 pb-4">
                OUR MISSION
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to provide high-quality sneakers at competitive 
                prices, while ensuring a seamless shopping experience. We strive 
                to connect sneaker enthusiasts with their dream pairs, offering 
                a diverse collection to match every taste and lifestyle.
              </p>
            </div>
          </div>
        </div>
      )}
  
      <ChooseUs />
      <div className="max-w-2xl mx-auto mt-16 px-6">
            <form className="bg-gray-800 p-8 rounded-xl shadow-lg space-y-6 backdrop-blur-lg bg-opacity-80">
              <h2 className="text-center text-2xl sm:text-3xl font-bold text-orange-500 mb-6">
                Send a Review
              </h2>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-6 py-3 border border-gray-700 rounded-full bg-gray-300 text-black placeholder:text-md placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-6 py-3 border border-gray-700 rounded-full bg-gray-300 text-black placeholder:text-md placeholder-gray-500"
              />
              <textarea
                rows="4"
                placeholder="Your Review"
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-300 text-black placeholder-gray-500"
              ></textarea>
              <button className="w-full bg-orange-500 text-gray-900 p-4 rounded-full text-md transition hover:bg-orange-600">
                Send Review
              </button>
            </form>
          </div>
      <Footer />
    </>
  )
}
export default About;
