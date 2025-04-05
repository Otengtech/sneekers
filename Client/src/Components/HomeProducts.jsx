import React, { useState, useEffect } from "react";
import ChooseUs from "./ChooseUs";
import { Link } from "react-router-dom";
import { db } from "../Auth/FirebaseAuth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"

const Home = () => {
  const [reviews, setReview] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const addReview = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || name.trim() === "" || message.trim() === "") {
      toast.error("Input fields shouldn't be empty", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    if (!email.trim().toLocaleLowerCase().includes("@")) {
      toast.error("Enter a valid email", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      toast.success("Review added successfully", {
        position: "top-right",
        autoClose: 1000,
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error adding review:", err);
      toast.error("Error adding review", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    const realtimeRender = onSnapshot(
      collection(db, "reviews"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReview(items);
      },
      (err) => {
        console.error("Error fetching real-time data:", err);
      }
    );

    return () => realtimeRender();
  }, []);

  return (
    <>
      <ToastContainer />
      {/* Hero Section */}
      <div className="bg-gray-800 rounded-xl md: h-96 m-6 flex items-center justify-center text-center">
        <div className="p-8">
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
                src={`images/${img}`}
                alt="Product"
                className="w-full h-72 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold mt-4">Premium Sneakers</h3>
              <p className="text-xl text-gray-600 mt-2">
                Experience ultimate comfort and timeless style.
              </p>
              <Link to="/allsneakers">
                <button className="mt-4 bg-orange-500 text- text-white py-2 px-6 rounded-full hover:bg-orange-600">
                  Go to shop
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-16 px-10 bg-white text-center">
        <div className="text-4xl md:text-6xl font-bold mb-8 text-gray-800">
          What Our Customers Say
        </div>
        <div
          className="r flex overflow-x-auto mt-6 space-x-4 no-scrollbar cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            const container = e.currentTarget;
            let isDown = true;
            let startX = e.pageX - container.offsetLeft;
            let scrollLeft = container.scrollLeft;

            const onMouseMove = (e) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - container.offsetLeft;
              const walk = (x - startX) * 1.5;
              container.scrollLeft = scrollLeft - walk;
            };

            const onMouseUp = () => {
              isDown = false;
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          }}
        >
          {reviews.length === 0 ? (
            <div className="text-center mt-8">No reviews available.</div>
          ) : (
            reviews.map((item) => (
              <div key={item.id} className="shrink-0">
                <div className="p-3 w-96 text-start rounded-lg bg-black my-3">
                  <div className="text-white text-xl">{item.name}</div>
                  <div className="text-orange-600 text-md">{item.email}</div>
                  <p className="my-4 text-white w-full">{item.message}</p>
                  <div className="flex items-center justify-start space-x-2 my-3 text-xl text-orange-600">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="">
        <div className="text-3xl sm:text-5xl lg:text-6xl mt-10 text-gray-900 font-bold text-center">
          Want to give us a review?
        </div>
        {/* Review Form */}
        <div className="max-w-2xl mx-auto mt-16 px-6">
          <form className="p-8 space-y-6">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-orange-500 mb-6">
              Send a Review
            </h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-6 py-4 border border-gray-400 rounded-full bg-transparent text-gray-600 focus:outline-none placeholder:text-md placeholder-gray-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-6 py-4 border border-gray-400 rounded-full bg-transparent text-gray-600 focus:outline-none placeholder:text-md placeholder-gray-400"
            />
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Review"
              className="w-full p-4 border border-gray-400 rounded-3xl bg-transparent text-gray-600 focus:outline-none placeholder-gray-400"
            ></textarea>
            <button
              onClick={addReview}
              className="w-full bg-orange-500 text-gray-900 p-4 rounded-full text-md transition hover:bg-orange-600"
            >
              Send Review
            </button>
          </form>
        </div>
      </div>

      {/* Why Choose Us */}
      <ChooseUs />
    </>
  );
};

export default Home;
