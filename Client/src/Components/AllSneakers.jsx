import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { doc, onSnapshot, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Auth/FirebaseAuth"; // Adjust path to your Firebase config
import "react-toastify/dist/ReactToastify.css";

// Dummy loader and footer, replace with your real components
const Loader = () => <div className="text-center py-10 text-white">Loading...</div>;
const Footer = () => <footer className="bg-black text-white text-center py-6">© All rights reserved.</footer>;

const AllSneakers = ({ products, updateProducts, resetProducts, originalProducts, cart, setCart }) => {
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [likeCounts, setLikeCounts] = useState({});
  const [userReactions, setUserReactions] = useState({});

  const productsPerPage = 8;
  const deviceId = localStorage.getItem("deviceId") || (() => {
    const id = crypto.randomUUID();
    localStorage.setItem("deviceId", id);
    return id;
  })();

  useEffect(() => {
    // Load existing like data from Firestore for all products
    const unsubscribeFns = products.map((product) => {
      const likeRef = doc(db, "likes", product.id);
      return onSnapshot(likeRef, (docSnap) => {
        if (docSnap.exists()) {
          setLikeCounts((prev) => ({
            ...prev,
            [product.id]: docSnap.data().count || 0,
          }));
        }
      });
    });

    const storedLikes = JSON.parse(localStorage.getItem("likeCounts")) || {};
    const storedReactions = JSON.parse(localStorage.getItem("userReactions")) || {};
    setLikeCounts(storedLikes);
    setUserReactions(storedReactions);

    return () => unsubscribeFns.forEach((unsub) => unsub());
  }, [products]);

  const handleInput = (e) => setInput(e.target.value);

  const handleImageClick = (product) => setSelectedProduct(product);

  const closeModal = () => setSelectedProduct(null);

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.info("Item already in cart!", { autoClose: 1000 });
      return;
    }
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart! 🛒`, { autoClose: 1000, theme: "dark" });
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
        if (filtered.length) {
          updateProducts(filtered);
          toast.success("Products filtered successfully! ✅", { autoClose: 1000 });
        } else {
          toast.error("No matching products found.", { autoClose: 1000 });
          resetProducts();
        }
        setLoader(false);
      }, 1000);
    } else {
      toast.warn("Please enter a valid product name.", { autoClose: 1000 });
      setLoader(false);
      resetProducts();
    }
    setInput("");
  };

  const filterByEnterKey = (event) => {
    if (event.key === "Enter") showProducts();
  };

  const viewAllSneakers = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      toast.success("Showing all sneakers!", { autoClose: 1000 });
      resetProducts();
    }, 1000);
  };

  useEffect(() => {
    setLoader(true);
    const timeout = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const toggleLike = async (id) => {
    const likeRef = doc(db, "likes", id);
    const docSnap = await getDoc(likeRef);
    const data = docSnap.data() || { count: 0, users: {} };

    const hasLiked = data.users?.[deviceId];

    const updatedReactions = { ...userReactions };
    const updatedLikeCounts = { ...likeCounts };

    if (hasLiked) {
      const newCount = Math.max((data.count || 1) - 1, 0);
      await updateDoc(likeRef, {
        count: newCount,
        [`users.${deviceId}`]: false,
      });
      updatedReactions[id] = null;
      updatedLikeCounts[id] = newCount;
      toast.info("You unliked the product", { autoClose: 1000 });
    } else {
      const newCount = (data.count || 0) + 1;
      await setDoc(
        likeRef,
        {
          count: newCount,
          users: {
            ...data.users,
            [deviceId]: true,
          },
        },
        { merge: true }
      );
      updatedReactions[id] = "liked";
      updatedLikeCounts[id] = newCount;
      toast.success("You liked the product!", { autoClose: 1000 });
    }

    setUserReactions(updatedReactions);
    setLikeCounts(updatedLikeCounts);
    localStorage.setItem("likeCounts", JSON.stringify(updatedLikeCounts));
    localStorage.setItem("userReactions", JSON.stringify(updatedReactions));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <ToastContainer />
      {loader && <Loader />}
      {!loader && (
        <div>
          <div className="bg-black min-h-myScreen flex flex-col items-center justify-center px-6 py-24 space-y-8">
            <h1 className="text-orange-500 font-bold text-5xl text-center">VIEW ALL SNEAKERS</h1>
            <p className="text-white text-lg text-center">
              Get all our sneaker collections here... search for preferred sneaker brands.
            </p>
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

          <div className="w-full px-6 md:px-20 pb-32 pt-10 text-center space-y-8">
            <button
              onClick={viewAllSneakers}
              className="bg-gray-900 text-gray-300 text-lg px-8 py-4 rounded-full hover:bg-gray-800 transition"
            >
              VIEW ALL SNEAKERS
            </button>
            <p className="text-gray-500 text-xl">Searched sneakers will be displayed here...</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition duration-300"
                >
                  <div className="relative w-1/2 bg-gray-100 flex items-center justify-center">
                    <img
                      onClick={() => handleImageClick(item)}
                      src={item.img?.startsWith("http") ? item.img : item.imageUrl || "https://via.placeholder.com/150"}
                      alt={item.name}
                      className="w-40 h-40 md:w-full md:h-full lg:w-full lg:h-full object-cover cursor-pointer"
                    />
                    <div className="absolute top-4 left-6 flex flex-col items-center">
                      <div className="flex items-center space-x-2">
                        <i
                          onClick={() => toggleLike(item.id)}
                          className={`fa-solid fa-heart text-xl cursor-pointer ${
                            userReactions[item.id] === "liked" ? "text-orange-600" : "text-orange-500"
                          }`}
                        ></i>
                        <span className="text-sm">{likeCounts[item.id] || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 p-6 flex flex-col justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                      <p className="text-sm text-gray-500 mt-1 capitalize">{item.type} • {item.gender}</p>
                    </div>
                    <div>
                      <div className="flex justify-center text-orange-400 space-x-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>
                      <div className="mt-3 flex flex-col items-center">
                        <span className="bg-gray-200 text-xs text-gray-700 px-4 py-1 rounded-full">
                          Size: {item.size}
                        </span>
                        <span className="text-lg font-bold text-gray-800 mt-2">
                          GH<i className="fa-solid fa-cedi-sign"></i> {item.price}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="mt-3 px-5 py-2 bg-orange-500 text-black text-sm rounded-full hover:bg-orange-400 transition"
                    >
                      <i className="fa-solid fa-bag-shopping"></i> Add to Cart
                    </button>
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
                      currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
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
                  <button onClick={closeModal} className="absolute right-6 top-4">
                    <i className="text-3xl text-orange-500 fa-solid fa-circle-xmark"></i>
                  </button>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
                      <img
                        src={selectedProduct.img?.startsWith("http") ? selectedProduct.img : selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl"
                      />
                    </div>
                    <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
                      <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                      <p className="text-gray-500 mt-1 capitalize">{selectedProduct.type} • {selectedProduct.gender}</p>
                      <span className="bg-gray-200 text-xs text-gray-700 px-6 py-1 mt-2 rounded-full">
                        Size: {selectedProduct.size}
                      </span>
                      <div className="mt-4 text-orange-500">
                        {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star" />)}
                      </div>
                      <p className="mt-4 text-gray-600">
                        {selectedProduct.description || "No description available."}
                      </p>
                      <div className="mt-4 text-lg font-bold text-gray-800">
                        GH<i className="fa-solid fa-cedi-sign"></i> {selectedProduct.price?.toFixed(2)}
                      </div>
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          closeModal();
                        }}
                        className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-400 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AllSneakers;
