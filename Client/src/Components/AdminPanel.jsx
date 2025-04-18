import React, { useState, useEffect } from "react";
import { db } from "../Auth/FirebaseAuth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminPanel = ({ items, setItems, refreshCartFromLocalStorage }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("flex");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [pin, setPin] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const adminPin = "111";

  useEffect(() => {
    fetchItems();
  }, []);

  const handlePin = (e) => setPin(e.target.value);

  const verifyPin = () => {
    if (pin !== adminPin || pin === "") {
      toast.warn("Incorrect Admin Pin", {
        position: "top-right",
        autoClose: 1000,
      });
    } else {
      toast.success("Admin Pin Verified", {
        position: "top-right",
        autoClose: 1000,
      });
      setTimeout(() => setState("none"), 1000);
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=69f4521c64f28a3fcff440ca4af10f8e`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image upload failed");
    }
  };

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const itemList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(itemList);
  };

  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault();

    if (!name || !price || !gender || !size || !type) {
      toast.warn("All fields are required!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    let imageUrl = editingId
      ? items.find((item) => item.id === editingId)?.imageUrl || ""
      : "";

    try {
      if (image) {
        imageUrl = await uploadImageToImgBB(image);
      }

      const productData = {
        name,
        price: Number(price),
        imageUrl,
        gender,
        size,
        type,
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), productData);
        toast.success("Item updated successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        await addDoc(collection(db, "products"), productData);
        toast.success("Item added successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
      }

      fetchItems();
      setName("");
      setPrice("");
      setType("");
      setSize("");
      setGender("");
      setImage(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error adding/updating item:", error);
      toast.error("An error occurred. Try again!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleEditItem = (item) => {
    setName(item.name);
    setPrice(item.price);
    setEditingId(item.id);
    setGender(item.gender);
    setSize(item.size);
    setType(item.type);
  };

  useEffect(() => {
    if (items && items.length > 0) {
      setTotalAmount(
        items.reduce((acc, i) => acc + Number(i.price || 0), 0).toFixed(2)
      );
    } else {
      setTotalAmount("0.00");
    }
  }, [items]);

  const handleDeleteItem = async (id) => {
    try {
      // 1. Delete from Firebase
      await deleteDoc(doc(db, "products", id));

      // 2. Remove from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCart = storedCart.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      // 3. Refresh local cart state
      refreshCartFromLocalStorage(); // updates UI immediately

      // 4. Optional: re-fetch from Firebase if needed
      fetchItems();

      // 5. Show success toast
      toast.success("Item deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Error deleting item. Try again!", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      {/* Admin PIN overlay */}
      <div
        style={{ display: state }}
        className="fixed top-0 left-0 z-50 bg-black/90 w-full h-screen flex flex-col space-y-5 items-center justify-center text-white"
      >
        <h1 className="text-4xl text-center font-bold text-orange-500">
          WELCOME TO ADMIN PANEL
        </h1>
        <p className="text-lg">Enter Admin PIN to proceed</p>
        <input
          type="password"
          value={pin}
          onChange={handlePin}
          className="px-6 py-2 rounded-full text-gray-800 placeholder:text-gray-600"
          placeholder="Admin PIN"
        />
        <button
          onClick={verifyPin}
          className="px-6 py-2 bg-orange-500 rounded-full hover:bg-orange-600 cursor-pointer transition"
        >
          Verify
        </button>
        <Link to="/"><div
          className="px-6 py-2 bg-white text-black rounded-full cursor-pointer transition"
        >
          Back
        </div></Link>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <p className="text-xl font-semibold">{items.length}</p>
          <p>Products Available</p>
        </div>
        <div className="bg-orange-400 text-white p-6 rounded-xl shadow">
          <p className="text-xl font-semibold">GH<i class="fa-solid fa-cedi-sign"></i>{totalAmount}</p>
          <p>Total Items Value</p>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-orange-500">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
        <form
          onSubmit={handleAddOrUpdateItem}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-1 focus:outline-none border border-gray-400 px-6 py-3 rounded-full"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="col-span-1 focus:outline-none border border-gray-400 px-6 py-3 rounded-full"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="col-span-1 focus:outline-none border border-gray-400 px-6 py-3 rounded-full"
          />
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="col-span-1 focus:outline-none border border-gray-400 px-6 py-3 rounded-full"
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="col-span-1 focus:outline-none border border-gray-400 px-6 py-3 rounded-full"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="col-span-1 focus:outline-none border border-gray-400 px-6 py-3 rounded-full"
          />
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600"
          >
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      {/* Products List */}
      <div>
        <h2 className="text-3xl text-center font-bold text-orange-500 mb-4">
          Product List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow flex space-y-3 items-center"
            >
              <img
                src={item.imageUrl || "https://via.placeholder.com/150"} // Fetch from ImgBB or use placeholder
                alt={item.name || "Product Image"}
                className="w-48 h-48 md:w-56 md:h-56 lg:w-56 lg:h-56 rounded-l-xl"
              />
              <div className="w-full flex flex-col items-center justify-center space-y-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1 capitalize">
                  {item.type} • {item.gender}
                </p>
                <span className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded-full">
                  Size: {item.size}
                </span>
                <p className="text-gray-700">
                GH<i class="fa-solid fa-cedi-sign"></i>{Number(item.price).toFixed(2)}
                </p>
                <div className="flex space-x-4 mt-3">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="text-2xl fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-orange-500 hover:text-red-700"
                  >
                    <i className="text-2xl fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
