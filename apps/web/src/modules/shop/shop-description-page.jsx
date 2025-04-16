import MainNav from "@/components/main-nav";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Rating as StarComponent } from "react-simple-star-rating";
import Demo from "@/modules/shop/Demo";

export function StarRating({ rating, setRating }) {
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="flex items-center space-x-2 mt-2 pt-8">
      <StarComponent
        onClick={handleRating}
        size={25}
        initialValue={rating}
        allowFraction
        SVGstyle={{ display: "inline" }}
      />

      <span className="text-lg font-semibold">{rating.toFixed(1)}/5</span>
    </div>
  );
}

function RatingSummary({ rating, totalRatings, totalReviews }) {
  let bgColor = "bg-red-600";

  if (rating > 1 && rating <= 2) bgColor = "bg-red-500";
  else if (rating > 2 && rating <= 3) bgColor = "bg-yellow-500";
  else if (rating > 3 && rating <= 4) bgColor = "bg-green-600";
  else if (rating > 4) bgColor = "bg-green-700";

  return (
    <div className="flex items-center mt-2 space-x-2">
      <div
        className={`${bgColor} text-white font-bold px-2 py-1 rounded-md flex items-center space-x-1 text-sm`}
      >
        <span>{rating.toFixed(1)}</span>
        <span>★</span>
      </div>
      <span className="text-gray-600 text-sm">
        {totalRatings} Ratings & {totalReviews} Reviews
      </span>
    </div>
  );
}

