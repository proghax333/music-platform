import MainNav from "@/components/main-nav";
import React, { useState } from "react";
import { Link, NavLink } from "react-router";

function Shop() {
  const products = [
    {
      id: 1,
      name: "Havawan Acoustic",
      description: "ACG Acoustic Guitar",
      price: 30000,
      colors: [
        {
          name: "black",
          image:
            "https://5.imimg.com/data5/XD/FV/MY-36386885/havana-cutaway-acoustic-guitar-for-beginners-39-inch-fa391c.png",
        },

        {
          name: "blue",
          image:
            "https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565",
        },
      ],
    },
    {
      id: 2,
      name: "Havawan Acoustic",
      description: "ACG Acoustic Guitar",
      price: 30000,
      colors: [
        {
          name: "black",
          image:
            "https://5.imimg.com/data5/XD/FV/MY-36386885/havana-cutaway-acoustic-guitar-for-beginners-39-inch-fa391c.png",
        },

        {
          name: "blue",
          image:
            "https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565",
        },
      ],
    },
    {
      id: 3,
      name: "Havawan Acoustic",
      description: "ACG Acoustic Guitar",
      price: 30000,
      colors: [
        {
          name: "black",
          image:
            "https://5.imimg.com/data5/XD/FV/MY-36386885/havana-cutaway-acoustic-guitar-for-beginners-39-inch-fa391c.png",
        },

        {
          name: "blue",
          image:
            "https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565",
        },
      ],
    },
    {
      id: 4,
      name: "Havawan Acoustic",
      description: "ACG Acoustic Guitar",
      price: 30000,
      colors: [
        {
          name: "black",
          image:
            "https://5.imimg.com/data5/XD/FV/MY-36386885/havana-cutaway-acoustic-guitar-for-beginners-39-inch-fa391c.png",
        },

        {
          name: "blue",
          image:
            "https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565",
        },
      ],
    },
    {
      id: 5,
      name: "Havawan Acoustic",
      description: "ACG Acoustic Guitar",
      price: 30000,
      colors: [
        {
          name: "black",
          image:
            "https://5.imimg.com/data5/XD/FV/MY-36386885/havana-cutaway-acoustic-guitar-for-beginners-39-inch-fa391c.png",
        },

        {
          name: "blue",
          image:
            "https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565",
        },
      ],
    },
    {
      id: 6,
      name: "Havawan Acoustic",
      description: "ACG Acoustic Guitar",
      price: 30000,
      colors: [
        {
          name: "black",
          image:
            "https://5.imimg.com/data5/XD/FV/MY-36386885/havana-cutaway-acoustic-guitar-for-beginners-39-inch-fa391c.png",
        },

        {
          name: "blue",
          image:
            "https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565",
        },
      ],
    },
  ];

  return (
    <>
      <MainNav />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-4 my-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <NavLink to={`/shop/${product.id}`}>
      <div className="flex-row  border-r-2 border-b-2 w-80 mx-4 mb-4 overflow-hidden">
        <div className="w-72 min-h-72 mx-4 mb-2 shadow-md ">
          <img
            className="rounded-md shadow-sm"
            src={selectedColor.image}
            alt={product.name}
          />
        </div>
        <p className="text-sm ml-6 text-center mt-6  text-black font-bold">
          {product.name}
        </p>
        <p className="text-lg text-black text-center ml-6">
          {product.description}
        </p>
        <div className="flex mx-2 justify-center ">
          {product.colors.map((color, index) => (
            <NavLink>
              <div
                key={index}
                className={`w-6 h-6 mx-2 border-2 mt-2 border-black rounded-full cursor-pointer`}
                style={{ backgroundColor: color.name }}
                onClick={() => setSelectedColor(color)} // Update selected color
              ></div>
            </NavLink>
          ))}
        </div>
        <p className="text-xl font-[400] mr-4 text-end mb-5">
          <span className="text-base font-bold align-text-top">₹</span>
          {product.price}
        </p>
      </div>
    </NavLink>
  );
}

export default Shop;
