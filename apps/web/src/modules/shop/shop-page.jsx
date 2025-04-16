import MainNav from "@/components/main-nav";
import { useProductsQuery } from "@/lib/api/product";
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useSession } from "../session/useSession";

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isLoading,
    isSuccess,
    isError,
    data: products,
    error,
  } = useProductsQuery();

  return (
    <>
      <MainNav />
      <div className="w-full">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Some error occured.</div>}
        {isSuccess && (
          <>
            <div className="flex justify-center my-4 ">
              <input
                type="text"
                placeholder="Search for a guitar..."
                className="border px-4 py-2 rounded-md shadow-sm w-full md:w-[30%] lg:w-[40%]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8 max-w-[90%]">
                {products.edges.map(({ node: product }) => (
                  <div className="w-full">
                    {" "}
                    <ProductCard key={product._id} product={product} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ProductCard({ product }) {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const selectedVariant = product.variants.edges[0].node;

  return (
    <div className="flex-row border-r-2 border-b-2 w-80 mx-4 mb-4 overflow-hidden">
      <NavLink to={`/shop/${selectedVariant._id}`}>
        <div className="w-full min-h-72 mx-4 mb-2 shadow-md">
          <img
            className="rounded-md shadow-sm"
            src={selectedVariant.images[0].url}
            alt={product.name}
          />
        </div>
        <p className="text-sm ml-6 text-center mt-6 text-black font-bold">
          {product.name}
        </p>
        <p className="text-lg text-black text-center ml-6">
          {product.description}
        </p>
      </NavLink>

      <div className="flex mx-2 justify-center">
        {product.variants.edges.map(({ node: variant }, index) => (
          <div
            key={index}
            className={`w-6 h-6 mx-2 border-2 mt-2 border-black rounded-full cursor-pointer`}
            style={{ backgroundColor: variant.name }}
            // onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>

      <p className="text-xl text-black font-[400] mr-4 text-end ">
        <span className="text-lg font-bold align-text-top">₹</span>
        {selectedVariant.price}
      </p>

      <div className="flex justify-center gap-2 mt-2 pb-2 px-2">
        <button className="border-2 border-black flex-1 h-10 py-2 font-semibold  rounded-lg bg-black text-white hover:border-orange-600 hover:scale-105 hover:bg-orange-500 hover:text-white transition duration-300">
          Buy Now
        </button>
        <button className="border-2 border-black flex-1 h-10 font-semibold text-black rounded-lg hover:border-orange-400 hover:scale-105 hover:bg-orange-400 hover:text-white transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Shop;
