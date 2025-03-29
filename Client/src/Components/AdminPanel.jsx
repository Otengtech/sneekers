import React, { useState, useEffect } from "react";
import { db, storage } from "../Auth/FirebaseAuth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const AdminPanel = ({ items, setItems }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("flex");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [pin, setPin] = useState("");
  const adminPin = "1957"; // Ensure it's a string if input is string
  //   const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  });

  const handlePin = (e) => {
    setPin(e.target.value);
  };

  const verifyPin = () => {
    if (pin !== adminPin || pin === "") {
      alert("Incorrect Admin Pin");
      toast.warn("Incorrect Admin Pin", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.success("Admin Pin Verified", {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => {
        setState("none");
      }, 1000);
    }
  };

  const fetchImageUrl = async (imageName) => {
    if (!imageName) return "default.jpg"; // Fallback image if no name is provided

    try {
      // Reference to Firebase Storage with the correct folder
      const storageRef = ref(storage, `products/${imageName}`);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error fetching image:", error);
      return "default.jpg"; // Fallback if the image is missing
    }
  };

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));

    const itemList = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const imageUrl = await fetchImageUrl(data.imageUrl); // Convert filename to full URL

        return { id: doc.id, ...data, imageUrl };
      })
    );

    setItems(itemList);
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("All fields are required!");
      return;
    }

    let imageUrl = editingId
      ? items.find((item) => item.id === editingId)?.imageUrl || "" // Keep old image if not changed
      : "";

    if (image) {
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const productData = {
      name,
      price: Number(price),
      imageUrl, // Ensure it saves correctly
    };

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), productData);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    fetchItems();
    setName("");
    setPrice("");
    setImage(null);
    setEditingId(null);
  };

  const handleEditItem = (item) => {
    setName(item.name);
    setPrice(item.price);
    setEditingId(item.id);
  };

  const handleDeleteItem = async (id) => {
    await deleteDoc(doc(db, "products", id));
    fetchItems();
  };

  return (
    <div className="p-7 relative my-10 p-5 w-full mx-auto text-white rounded-xl shadow-lg">
      <div
  style={{ display: state }}
  className="fixed inset-0 h-screen bg-black bg-opacity-90 flex items-center justify-center"
>
  <div className="bg-gray-900 text-white w-96 max-w-full p-6 rounded-xl shadow-lg flex flex-col items-center space-y-5">
    {/* Title */}
    <h2 className="text-orange-500 text-3xl font-bold text-center">
      WELCOME TO THE ADMIN PAGE
    </h2>
    
    {/* Instruction */}
    <p className="text-gray-300 text-center">
      Please input the admin pin to access the page
    </p>

    {/* Input Field */}
    <input
      onChange={handlePin}
      value={pin}
      type="password"
      className="w-full py-2 px-6 rounded-full bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none text-center"
      placeholder="Enter Admin Pin"
    />

    {/* Verify Button */}
    <button
      onClick={verifyPin}
      className="w-full py-2 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition duration-300"
    >
      Verify
    </button>
  </div>
</div>

      <div className="">
        <div className="w-full px-5 sm:w-1/2 md:w-1/2 mx-auto mb-10">
          <h1 className="text-3xl text-center font-bold mb-4 text-orange-500">
            Admin Panel
          </h1>
          <form onSubmit={handleAddOrUpdateItem} className="space-y-4">
            <input
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border py-2 px-6 w-full rounded-full bg-gray-400 text-black placeholder-gray-900"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border py-2 px-6 w-full rounded-full bg-gray-400 text-black placeholder-gray-900"
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border py-2 px-6 w-full rounded-full bg-gray-400 text-black placeholder-gray-900"
            />
            <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
              {editingId ? "Update Item" : "Add Item"}
            </button>
          </form>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mt-5 text-orange-500 text-center">
          All Items
        </h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border py-10 flex flex-col items-center rounded-lg bg-gray-700"
            >
              <img
                src={item.img || "default.jpg"} // img is now a full URL from Firestore
                alt={item.name || "Product Image"}
                className="w-36 h-36 object-cover rounded-lg border border-gray-200"
              />
              <p className="text-lg font-semibold mt-2">
                {item.name} - ${item.price}
              </p>
              <div className="mt-2 flex space-x-3">
                <button
                  onClick={() => handleEditItem(item)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-orange-500 text-white px-4 py-1 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
