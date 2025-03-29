import React, { useState } from "react";

const CheckOut = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted", shippingInfo, paymentMethod);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 md:p-8 my-12 bg-white shadow-lg rounded-lg">
  {/* Title */}
  <h2 className="text-3xl font-bold text-orange-600 text-center">Checkout</h2>

  {/* Shipping Information */}
  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={shippingInfo.name}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={shippingInfo.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
        required
      />
    </div>
    
    <input
      type="text"
      name="address"
      placeholder="Shipping Address"
      value={shippingInfo.address}
      onChange={handleChange}
      className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
      required
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="city"
        placeholder="City"
        value={shippingInfo.city}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
        required
      />
      <input
        type="text"
        name="zip"
        placeholder="ZIP Code"
        value={shippingInfo.zip}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:border-orange-500"
        required
      />
    </div>

    {/* Payment Method */}
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800">Payment Method</h3>
      <div className="mt-2 flex flex-col md:flex-row gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="creditCard"
            checked={paymentMethod === "creditCard"}
            onChange={() => setPaymentMethod("creditCard")}
          />
          Credit Card
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={() => setPaymentMethod("paypal")}
          />
          PayPal
        </label>
      </div>
    </div>

    {/* Submit Order */}
    <button
      type="submit"
      className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
    >
      Place Order
    </button>
  </form>
</div>


export default CheckOut;
