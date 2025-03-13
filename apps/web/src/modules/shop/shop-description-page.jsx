import MainNav from "@/components/main-nav";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
function ShopDescription() {
  const { id } = useParams();

  const Descriptions = [
    {
      id: "1",
      img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
      name: "Havana Curved 39 inch ",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard | No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      sideImg: [
        {
          id: "1",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "2",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "3",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "4",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
      ],
    },
    {
      id: "2",
      img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
      name: "Havana Curved 39 inch ",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard | No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      sideImg: [
        {
          id: "1",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "2",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
      ],
    },

    {
      id: "3",
      img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
      name: "Havana Curved 39 inch ",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard | No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      sideImg: [
        {
          id: "1",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "2",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "3",
          img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
        },
        {
          id: "4",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
      ],
    },
  ];

  const description = Descriptions.find((x) => x.id === id);

  return (
    <>
      <MainNav />

      <div className="flex-1">
        {/* {Descriptions.map((Description) => (
    <DescCard key = {Description.id} Description ={Description}/>
  ))}; */}
        <DescCard description={description} />
      </div>
    </>
  );
}

function DescCard({ description }) {
  const [selectImg, setSelectImg] = useState(0);
  // const temp1 = description.sideImg.find((x) => x.id === id);
  const temp = description.sideImg[selectImg].img;

  const handleSelectImage = (id) => {
    setSelectImg(id);
  };

  return (
    <>
      <div className="flex flex-row mt-8 ml-6">
        <div className="w-[50%] border-r-2 flex justify-center items-center">
          <div className="w-40 h-50  border-2 border-black">
            {description.sideImg.map((image, index) => {
              return (
                <button
                  onClick={() => handleSelectImage(index)}
                  key={`side-img-${image.id}`}
                  className="border-t-2 border-black"
                >
                  <img src={image.img} alt="Shop Description" />
                </button>
              );
            })}
          </div>

          <div>
            <img
              className="w-[80%] h-[80%] pl-10 object-contain justify-center items-center"
              src={temp}
              alt="Shop Description"
            />
          </div>
        </div>
        <div className="w-[50%]  p-4 flex-row ml-6">
          <div>
            <p className="text-red-500 text-5xl font-semibold">
              {description.name}
            </p>
          </div>

          <div className=" mt-6 text-base">{description.desc}</div>
          <div className="mt-6 text-2xl">Features :</div>
          <div className="text-lg  min-h-72">
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
          <div className="text-3xl pb-6">Price: {description.Price}</div>
          <div className="display flex-col border-4 w-[75%] text-center ">
            <div>
              <button className="w-[37%] h-8 border-r-4">Buy Now</button>
              <button className="w-[37%]">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopDescription;
