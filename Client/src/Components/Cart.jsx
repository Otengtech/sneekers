import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const [loader, setLoader] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + Number(item.prize || 0) * (item.quantity || 1),
      0
    );
    setTotalAmount(total); // Set the new total amount
  }, [cart]); // Recalculate when cart updates

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {loader && <Loader />}
        {!loader && (
          <div>
            <div className="py-14 px-6 bg-black text-center">
              <h1 className="text-5xl text-orange-500 font-bold">Your Cart</h1>
              <p className="text-white text-xl mt-2">
                View and manage your selected items below.
              </p>
            </div>

            {cart.length > 0 && (
              <div className="p-6 text-center bg-white my-6 rounded-lg shadow-lg shadow-gray-400 mx-auto max-w-lg">
                <h2 className="text-orange-600 text-2xl font-bold">Checkout</h2>
                <p className="text-gray-600 mt-2 text-lg">
                  Total Quantity:{" "}
                  {cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}
                </p>
                <p className="text-gray-800 font-semibold text-xl mt-2">
                  Total Amount: ${totalAmount.toFixed(2)}
                </p>
                <Link to="/checkout">
                  <button className="mt-4 py-3 px-6 text-lg rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700 transition">
                    Pay Now
                  </button>
                </Link>
              </div>
            )}

            <div className="py-12 px-6 sm:px-20">
              {cart.length === 0 ? (
                <div className="text-2xl text-gray-700 font-semibold text-center">
                  Your cart is empty. Add items to see them here...
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      className="grid grid-cols-2 md:grid-cols-4 items-center gap-6 bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl"
                      key={item.id}
                    >
                      <div className="flex flex-col items-center">
                        <img
                          src={item.img || "default.jpg"} // img is now a full URL from Firestore
                          alt={item.name || "Product Image"}
                          className="w-36 h-36 object-cover rounded-lg border border-gray-200"
                        />
                      </div>

                      <div className="text-center text-gray-700">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-orange-600 font-bold text-xl mt-2">
                          ${Number(item.prize || 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold text-gray-600 mb-2">
                          Quantity
                        </span>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            -
                          </button>
                          <span className=" flex items-center justify-center text-black text-lg font-semibold">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="py-2 px-5 text-sm rounded-full bg-orange-500 text-white hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
