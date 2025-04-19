import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs
} from "firebase/firestore";
import { db } from "../Auth/FirebaseAuth"; // Firestore instance from firebase.jsx
import Loader from "./Loader";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllSneakers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [likeCounts, setLikeCounts] = useState({});
  const [userReactions, setUserReactions] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("/sneakers.json");
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedLikes = JSON.parse(localStorage.getItem("likeCounts")) || {};
    const storedReactions = JSON.parse(localStorage.getItem("userReactions")) || {};

    setCart(storedCart);
    setFavorites(storedFavorites);
    setLikeCounts(storedLikes);
    setUserReactions(storedReactions);

    // Optionally load all like counts from Firestore
    // const fetchLikesFromFirestore = async () => {
    //   const likeCollection = collection(db, "likes");
    //   const snap = await getDocs(likeCollection);
    //   const likesFromDb = {};
    //   snap.forEach((doc) => {
    //     likesFromDb[doc.id] = doc.data().count || 0;
    //   });
    //   setLikeCounts(likesFromDb);
    // };
    // fetchLikesFromFirestore();
  }, []);

  useEffect(() => {
    let filtered = data;

    if (filterType !== "All") {
      filtered = filtered.filter(item => item.type === filterType);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [data, filterType, searchTerm]);

  const handleAddToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Added to cart!", { autoClose: 1000 });
  };

  const toggleFavorite = (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(favId => favId !== id);
      toast.info("Removed from favorites", { autoClose: 1000 });
    } else {
      updatedFavorites = [...favorites, id];
      toast.success("Added to favorites!", { autoClose: 1000 });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const toggleLike = async (id) => {
    const currentReaction = userReactions[id];
    const updatedLikes = { ...likeCounts };
    const updatedReactions = { ...userReactions };
    const likeRef = doc(db, "likes", id);

    try {
      const docSnap = await getDoc(likeRef);
      let currentLikeCount = docSnap.exists() ? docSnap.data().count || 0 : 0;

      if (currentReaction === "liked") {
        currentLikeCount = Math.max(currentLikeCount - 1, 0);
        updatedLikes[id] = currentLikeCount;
        delete updatedReactions[id];
        toast.info("You unliked the product", { autoClose: 1000 });
      } else {
        currentLikeCount += 1;
        updatedLikes[id] = currentLikeCount;
        updatedReactions[id] = "liked";
        toast.success("You liked the product!", { autoClose: 1000 });
      }

      await setDoc(likeRef, { count: currentLikeCount }, { merge: true });

      setLikeCounts(updatedLikes);
      setUserReactions(updatedReactions);
      localStorage.setItem("likeCounts", JSON.stringify(updatedLikes));
      localStorage.setItem("userReactions", JSON.stringify(updatedReactions));
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Failed to update like. Please try again.");
    }
  };

  const handleImageClick = (item) => {
    setSelectedProduct(item);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto mt-24">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search sneakers..."
          className="border border-gray-300 rounded px-4 py-2 mb-2 sm:mb-0 w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded px-4 py-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Running">Running</option>
          <option value="Basketball">Basketball</option>
        </select>

        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showFavorites ? "Show All" : "See Favorites"}
        </button>
      </div>

      {filteredData.length === 0 ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(showFavorites
            ? filteredData.filter(item => favorites.includes(item.id))
            : filteredData
          ).map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => handleImageClick(item)}
              />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-600">{item.price}</p>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add to Cart
                </button>

                <div className="flex items-center space-x-3">
                  <span
                    className={`cursor-pointer ${
                      favorites.includes(item.id) ? "text-yellow-500" : "text-gray-400"
                    }`}
                    onClick={() => toggleFavorite(item.id)}
                  >
                    ⭐
                  </span>

                  <span
                    className={`cursor-pointer text-lg ${
                      userReactions[item.id] === "liked" ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={() => toggleLike(item.id)}
                  >
                    ❤️
                  </span>
                  <span className="text-sm">{likeCounts[item.id] || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div
            className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✖
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-60 object-contain mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-4">{selectedProduct.price}</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AllSneakers;
