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
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 pb-4">
                INFO
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welcome to{" "}
                <span className="text-orange-400 font-semibold">Sneekers</span>,
                your ultimate destination for premium sneakers. We bring you the
                latest and trendiest footwear from top brands worldwide.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-500 pb-4">
                OUR MISSION
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to provide high-quality sneakers at competitive
                prices while ensuring a seamless shopping experience.
              </p>
            </div>
          </div>
        </div>
      )}

      <ChooseUs />
      <Footer />
    </>
  );
};

export default About;
