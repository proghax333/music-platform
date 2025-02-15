import React, { useState } from "react";
import { use } from "react";
import { useParams } from "react-router";

function ShopDescription() {
  const { id } = useParams();

  const Descriptions = [
    {
      id: "1",
      img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
      name: "Havana Curved 39 inch",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard | No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      sideImg: [
        { id: "1", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "2", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "3", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "4",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
        { id: "5", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "6",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
      ],
    },
    {
      id: "2",
      img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
      name: "Havana Curved 39 inch",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard | No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      sideImg: [
        { id: "1", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "2", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "3", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "4",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
        { id: "5", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "6",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
      ],
    },
    {
      id: "3",
      img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
      name: "Havana Curved 39 inch",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard | No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      sideImg: [
        { id: "1", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "2", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "3", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "4",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
        { id: "5", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "6",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
      ],
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

  const description = Descriptions.find((x) => x.id === id);
  const [selectImg, setSelectImg] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [selectColor, setSelectedColor] = useState(0);

  const handleSelectImage = (index) => {
    setSelectImg(index);
  };

  const handleScrollDown = () => {
    if (startIdx < description.sideImg.length - 1) {
      setStartIdx(startIdx + 1);
    }
  };

  const handleScrollUp = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 1);
    }
  };

  const temp = description.sideImg[selectImg]?.img;

  // Limit visible images to 4 at a time
  const visibleImages = description.sideImg.slice(startIdx, startIdx + 4);

  return (
    <>
      <div className="flex flex-row mt-8 min-h-[100%] border-b-2 ml-6">
        <div className="w-[50%] border-r-2 flex justify-center items-center">
          {/* Image Slider Container */}
          <div className="relative w-40">
            <button
              onClick={handleScrollUp}
              className="absolute top-0 left-0 right-0 bg-neutral-300 p-2 rounded-full"
              disabled={startIdx === 0}
            >
              ↑
            </button>

            {/* Image Slider */}
            <div className="w-full h-[400px] overflow-hidden border-2 border-black mt-10 mb-10">
              <div className="flex flex-col space-y-2">
                {visibleImages.map((image, index) => (
                  <button
                    onClick={() => handleSelectImage(startIdx + index)}
                    key={`side-img-${image.id}`}
                    className={`border-t-2 border-black p-1 ${
                      selectImg === startIdx + index ? "bg-gray-300" : ""
                    }`}
                  >
                    <img
                      className="w-full h-[100%] object-contain" // Fixed height to prevent resizing
                      src={image.img}
                      alt={`Shop Description ${startIdx + index}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleScrollDown}
              className="absolute bottom-0 left-0 right-0 bg-gray-300 p-2 rounded-full"
              disabled={startIdx + 4 >= description.sideImg.length}
            >
              ↓
            </button>
          </div>

          <div>
            <img
              className="w-full h-auto object-contain justify-center items-center"
              src={temp}
              alt="Shop Description"
            />
          </div>
        </div>

        <div className="w-[50%] p-4 flex-row ml-6">
          <div>
            <p className="text-primary-800 text-5xl font-semibold">
              {description.name}
            </p>
          </div>

          <div className="mt-6 text-base">{description.desc}</div>
          <div className="mt-6 text-2xl">Features :</div>
          <div className="text-lg min-h-72">
            <ul className="list-disc list-inside">
              <li>Back & Sides Wood: Linden.</li>
              <li>Body Shape: Cutaway.</li>
              <li>Fretboard: Rosewood.</li>
              <li>Number of Frets: 21.</li>
              <li>Number of Strings: 6.</li>
              <li>Solid-Top: No.</li>
              <li>Top Wood: Spruce.</li>
            </ul>
          </div>
          <div className="border-2 min-h-[50px]">
            <div className="bg-red-100 text-center text-2xl">Color</div>

            <div className="flex border-2 text-center  ">
              <button className="flex-1">Red</button>
              <div className="flex-1">Blue</div>
              <div className="flex-1">Red</div>
              <div className="flex-1">Blue</div>
            </div>
            <div className="flex border-r-2 text-center">
              <div className="flex-1">Red</div>
              <div className="flex-1">Blue</div>
              <div className="flex-1">Red</div>
              <div className="flex-1">Blue</div>
            </div>
          </div>

          <div className="text-3xl pt-8 pb-6">Price: {description.Price}</div>
          <div className="display flex-col border-4 w-[90%] ml-10 text-center ">
            <div>
              <button className="w-[50%] h-9 border-r-4 bg-secondary-400">
                Buy Now
              </button>
              <button className="w-[50%] h-9 border-r-4 bg-secondary-400">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopDescription;
