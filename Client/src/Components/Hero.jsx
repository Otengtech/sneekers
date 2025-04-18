import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Make sure slide-up animation is defined here

const Hero = ({ handleScrollToSneakers }) => {
  const messages = [
    "WELCOME TO SNEEKERS",
    "WELCOME TO STYLE",
    "WELCOME TO COMFORT",
    "WELCOME TO STREETWEAR",
    "WELCOME TO FASHION",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Cycle messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll reveal logic
  const revealRefs = useRef([]);
  revealRefs.current = [];

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      revealRefs.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative top-0 bg-[url('images/hero-wall.jpg')] bg-cover bg-center bg-no-repeat h-myScreen sm:h-screen lg:h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] py-24 px-6 sm:px-10 md:px-10 flex flex-col items-center justify-center space-y-10">
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div
        className="relative z-10 text-center space-y-8 reveal"
        ref={addToRefs}
      >
        <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-7xl text-orange-600 font-bold flex flex-col">
          <span
            key={currentMessageIndex}
            className="text-orange-00 text-5xl md:text-7xl slide-up"
          >
            {messages[currentMessageIndex]}
          </span>
        </h1>

        <p
          className="w-full sm:w-1/2 text-lg text-gray-200 mt-4 mx-auto reveal"
          ref={addToRefs}
        >
          Discover the latest fashion trends and timeless styles at unbeatable
          prices! Whether you're looking for casual wear, formal outfits, or
          trendy accessories, we've got you covered.
        </p>

        <div
          className="mt-6 flex justify-center space-x-5 reveal"
          ref={addToRefs}
        >
          <Link to="/allsneakers">
            <button className="bg-orange-600 text-gray-300 text-sm px-6 sm:px-10 py-4 rounded-full hover:bg-orange-700 transition">
              SHOP NOW
            </button>
          </Link>
          <button
            onClick={handleScrollToSneakers}
            className="bg-black text-gray-300 px-6 text-sm sm:px-10 py-4 rounded-full hover:bg-gray-900 transition"
          >
            VIEW SNEAKERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