function UserReviews({ reviews }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Be the first to rate!</p>
      )}
      {reviews.map((review, index) => (
        <div key={index} className="flex items-start space-x-4 mb-4">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={`https://i.pravatar.cc/150?img=${(index % 70) + 1}`}
            alt={`User ${index + 1}`}
          />
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">{review.name}</span>
              <span className="text-yellow-500">★ {review.rating}</span>
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ShopDescription() {
  const { id } = useParams();

  const Descriptions = [
    {
      id: "1",
      img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg",
      name: "Havana Curved 39 inch",
      desc: "Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard |Travel & Small-Body Guitars | Neo-Tropical Mahogany Top | Layered Sapele Back and Sides | Mahogany or Maple Neck | Ebony or Eucalyptus (based on availability) Fretboard  No Electronics | Non-cutaway | Gig Bag Case",
      features: "Back & Sides Wood: Linden",
      Price: "8000",
      rating: 2.8,
      reviews: 2,
      ratings: 2,
      sideImg: [
        { id: "1", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "2", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "3", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "4", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        { id: "5", img: "https://m.media-amazon.com/images/I/515EFIbG87L.jpg" },
        {
          id: "6",
          img: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-PNG-Version.png",
        },
      ],
      Variant: [
        {
          id: "1",
          color: "Red",
          img: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/f/s/fsc_ta_rr_3.jpg",
        },
        {
          id: "2",
          color: "Red",
          img: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/f/s/fsc_ta_rr_3.jpg",
        },
        {
          id: "3",
          color: "Red",
          img: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/f/s/fsc_ta_rr_3.jpg",
        },
        {
          id: "4",
          color: "Red",
          img: "https://yamaha.ndcdn.in/media/catalog/product/cache/9e0f31af0cdc06df956748b13dabad87/f/s/fsc_ta_rr_3.jpg",
        },
      ],
    },
  ];

  const description = Descriptions.find((item) => item.id === id);
  const [selectImg, setSelectImg] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [rating, setRating] = useState(description.rating);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 4.0, comment: "Great sound quality!" },
    { name: "Bob", rating: 3.5, comment: "Good for beginners." },
  ]);

  const handleSelectImage = (index) => setSelectImg(index);
  const handleScrollDown = () => {
    if (startIdx < description.sideImg.length - 1) setStartIdx(startIdx + 1);
  };
  const handleScrollUp = () => {
    if (startIdx > 0) setStartIdx(startIdx - 1);
  };

  const visibleImages = description.sideImg.slice(startIdx, startIdx + 4);
  const mainImage = description.sideImg[selectImg]?.img;

  const handleSubmitReview = () => {
    if (userRating === 0 || comment.trim() === "") return;
    const newReview = {
      name: `User${reviews.length + 1}`,
      rating: userRating,
      comment,
    };
    const newReviews = [...reviews, newReview];
    const avgRating =
      newReviews.reduce((acc, r) => acc + r.rating, 0) / newReviews.length;

    setReviews(newReviews);
    setRating(avgRating);
    setComment("");
    setUserRating(0);
  };

  if (!description) {
    return (
      <>
        <MainNav />
        <div className="text-center mt-10 text-2xl text-red-500">
          Product not found.
        </div>
      </>
    );
  }

  return (
    <>
      <MainNav />
      <div className="flex flex-row mt-8 min-h-[100%] border-b-2 ml-6">
        <div className="w-[50%] border-r-2 flex justify-center items-center">
          <div className="relative w-40">
            <button
              onClick={handleScrollUp}
              className="absolute top-0 left-0 right-0 bg-neutral-300 p-2 rounded-full"
              disabled={startIdx === 0}
            >
              ↑
            </button>

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
                      className="w-full h-[100%] object-contain"
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
              disabled={startIdx + 4 >= (description.sideImg?.length || 0)}
            >
              ↓
            </button>
          </div>

          <div>
            <img
              className="w-full h-auto object-contain justify-center items-center"
              src={mainImage}
              alt="Shop Description"
            />
          </div>
        </div>

        <div className="w-[50%]  flex-row ml-6">
          <p className="text-primary-800 text-5xl font-semibold">
            {description.name}
          </p>
          <div className="mt-4">
            <RatingSummary
              rating={rating}
              totalRatings={reviews.length}
              totalReviews={reviews.length}
            />
          </div>
          <div className="mt-3 text-base">{description.desc}</div>
          <div className="mt-3 text-2xl">Features :</div>
          <ul className="list-disc list-inside text-lg pb-4">
            <li>Back & Sides Wood: Linden.</li>
            <li>Body Shape: Cutaway.</li>
            <li>Fretboard: Rosewood.</li>
            <li>Number of Frets: 21.</li>
            <li>Number of Strings: 6.</li>
            <li>Solid-Top: No.</li>
          </ul>
          <div>
            <h1 className="text-2xl pr-2"> Variant : </h1>

            <div className="flex gap-4">
              {Descriptions[0].Variant.map((variant) => (
                <div key={variant.id} className="relative group">
                  <button className="border-2 w-24 h-28 flex items-center justify-center">
                    <img
                      src={variant.img}
                      alt={`Variant ${variant.id}`}
                      className="object-contain h-full"
                    />
                  </button>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-s px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {variant.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-3xl pt-4 pb-4">Price: ₹{description.Price}</div>
          <div className="display flex-col border-4 w-[90%] ml-10 text-center">
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
      <div>
        <div className="mx-8">
          <h1 className="text-2xl py-4"> Recommended</h1>
          <div className="flex-row border-2 border-gray-600 w-52 mx-4 mb-4 overflow-hidden">
            <div className="w-36  mx-4 mb-2 shadow-md">
              <img
                className="rounded-md object-cover w-full h-full shadow-sm"
                src="https://sterlingmusic.in/cdn/shop/files/DSC03531-E.jpg?v=1727238565"
                alt="Product"
              />
            </div>

            <p className="text-sm mx-2 text-center mt-6 text-black font-bold">
              Hawana 39-inch blue Guitar Mat black
            </p>

            <p className="text-xl text-black font-[400] mr-4 text-end ">
              <span className="text-lg font-bold align-text-top">₹</span>
              50000
            </p>
          </div>
        </div>
        <div className="mt-10 pl-10">
          <h3 className="text-xl font-semibold mb-2">Submit Your Review</h3>
          <Demo />
          <StarRating rating={userRating} setRating={setUserRating} />

          <textarea
            className="w-full border mt-2 p-2 "
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmitReview}
          >
            Submit
          </button>

          <UserReviews reviews={reviews} />
        </div>
      </div>
    </>
  );
}

export default ShopDescription;
