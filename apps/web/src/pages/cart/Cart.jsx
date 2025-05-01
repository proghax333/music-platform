import MainNav from "@/components/main-nav";
import {
  QUERY_CARTITEMS,
  useCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/lib/api/cart";
import { useSession } from "@/modules/session/useSession";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Navigate, NavLink } from "react-router";

function Cart() {
  const cart = [
    {
      id: "1",
      img: "https://m.mediaamazon.com/images/I/515EFIbG87L.jpg",
      name: "Havana Curved 39 inch",
      Price: 8000,
      Color: "Blue",
    },
  ];

  const { getCurrentProfile } = useSession();
  const currentProfile = getCurrentProfile();

  const {
    isLoading,
    isError,
    isSuccess,
    data: cartItems,
    refetch: refetchCartItems,
  } = useCartItemsQuery(currentProfile?._id);

  const updateCartItemMutation = useUpdateCartItemMutation({
    onSuccess: () => {
      refetchCartItems();
    },
  });

  const deleteCartItemMutation = useDeleteCartItemMutation({
    onSuccess: () => {
      refetchCartItems();
    },
  });

  const handleRemove = (id) => {
    console.log("Item remove");
    if (window.confirm("Do you want to remove this item?")) {
      deleteCartItemMutation.mutate({ id });
    }
  };

  const Increased = (item) => {
    updateCartItemMutation.mutate({
      id: item._id,
      updatedData: {
        quantity: item.quantity + 1,
      },
    });
  };

  const Decreased = (item) => {
    updateCartItemMutation.mutate({
      id: item._id,
      updatedData: {
        quantity: item.quantity - 1,
      },
    });
  };

  // Function to calculate the subtotal
  const getSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + Number(item.total), 0);
  };

  // Function to calculate shipping based on subtotal
  const getShipping = () => {
    const subtotal = getSubtotal();
    return subtotal < 10000 ? 200 : 0;
  };

  const getTotal = () => {
    return getSubtotal() + getShipping();
  };

  if (!currentProfile) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <MainNav />

      <div className="container mx-auto p-5">
        {isLoading && <div> Loading ....</div>}
        {isError && <div> Page not found</div>}
        {isSuccess && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl text-center font-semibold mb-6 border-b-4 pb-4">
                Your Cart
              </h2>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex border-b pb-4 mb-6 hover:shadow-xl transition duration-300 ease-in-out">
                  <div className="flex-shrink-0">
                    <img
                      src={item.variant.images[0].url}
                      width={220}
                      height={170}
                      alt={item.variant.product.name}
                      className="rounded-lg border-2 border-gray-300"
                    />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {item.variant.product.name}
                    </h3>
                    <p className="text-xl text-gray-600">
                      Variant :{" "}
                      <span className="font-medium text-gray-800">
                        {item.variant.name}
                      </span>
                    </p>
                    <p className="text-xl font-bold text-gray-800 mt-2">
                      Price: ₹{item.variant.price}
                    </p>

                    <div className="flex items-center mt-2 space-x-6">
                      <span className="text-lg">Quantity:</span>
                      <button
                        className="px-4 py-1 bg-gray-400 text-white rounded-full"
                        onClick={() =>
                          item.quantity == "1"
                            ? handleRemove(item._id)
                            : Decreased(item)
                        }>
                        <p className="text-2xl">-</p>
                      </button>
                      <span className="mx-4 text-xl font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="px-4 py-1 bg-black text-white  rounded-full"
                        onClick={() => Increased(item)}>
                        <p className="text-2xl">+</p>
                      </button>
                    </div>

                    <p className="text-xl font-semibold mt-4">
                      Total: ₹{item.total}
                    </p>

                    <button
                      className="mt-4 text-red-500 font-medium hover:underline"
                      onClick={() => handleRemove(item._id)}>
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-[0.35] bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-xl">Subtotal:</span>
                  <span className="text-xl font-bold">₹{getSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xl">Shipping:</span>
                  <span className="text-xl font-bold">₹{getShipping()}</span>
                </div>
                <div className="flex justify-between mt-4">
                  <span className="text-2xl">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{getTotal()}
                  </span>
                </div>
                <NavLink
                  to="/checkout"
                  className="block text-center w-full py-3 bg-primary-700 text-white text-xl rounded-lg hover:bg-primary-800 transition mt-6">
                  Checkout
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
