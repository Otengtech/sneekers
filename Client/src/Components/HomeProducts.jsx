import React, { useState, useEffect, forwardRef } from "react";
import ChooseUs from "./ChooseUs";
import { Link } from "react-router-dom";
import { db } from "../Auth/FirebaseAuth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Home = forwardRef((props, ref) => {
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
    if (!email.trim().toLowerCase().includes("@")) {
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

      {/* About Us Section */}
      <div className="py-16 px-10 text-center">
        <h2 className="text-5xl font-bold text-gray-800">Who We Are</h2>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          We bring you a collection of high-quality, stylish footwear that ensures both comfort and elegance. Our designs are inspired by modern trends while prioritizing durability and affordability.
        </p>
      </div>

      {/* Featured Products */}
      <div ref={ref} className="py-10 bg-gray-100">
        <div className="py-14 bg-gray-100">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-800">
            Featured Collections
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 text-center mt-3 max-w-2xl mx-auto">
            Check out our top picks for this season.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-6 sm:px-10">
            {[
              {
                id: 1,
                img: "img17.png",
                name: "AirFlex Sneakers",
                type: "Sport",
                gender: "Unisex",
                size: "42",
                prize: 129,
              },
              {
                id: 2,
                img: "img15.png",
                name: "Urban Glide",
                type: "Street",
                gender: "Men",
                size: "44",
                prize: 99,
              },
              {
                id: 3,
                img: "img16.png",
                name: "Elegance Lowcut",
                type: "Casual",
                gender: "Women",
                size: "39",
                prize: 89,
              },
              {
                id: 4,
                img: "img7.png",
                name: "RunnerX",
                type: "Training",
                gender: "Unisex",
                size: "43",
                prize: 110,
              },
              {
                id: 5,
                img: "img4.png",
                name: "Vintage Lace",
                type: "Retro",
                gender: "Women",
                size: "38",
                prize: 75,
              },
              {
                id: 6,
                img: "img5.png",
                name: "Stealth Grip",
                type: "Athletic",
                gender: "Men",
                size: "45",
                prize: 140,
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row bg-white shadow-xl shadow-gray-300 rounded-2xl overflow-hidden transition hover:scale-[1.01] duration-300"
              >
                <div className="w-full sm:w-1/2 h-64 sm:h-auto bg-gray-100 flex items-center justify-center">
                  <img
                    src={`images/${item.img}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full sm:w-1/2 p-6 flex space-y-3 flex-col justify-center items-center text-center sm:text-left">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-lg text-gray-500 mt-1 capitalize">{item.type} • {item.gender}</p>
                  </div>

                  <div>
                    <div className="flex justify-center sm:justify-start text-orange-500 mb-2 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="text-xl fa-solid fa-star"></i>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
                      <span className="bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded-full">
                        Size: {item.size}
                      </span>
                      <span className="text-lg font-bold text-gray-800">
                      GH<i class="fa-solid fa-cedi-sign"></i> {item.prize}
                      </span>
                    </div>
                  </div>

                  <div className="text-lg text-center">Get it in our shop</div>
                  <div>
                    <Link to="/allsneakers">
                      <button className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-black text-sm rounded-full hover:bg-orange-400 transition">
                        <i className="fa-solid fa-bag-shopping"></i> Go to shop
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-16 px-3 bg-white text-center">
        <div className="text-4xl md:text-6xl font-bold mb-8 text-gray-800">
          What Our Customers Say
        </div>
        <div
          className="flex overflow-x-auto overflow-y-hidden mt-6 space-x-4 px-3 no-scrollbar cursor-grab active:cursor-grabbing"
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
                <div className="p-5 w-96 text-start rounded-lg bg-gray-900 my-3">
                  <div className="text-white text-xl">{item.name}</div>
                  <div className="text-orange-600 text-md">{item.email}</div>
                  <p className="my-4 text-white w-full">{item.message}</p>
                  <div className="flex items-center justify-start space-x-2 my-3 text-xl text-orange-600">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <div className="text-gray-400 text-xs">{item.timestamp?.toDate().toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Form */}
      <div className="text-3xl sm:text-5xl lg:text-6xl mt-10 text-gray-900 font-bold text-center">
        Want to give us a review?
      </div>
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

      {/* Why Choose Us */}
      <ChooseUs />
    </>
  );
});

export default Home;
