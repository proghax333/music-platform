import MainNav from "@/components/main-nav";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router";
import { Rating as StarComponent } from "react-simple-star-rating";
import Demo from "@/modules/shop/Demo";
import { useProductVariantQuery } from "@/lib/api/product";
import { useAddToCartMutation } from "@/lib/api/cart";
import { useSession } from "../session/useSession";

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
        className={`${bgColor} text-white font-bold px-2 py-1 rounded-md flex items-center space-x-1 text-sm`}>
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
  const { data, isLoading, isError } = useProductVariantQuery(id);

  const [selectImg, setSelectImg] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 4.0, comment: "Great sound quality!" },
    { name: "Bob", rating: 3.5, comment: "Good for beginners." },
  ]);

  const rating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

  const handleSelectImage = (index) => setSelectImg(index);
  const handleScrollDown = () => {
    if (startIdx < (data?.images?.length || 0) - 1) setStartIdx(startIdx + 1);
  };
  const handleScrollUp = () => {
    if (startIdx > 0) setStartIdx(startIdx - 1);
  };

  const { getCurrentProfile } = useSession();
  const currentProfile = getCurrentProfile();
  const addToCartMutation = useAddToCartMutation({
    onSuccess: () => {
      console.log("Added Iten");
    },
    onError: (err) => {
      alert(err.message || "Failed to add item.");
    },
  });

  const handleAddToCart = () => {
    if (!currentProfile?._id) {
      alert("Please login to add to cart");
      return;
    }

    addToCartMutation.mutate({
      profileId: currentProfile._id,
      variantId: data._id,
      quantity: 1,
    });
  };

  const handleSubmitReview = () => {
    if (userRating === 0 || comment.trim() === "") return;
    const newReview = {
      name: `User${reviews.length + 1}`,
      rating: userRating,
      comment,
    };
    setReviews([...reviews, newReview]);
    setComment("");
    setUserRating(0);
  };

  if (isLoading) {
    return (
      <>
        <MainNav />
        <div className="text-center mt-10 text-xl text-gray-500">
          Loading product...
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <>
        <MainNav />
        <div className="text-center mt-10 text-2xl text-red-500">
          Product not found.
        </div>
      </>
    );
  }

  const { name, description, price, images, product } = data;

  const variants = product.variants.edges.map((edge) => edge.node);
  const visibleImages = images.slice(startIdx, startIdx + 4);
  const mainImage = images[selectImg]?.url;

  return (
    <>
      <MainNav />
      <div className="flex flex-col mt-8 border-b-2 ml-6 w-full h-full">
        <div className="flex flex-row w-full">
          <div className="flex-1 border-r-2 flex items-center">
            <div className="relative w-40">
              <button
                onClick={handleScrollUp}
                className="absolute top-0 left-0 right-0 bg-neutral-300 p-2 rounded-full"
                disabled={startIdx === 0}>
                ↑
              </button>
              <div className="w-full h-[400px] overflow-hidden border-2 border-black mt-10 mb-10">
                <div className="flex flex-col space-y-2">
                  {visibleImages.map((image, index) => (
                    <button
                      onClick={() => handleSelectImage(startIdx + index)}
                      key={image.id}
                      className={`border-t-2 border-black p-1 ${
                        selectImg === startIdx + index ? "bg-gray-300" : ""
                      }`}>
                      <img
                        className="w-full h-[100%] object-contain"
                        src={image.url}
                        alt={`Product ${startIdx + index}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleScrollDown}
                className="absolute bottom-0 left-0 right-0 bg-gray-300 p-2 rounded-full"
                disabled={startIdx + 4 >= images.length}>
                ↓
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-full h-auto max-h-[70svh] mx-4 object-contain"
                src={mainImage}
                alt="Main Product"
              />
            </div>
          </div>

          <div className="flex-1 flex-row ml-6">
            <p className="text-primary-800 text-5xl font-semibold">
              {product.name}
            </p>
            <div className="mt-4">
              <RatingSummary
                rating={rating}
                totalRatings={reviews.length}
                totalReviews={reviews.length}
              />
            </div>
            <div className="mt-3 text-base">{description}</div>
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
              <h1 className="text-2xl pr-2">Variant :</h1>
              <div className="flex gap-4">
                {variants.map((variant) => (
                  <NavLink
                    key={variant._id}
                    className="relative group block"
                    to={`/shop/${variant._id}`}>
                    <button className="border-2 w-24 h-28 flex items-center justify-center">
                      <img
                        src={variant.images[0]?.url}
                        alt={variant.name}
                        className="object-contain h-full"
                      />
                    </button>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-s px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {variant.name}
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="text-3xl pt-4 pb-4">Price: ₹{price}</div>
            <div className="display flex-col border-4 w-[90%] ml-10 text-center">
              <div>
                <button className="w-[50%] h-9 border-r-4 bg-secondary-400">
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-[50%] h-9 border-r-4 bg-secondary-400">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pl-10 pr-10">
          <h3 className="text-xl font-semibold mb-2">Submit Your Review</h3>
          <Demo />
          <StarRating rating={userRating} setRating={setUserRating} />
          <textarea
            className="w-full border mt-2 p-2"
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmitReview}>
            Submit
          </button>
          <UserReviews reviews={reviews} />
        </div>
      </div>
    </>
  );
}

export default ShopDescription;
