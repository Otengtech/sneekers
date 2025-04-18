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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});
  const [userReactions, setUserReactions] = useState({});
  const productsPerPage = 8;

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likeCounts")) || {};
    const storedDislikes =
      JSON.parse(localStorage.getItem("dislikeCounts")) || {};
    const storedReactions =
      JSON.parse(localStorage.getItem("userReactions")) || {};
    setLikeCounts(storedLikes);
    setDislikeCounts(storedDislikes);
    setUserReactions(storedReactions);
  }, []);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.info("Item already in cart!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    } else {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart! 🛒`, {
        position: "top-right",
        theme: "dark",
        autoClose: 1000,
      });
    }
  };

  const showProducts = () => {
    setLoader(true);
    setCurrentPage(1);
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
    setCurrentPage(1);
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

  const toggleFavorite = (product) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === product.id)
        ? prev.filter((fav) => fav.id !== product.id)
        : [...prev, product]
    );
  };

  const toggleLike = (id) => {
    const currentReaction = userReactions[id];

    const updatedLikes = { ...likeCounts };
    const updatedDislikes = { ...dislikeCounts };
    const updatedReactions = { ...userReactions };

    if (currentReaction === "liked") {
      // Unlike
      updatedLikes[id] = (updatedLikes[id] || 1) - 1;
      delete updatedReactions[id];
      toast.info("You unliked the product", { autoClose: 1000 });
    } else {
      // Like it (and remove dislike if it was there)
      updatedLikes[id] = (updatedLikes[id] || 0) + 1;
      if (currentReaction === "disliked") {
        updatedDislikes[id] = (updatedDislikes[id] || 1) - 1;
      }
      updatedReactions[id] = "liked";
      toast.success("You liked the product!", { autoClose: 1000 });
    }

    setLikeCounts(updatedLikes);
    setDislikeCounts(updatedDislikes);
    setUserReactions(updatedReactions);

    localStorage.setItem("likeCounts", JSON.stringify(updatedLikes));
    localStorage.setItem("dislikeCounts", JSON.stringify(updatedDislikes));
    localStorage.setItem("userReactions", JSON.stringify(updatedReactions));
  };

  const toggleDislike = (id) => {
    const currentReaction = userReactions[id];

    const updatedLikes = { ...likeCounts };
    const updatedDislikes = { ...dislikeCounts };
    const updatedReactions = { ...userReactions };

    if (currentReaction === "disliked") {
      // Undo dislike
      updatedDislikes[id] = (updatedDislikes[id] || 1) - 1;
      delete updatedReactions[id];
      toast.info("You removed your dislike", { autoClose: 1000 });
    } else {
      // Dislike it (and remove like if it was there)
      updatedDislikes[id] = (updatedDislikes[id] || 0) + 1;
      if (currentReaction === "liked") {
        updatedLikes[id] = (updatedLikes[id] || 1) - 1;
      }
      updatedReactions[id] = "disliked";
      toast.error("You disliked the product", { autoClose: 1000 });
    }

    setLikeCounts(updatedLikes);
    setDislikeCounts(updatedDislikes);
    setUserReactions(updatedReactions);

    localStorage.setItem("likeCounts", JSON.stringify(updatedLikes));
    localStorage.setItem("dislikeCounts", JSON.stringify(updatedDislikes));
    localStorage.setItem("userReactions", JSON.stringify(updatedReactions));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <ToastContainer />
      {loader && <Loader />}

      {!loader && (
        <div>
          {/* Header */}
          <div className="bg-black min-h-myScreen flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 lg:px-32 py-24 space-y-8 relative">
            <h1 className="text-orange-500 font-bold text-center text-4xl sm:text-5xl lg:text-6xl">
              VIEW ALL SNEAKERS
            </h1>
            <p className="text-white text-center text-lg sm:text-xl">
              Get all our sneaker collections here... search for preferred
              sneaker brands.
            </p>

            {/* Search */}
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
            <div
              onClick={() => setShowFavorites(!showFavorites)}
              className="py-3 px-6 rounded-full text-black bg-orange-500 cursor-pointer"
            >
              {showFavorites ? "Hide Favorites" : "See Favorites"}
            </div>

            {showFavorites && (
              <div className="fixed inset-0 top-16 z-50 bg-white flex flex-col items-center justify-center p-4">
                <button
                  onClick={() => setShowFavorites(false)}
                  className="text-black bg-orange-500 px-4 py-2 rounded-full mb-6"
                >
                  Close Favorites
                </button>
                <div className="text-center mb-3">
                  View all items added to favorite
                </div>
                <div className="grid grid-cols-1 overflow-x-auto sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favorites.map((fav) => (
                    <div
                      key={fav.id}
                      className="bg-white rounded-xl p-4 shadow-md w-72"
                    >
                      <img
                        src={
                          fav.img?.startsWith("http") ? fav.img : fav.imageUrl
                        }
                        alt={fav.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <h3 className="text-lg font-semibold mt-2">{fav.name}</h3>
                      <p className="text-sm text-gray-500">
                        {fav.gender} • Size {fav.size}
                      </p>
                      <p className="font-bold mt-1">GH₵ {Number(fav.price)}</p>
                      <div className="flex items-center justify-start">
                        <button
                          onClick={() => addToCart(fav)}
                          className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-black text-sm mt-2 md:text-md rounded-sm hover:bg-orange-400 transition"
                        >
                          <i className="fa-solid fa-bag-shopping"></i> Add to
                          Cart
                        </button>
                      </div>
                    </div>
                  ))}
                  {favorites.length === 0 && (
                    <p className="text-white text-xl">No favorites yet.</p>
                  )}
                </div>
              </div>
            )}
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

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {currentProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row bg-white shadow-xl rounded-2xl overflow-hidden transition hover:scale-[1.02] duration-300"
                >
                  <div className="w-full relative md:w-1/2 bg-gray-100 flex items-center justify-center">
                    <img
                      onClick={() => handleImageClick(item)}
                      src={
                        item.img?.startsWith("http")
                          ? item.img
                          : item.imageUrl || "https://via.placeholder.com/150"
                      }
                      alt={item.name}
                      className="w-40 h-40 md:w-full md:h-full lg:w-full lg:h-full object-cover cursor-pointer"
                    />
                    <div className="absolute top-4 left-6 flex flex-col items-center">
                      <div className="flex items-center justify-center">
                        <i
                          onClick={() => toggleLike(item.id)}
                          className={` fa-solid fa-thumbs-up text-xl cursor-pointer ${
                            userReactions[item.id] === "liked"
                              ? "text-orange-600"
                              : "text-gray-900"
                          }`}
                        ></i>
                        <span className="text-sm ml-2">
                          {likeCounts[item.id] || 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-center">
                        <i
                          onClick={() => toggleDislike(item.id)}
                          className={`fa -solid fa-thumbs-down text-xl cursor-pointer ${
                            userReactions[item.id] === "disliked"
                              ? "text-orange-600"
                              : "text-gray-900"
                          }`}
                        ></i>
                        <span className="text-sm ml-2">
                          {dislikeCounts[item.id] || 0}
                        </span>
                      </div>
                    </div>
                    <i
                      onClick={() => toggleFavorite(item)}
                      className={`absolute top-6 md:ml-8 lg:ml-8 left-10 text-2xl cursor-pointer fa-star ${
                        favorites.some((f) => f.id === item.id)
                          ? "fa-solid text-orange-400"
                          : "fa-regular text-gray-900"
                      }`}
                    ></i>
                    <span className="absolute bottom-2 left-4 text-sm text-gray-700">
                      {likeCounts[item.id] || 0} people like(s) this
                    </span>
                  </div>

                  <div className="w-full md:w-1/2 py-10 px-4 flex flex-col items-center justify-between">
                    <div>
                      <h2 className="text-sm md:text-xl font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 capitalize">
                        {item.type} • {item.gender}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-center text-orange-400 space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className="fa-solid fa-star text-orange-500"
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 mt-4">
                        <span className="bg-gray-200 text-xs text-gray-700 px-6 py-1 rounded-full">
                          Size: {item.size}
                        </span>
                        <span className="text-sm md:text-lg font-bold text-gray-800">
                          GH<i className="fa-solid fa-cedi-sign"></i>{" "}
                          {Number(item?.price ?? 0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => addToCart(item)}
                        className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-black text-sm mt-2 md:text-md rounded-full hover:bg-orange-400 transition"
                      >
                        <i className="fa-solid fa-bag-shopping"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-full ${
                      currentPage === index + 1
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } hover:bg-orange-400 transition`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Modal */}
            {selectedProduct && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-3xl w-full shadow-lg relative overflow-y-auto max-h-[90vh]">
                  <button
                    onClick={closeModal}
                    className="absolute right-6 top-4"
                  >
                    <i className="text-3xl text-orange-500 fa-solid fa-circle-xmark"></i>
                  </button>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
                      <img
                        src={
                          selectedProduct.img?.startsWith("http")
                            ? selectedProduct.img
                            : selectedProduct.imageUrl ||
                              "https://via.placeholder.com/150"
                        }
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                      />
                    </div>
                    <div className="w-full flex flex-col items-center justify-center md:w-1/2 p-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedProduct.name}
                      </h2>
                      <p className="text-gray-500 mt-1 capitalize">
                        {selectedProduct.type} • {selectedProduct.gender}
                      </p>
                      <span className="bg-gray-200 text-xs text-gray-700 px-6 py-1 rounded-full">
                        Size: {selectedProduct.size}
                      </span>
                      <div className="mt-4 text-orange-500">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>
                      <p className="mt-4 text-gray-600">
                        {selectedProduct.description ||
                          "No description available."}
                      </p>
                      <div className="mt-4 text-lg font-bold text-gray-800">
                        GH<i className="fa-solid fa-cedi-sign"></i>{" "}
                        {(selectedProduct.price || 0).toFixed(2)}
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            closeModal();
                          }}
                          className="px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-400 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllSneakers;
