import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = ({ cart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [accountMenu, setAccountMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // Tracks active link

  const setActiveFalse = () => setActiveLink("");

  const toggleAccountMenu = () => {
    setAccountMenu((prev) => !prev);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName) setUserName(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 h-24 w-full flex items-center justify-between px-5 bg-black z-50">
        <div className="flex items-center justify-center space-x-6">
          <i
            onClick={() => setMenuOpen(!menuOpen)}
            className="fa-solid fa-bars flex text-xl text-gray-400 cursor-pointer md:hidden lg:hidden"
          ></i>
          <Link to="/">
            <div className="text-md sm:text-2xl text-gray-300 font-bold">
              SNEEKERS
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-5">
          <ul className="hidden md:flex lg:flex items-center justify-center space-x-5 text-md text-gray-300">
            {[
              { path: "/", label: "Home" },
              { path: "/allsneakers", label: "Shop Now" },
              { path: "/contact", label: "Contact" },
              { path: "/about", label: "About" },
              { path: "/policy", label: "Privacy Policy" },
            ].map((link, index) => (
              <Link key={index} to={link.path}>
                <li
                  onClick={() => setActiveLink(link.path)}
                  className={`cursor-pointer transition duration-300 ${
                    activeLink === link.path
                      ? "pb-2 text-orange-500 font-semibold"
                      : "hover:pb-2 hover:text-orange-500"
                  }`}
                >
                  {link.label}
                </li>
              </Link>
            ))}
          </ul>

          <Link to="/cart">
            <div className="relative" onClick={setActiveFalse}>
              <i className="fa-solid text-orange-600 text-xl cursor-pointer fa-bag-shopping"></i>
              <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-sm rounded-full bg-gray-200">
                {totalItems}
              </span>
            </div>
          </Link>

          <div className="relative">
            <i
              onClick={() => {
                toggleAccountMenu();
                setActiveFalse();
              }}
              className="text-orange-500 text-2xl cursor-pointer fa-solid fa-circle-user"
            ></i>

           <div className="relative">
  {/* Account Menu Container */}
  <div
    className={`absolute top-10 right-4 w-56 flex flex-col items-center p-4 rounded-xl bg-orange-500 transition-all duration-300 shadow-lg ${
      accountMenu
        ? "scale-100 opacity-100"
        : "scale-95 opacity-0 pointer-events-none"
    }`}
  >
    {/* ✅ Display username correctly */}
    <div className="mb-2 font-bold text-white truncate w-full text-center">
      {userName ? userName : "Guest"}
    </div>
    <div className="text-sm text-center text-gray-200 truncate w-full">
      {userEmail ? userEmail : "No email provided"}
    </div>

    {/* Logout Button */}
    <button
      onClick={() => {
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        setUserName("");
        setUserEmail("");
      }}
      className="mt-2 py-1 px-4 w-full text-center bg-gray-900 text-gray-300 rounded-full hover:bg-gray-800"
    >
      Logout
    </button>

    {/* Admin Dashboard Button */}
    <Link to="/adminpanel" className="w-full">
      <button className="mt-2 text-sm py-1 px-4 w-full text-center bg-gray-900 text-gray-300 rounded-full hover:bg-gray-800">
        Dashboard
      </button>
    </Link>
  </div>
</div>


          <Link to="/login">
            <div
              className="flex items-center justify-center"
              onClick={setActiveFalse}
            >
              <button className="py-2 px-4 rounded-full bg-orange-600 text-xs md:text-sm sm:text-sm text-gray-300">
                LOGIN
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Sliding Menu */}
      <div
        className={`z-50 fixed top-16 mt-3 left-0 w-full text-gray-400 bg-black transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0 h-screen" : "-translate-x-full h-screen"
        }`}
      >
        <ul className="flex flex-col justify-center mt-4">
          {[
            { path: "/", label: "Home" },
            { path: "/allsneakers", label: "Shop Now" },
            { path: "/contact", label: "Contact" },
            { path: "/about", label: "About" },
            { path: "/policy", label: "Privacy Policy" },
          ].map((link, index) => (
            <Link key={index} to={link.path}>
              <li
                onClick={() => {
                  setActiveLink(link.path);
                  setMenuOpen(false);
                }}
                className={`cursor-pointer text-gray-300 px-6 py-4 ${
                  activeLink === link.path
                    ? "text-orange-500 font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
