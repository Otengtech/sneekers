import React from "react";
import { Link } from "react-router-dom";

const Hero = ({handleScrollToSneakers}) => {
  return (
    <>
      <div className="relative top-0 bg-[url('images/hero-wall.jpg')] bg-cover bg-center bg-no-repeat h-myScreen sm:h-screen lg:h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] py-24 px-6 sm:px-10 md:px-10 flex flex-col items-center justify-center space-y-10">

        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 text-center space-y-8">
          <div className="text-5xl sm:text-5xl md:text-7xl lg:text-7xl text-orange-600 font-bold">
            <h1>WELCOME TO <span className="text-gray-200 text-5xl md:text-7xl">SNEAKERS</span></h1>
          </div>
          <div className="flex justify-center">
            <p className="w-full sm:w-1/2 text-lg text-gray-200 mt-4">
              Discover the latest fashion trends and timeless styles at
              unbeatable prices! Whether you're looking for casual wear, formal
              outfits, or trendy accessories, we've got you covered.
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-5">
            <Link to="/allsneakers">
              <button className="bg-orange-600 text-gray-300 text-sm px-6 sm:px-10 py-4 rounded-full">
                SHOP NOW
              </button>
            </Link>
              <button onClick={handleScrollToSneakers} className="bg-black text-gray-300 px-6 text-sm sm:px-10 py-4 rounded-full">
                VIEW SNEAKERS
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
