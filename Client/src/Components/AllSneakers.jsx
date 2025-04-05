import { useState, useEffect } from "react";
import Loader from "./Loader";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllSneakers = ({
  products,
  updateProducts,
  resetProducts,
  originalProducts,
  cart,
  setCart,
}) => {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);

  const handleInput = (event) => {
    setInput(event.target.value);
  };
  

  const addToCart = (id) => {
    const itemAdded = originalProducts.find((item) => item.id === id);

    if (cart.some((item) => item.id === id)) {
      toast.info("Item already in cart!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    } else {
      cart.push(itemAdded);
      setCart([...cart]);
      toast.success(`${itemAdded.name} added to cart! 🛒`, {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
      });
    }
    console.log(cart);
  };

  const showProducts = () => {
    setLoader(true);

    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      setTimeout(() => {
        const filtered = originalProducts.filter((item) =>
          item.name.toLowerCase().includes(trimmedInput.toLowerCase())
        );

        if (filtered.length > 0) {
          updateProducts(filtered);
          toast.success("Products filtered successfully! ✅", {
            position: "top-right",
            autoClose: 1000,
          });
        } else {
          toast.error("No matching products found.", {
            position: "top-right",
            autoClose: 1000,
          });
          resetProducts();
        }
        setLoader(false);
      }, 1000);
    } else {
      toast.warn("Please enter a valid product name.", {
        position: "top-right",
        autoClose: 1000,
      });
      setLoader(false);
      resetProducts();
    }
    setInput("");
  };

  const filterByEnterKey = (event) => {
    if (event.key === "Enter") {
      showProducts();
    }
  };

  const viewAllSneakers = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      toast.success("Showing all sneakers!", {
        position: "top-right",
        autoClose: 1000,
      });
    }, 1000);
    resetProducts();
  };

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  return (
    <>
      <ToastContainer />
      {loader && <Loader />}

      {!loader && (
        <div>
          {/* Header Section */}
          <div className="bg-black min-h-myScreen flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 lg:px-32 py-24 space-y-8">
            <h1 className="text-orange-500 font-bold text-center text-4xl sm:text-5xl lg:text-6xl">
              VIEW ALL SNEAKERS
            </h1>
            <p className="text-white text-center text-lg sm:text-xl">
              Get all our sneaker collections here... search for preferred
              sneaker brands.
            </p>

            {/* Search Bar */}
            <div className="relative w-full max-w-lg">
              <input
                onChange={handleInput}
                onKeyDown={filterByEnterKey}
                value={input}
                className="w-full bg-transparent text-gray-300 px-6 py-4 rounded-full border border-gray-400 focus:outline-none placeholder:text-gray-200"
                type="search"
                placeholder="Search for sneakers..."
              />
              <i
                onClick={showProducts}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-xl text-gray-200 fa-solid fa-magnifying-glass cursor-pointer"
              ></i>
            </div>
          </div>

          {/* Sneakers Section */}
          <div className="w-full px-6 sm:px-10 md:px-20 lg:px-32 pb-32 pt-10 mx-auto text-center space-y-8">
            <button
              onClick={viewAllSneakers}
              className="bg-gray-900 text-gray-300 text-lg px-8 py-4 rounded-full transition hover:bg-gray-800"
            >
              VIEW ALL SNEAKERS
            </button>
            <p className="text-gray-500 text-xl">
              Searched sneakers will be displayed here...
            </p>

            {/* Sneakers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row md:flex-row bg-white shadow-xl shadow-gray-300 rounded-2xl overflow-hidden transition hover:scale-[1.02] duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 flex items-center justify-center">
                    <img
                      src={
                        item.img?.startsWith("http")
                          ? item.img
                          : `images/${item.img || "default.jpg"}`
                      }
                      alt={item.name || "Product Image"}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="w-full md:w-1/2 py-10 px-4 flex flex-col items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {item.type} • {item.gender}
                      </p>
                    </div>
                    <div>
                      {/* Rating */}
                      <div className="flex items-center justify-center text-orange-400 mt-2 space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="text-orange-500 fa-solid fa-star" />
                        ))}
                      </div>

                      {/* Size and Price */}
                      <div className="flex flex-wrap justify-center items-center gap-3 mt-3">
                        <span className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded-full">
                          Size: {item.size}
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          ${item.prize}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => addToCart(item.id)}
                        className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-black text-sm mt-2 md:text-md rounded-full hover:bg-orange-400 transition"
                      >
                        <i className="fa-solid fa-bag-shopping"></i>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllSneakers;
