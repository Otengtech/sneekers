import React from "react";
import ChooseUs from "./ChooseUs";
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-[url(`${import.meta.env.BASE_URL}/images/airmax.jpg`)] bg-cover bg-center h-96 m-6 flex items-center justify-center text-center px-6">
        <div className="">
          <h1 className="text-5xl font-bold text-orange-500">
            Welcome to Our Exclusive Collection
          </h1>
          <p className="text-2xl text-gray-200 mt-4">
            Discover premium quality footwear designed for style and comfort.
          </p>
          <button className="mt-6 bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600">
            Shop Now
          </button>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16 px-10 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Who We Are</h2>
        <p className="text-2xl text-justify text-gray-600 mt-4 max-w-2xl mx-auto">
          We bring you a collection of high-quality, stylish footwear that
          ensures both comfort and elegance. Our designs are inspired by modern
          trends while prioritizing durability and affordability.
        </p>
      </div>

      {/* Featured Products */}
      <div className="py-10 bg-gray-100">
        <h2 className="text-5xl font-bold text-center text-gray-800">
          Featured Collections
        </h2>
        <p className="text-2xl text-gray-600 text-center mt-3">
          Check out our top picks for this season.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
          {[
            "img17.png",
            "img15.png",
            "img16.png",
            "img7.png",
            "img4.png",
            "img5.png",
          ].map((img, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden text-center p-6"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${img}`}
                alt="Product"
                className="w-full h-72 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Premium Sneakers</h3>
              <p className="text-xl text-gray-600 mt-2">
                Experience ultimate comfort and timeless style.
              </p>
              <Link to="/allsneakers"><button className="mt-4 bg-orange-500 text- text-white py-2 px-6 rounded-full hover:bg-orange-600">
                Go to shop
              </button></Link>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-16 px-10 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          What Our Customers Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center mt-6 space-y-6 md:space-y-0 md:space-x-10">
          <div className="bg-gray-100 p-6 flex flex-col items-center text-start justify-start rounded-lg shadow-md shadow-gray-400 max-w-md">
            <p className="text-gray-600 mb-3">
              "The most comfortable sneakers I've ever owned! Highly
              recommended."
            </p>
            <div className="flex justify-start text-orange-500 space-x-1 text-xl">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <h4 className="mt-4 text-xl">- Alex J.</h4>
          </div>
          <div className="bg-gray-100 p-6 flex flex-col items-center text-start justify-start rounded-lg shadow-md shadow-gray-400 max-w-md">
            <p className="text-gray-600 mb-3">
              "Great quality and fast delivery. Definitely buying again!"
            </p>
            <div className="flex justify-start text-orange-500 space-x-1 text-xl">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <h4 className="mt-4 text-xl">- Sarah M.</h4>
          </div>
          <div className="bg-gray-100 p-6 flex flex-col items-center text-start justify-start rounded-lg shadow-md shadow-gray-400 max-w-md">
            <p className="text-gray-600 mb-3">
              "I really like this interface, quality products!"
            </p>
            <div className="flex justify-start text-orange-500 space-x-1 text-xl">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <h4 className="mt-4 text-xl">- Daniel Fross.</h4>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <ChooseUs />

      {/* Call to Action */}
      <div className="py-16 text-center bg-orange-500 text-white">
        <h2 className="text-4xl font-bold">Ready to Upgrade Your Style?</h2>
        <p className="text-lg mt-4">
          Explore our collection and find the perfect pair for you.
        </p>
        <button className="mt-6 bg-white text-orange-500 py-3 px-6 rounded-full text-lg hover:bg-gray-200">
          Shop Now
        </button>
      </div>
    </>
  );
};

export default Home;
