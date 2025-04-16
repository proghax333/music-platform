import { useState } from "react";
import MainNav from "@/components/main-nav";
import { NavLink } from "react-router";

import { MdArrowBack } from "react-icons/md";

function Checkout() {
  const [savedAddress, setSavedAddress] = useState("123, ABC Street, Mumbai");
  const [useSavedAddress, setUseSavedAddress] = useState(
    savedAddress ? true : false
  );
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  return (
    <>
      <MainNav />
      <div className="flex min-h-screen  justify-center bg-white my-2">
        {/* Left Section - Shipping Information */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md border-y">
          <div>
            <NavLink
              to="/cart"
              className={
                "flex gap-2 items-center p-2 w-fit border-b border-transparent hover:border-neutral-200"
              }
            >
              <MdArrowBack size={20} />
              <span>Go back to cart</span>
            </NavLink>
          </div>

          <h2 className="text-2xl font-semibold mb-4 mt-2">Checkout</h2>
          <h3 className="text-lg font-medium mb-2">Shipping Information</h3>

          {/* Address Selection */}
          <div className="mb-4">
            {savedAddress && (
              <div className="mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressOption"
                    checked={useSavedAddress}
                    onChange={() => setUseSavedAddress(true)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">
                    Use saved address: {savedAddress}
                  </span>
                </label>
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="addressOption"
                  checked={!useSavedAddress}
                  onChange={() => setUseSavedAddress(false)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Enter a new address</span>
              </label>
            </div>
          </div>

          {/* Address Form - Show only if adding new address */}
          {!useSavedAddress && (
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-medium">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-medium">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block font-medium">Address</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Enter city"
                  className="border px-3 py-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Enter state"
                  className="border px-3 py-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Enter ZIP code"
                  className="border px-3 py-2 rounded-lg w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5" />
                <label className="text-gray-600 text-sm">
                  I have read and agree to the Terms and Conditions.
                </label>
              </div>

              <button className="border rounded-lg  bg-slate-800 text-white h-10 w-40 mt-4">
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* Right Section - Cart Review */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md ml-8 border-y">
          <h3 className="text-lg font-medium mb-4">Review your cart</h3>

          {/* Cart Items */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="/sofa.png"
                alt="Sofa"
                className="w-14 h-14 rounded-md"
              />
              <div>
                <p>DuoComfort Sofa Premium</p>
                <p className="text-gray-600">1x</p>
                <p>$20.00</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <img
                src="/desk.png"
                alt="Desk"
                className="w-14 h-14 rounded-md"
              />
              <div>
                <p>IronOne Desk</p>
                <p className="text-gray-600">1x</p>
                <p>$25.00</p>
              </div>
            </div>
          </div>

          {/* Discount Code */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              placeholder="Discount code"
              className="border px-3 py-2 rounded-lg w-full"
            />
            <button className="bg-neutral-800 text-white px-4 py-2 rounded-lg">
              Apply
            </button>
          </div>

          {/* Price Summary */}
          <div className="mt-4">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>$45.00</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>
            <div className="flex justify-between text-green-500 font-bold">
              <p>Discount</p>
              <p>- $10.00</p>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <p>Total</p>
              <p>$40.00</p>
            </div>
          </div>

          {/* Pay Button */}
          <button className="w-full bg-primary-700 hover:bg-primary-800 text-white py-3 rounded-lg mt-4 text-lg transition-all">
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;
