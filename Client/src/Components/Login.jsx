import React, { useState } from "react";
import { auth } from "../Auth/FirebaseAuth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUserName, setUserEmail }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { autoClose: 1000 });
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters, with an uppercase letter, a number, and a symbol.",
        { autoClose: 2000 }
      );
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("SignUp successful!", { autoClose: 1000 });
      setUserName(signupName);
      setUserEmail(email);

      localStorage.setItem("userName", signupName);
      localStorage.setItem("userEmail", email);
      setIsLogin(true);
      setUserName(signupName);
      setUserEmail(email);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Use a different email.", {
          autoClose: 2000,
        });
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password", { autoClose: 1000 });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch the display name (if stored in Firebase or manually set before)
      const userName = user.displayName || email.split("@")[0]; // Fallback to part of email as username

      toast.success("Login successful!", { autoClose: 1000 });

      // Set state to update UI
      setUserName(userName);
      setUserEmail(user.email);

      // Persist user info after login
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", user.email);

      console.log("User logged in:", user);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No account found. Please sign up.", { autoClose: 2000 });
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.", { autoClose: 1000 });
      } else {
        toast.error("Login failed. Please try again.", { autoClose: 1000 });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 relative bg-[url('/images/wall1.webp')] bg-cover bg-center w-full h-[85vh] flex items-center justify-center">
        <div className="bg-black bg-opacity-70 p-8 md:p-12 rounded-xl shadow-lg w-full max-w-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-orange-500">
              {isLogin ? "LOG INTO YOUR ACCOUNT" : "CREATE A NEW ACCOUNT"}
            </h2>
            <p className="text-gray-300 mt-2">
              {isLogin
                ? "Login to access your account."
                : "Sign up to access our services."}
            </p>
          </div>
          <div className="mt-6">
            <form
              onSubmit={isLogin ? handleLogin : handleSignUp}
              className="space-y-4 mt-4"
            >
              {!isLogin && (
                <div className="flex bg-white items-center py-2 px-4 rounded-full">
                  <i className="fa-solid fa-user text-lg mr-3 text-gray-600"></i>
                  <input
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                    type="text"
                    placeholder="Enter name"
                  />
                </div>
              )}
              <div className="flex bg-white items-center py-2 px-4 rounded-full">
                <i className="fa-solid fa-envelope text-lg mr-3 text-gray-600"></i>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                  type="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex bg-white items-center py-2 px-4 rounded-full relative">
                <i className="fa-solid fa-lock text-lg mr-3 text-gray-600"></i>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`text-gray-700 cursor-pointer fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </div>
              {!isLogin && (
                <div className="flex bg-white items-center py-2 px-4 rounded-full relative">
                  <i className="fa-solid fa-lock text-lg mr-3 text-gray-600"></i>
                  <input
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-transparent focus:outline-none placeholder:text-gray-600"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                  />
                  <i
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`text-gray-700 cursor-pointer fa-solid ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-full transition duration-300"
                >
                  {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
                </button>
              </div>
              <p className="text-center text-white mt-4">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="underline text-blue-500 cursor-pointer hover:text-blue-400"
                >
                  {isLogin ? "Create account" : "Login"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
