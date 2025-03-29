import React from "react";

const ChooseUs = () => {
  return (
    <div className="w-full bg-gray-300 flex flex-col items-center justify-center py-20">
      <div className="text-3xl sm:text-5xl lg:text-6xl text-gray-900 font-bold text-center">
        Why Choose Us
      </div>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <p className="text-xl text-gray-600 mb-8">
            At <span className=" font-semibold">Sneekers</span>, we make shopping
            effortless, stylish, and affordable.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <i className="text-4xl  fa-solid fa-star"></i>
              <h3 className="font-semibold text-lg mt-4">Premium Quality</h3>
              <p className="text-gray-900 text-sm text-center mt-2">
                High-quality fabrics and durable stitching for long-lasting
                wear.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <i className="text-4xl fa-solid fa-truck"></i>
              <h3 className="font-semibold text-lg mt-4">
                Fast & Reliable Shipping
              </h3>
              <p className="text-gray-900 text-sm text-center mt-2">
                Get your favorite styles delivered quickly, no delays!
              </p>
            </div>

            {/* Card 3 */}
            <div className="card bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <i className="text-4xl fa-solid fa-money-check-dollar"></i>
              <h3 className="font-semibold text-lg mt-4">Affordable Prices</h3>
              <p className="text-gray-900 text-sm text-center mt-2">
                Trendy fashion at unbeatable prices, with regular discounts.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <i className="text-4xl fa-solid fa-arrows-spin"></i>
              <h3 className="font-semibold text-lg mt-4">Easy Returns</h3>
              <p className="text-gray-900 text-sm text-center mt-2">
                Hassle-free returns if something doesn’t fit just right.
              </p>
            </div>

            {/* Card 5 */}
            <div className="card bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <i className="text-4xl fa-solid fa-envelope"></i>
              <h3 className="font-semibold text-lg mt-4">Excellent Support</h3>
              <p className="text-gray-900 text-sm text-center mt-2">
                Our friendly team is always here to assist you.
              </p>
            </div>

            {/* Card 6 */}
            <div className="card bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col items-center">
            <i className="text-4xl fa-solid fa-bag-shopping"></i>
              <h3 className="font-semibold text-lg mt-4">Trendy Collections</h3>
              <p className="text-gray-900 text-sm text-center mt-2">
                Stay ahead of fashion with our latest collections.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default ChooseUs;
