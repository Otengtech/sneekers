import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Hero = ({ handleScrollToSneakers }) => {
  const messages = ["WELCOME TO SNEEKERS", "WELCOME TO STYLE", "WELCOME TO COMFORT",
     "WELCOME TO STREETWEAR", "WELCOME TO FASHION"];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Change every 10 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="relative top-0 bg-[url('images/hero-wall.jpg')] bg-cover bg-center bg-no-repeat h-myScreen sm:h-screen lg:h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] py-24 px-6 sm:px-10 md:px-10 flex flex-col items-center justify-center space-y-10">
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <motion.div
        className="relative z-10 text-center space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl sm:text-5xl md:text-7xl lg:text-7xl text-orange-600 font-bold flex flex-col"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={messages[currentMessageIndex]}
              className="text-orange-00 text-5xl md:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {messages[currentMessageIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p
          className="w-full sm:w-1/2 text-lg text-gray-200 mt-4 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Discover the latest fashion trends and timeless styles at unbeatable
          prices! Whether you're looking for casual wear, formal outfits, or
          trendy accessories, we've got you covered.
        </motion.p>

        <motion.div
          className="mt-6 flex justify-center space-x-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
