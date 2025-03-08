import React, { useState } from "react";

const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://cdn-images.dzcdn.net/images/cover/7f187c9527f5368c5f355427b1172849/0x1900-000000-80-0-0.jpg",
    "https://sketchok.com/images/articles/06-anime/002-one-piece/26/16.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ1NdrOOXxFIFQgG-04O80fKzvMylsFBcaMpp-3uSclXG3vvDDjYwinLgNFfnTB6d8Zsw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRdfvzlHq_B0jd8qHbjemgDYgTLnVPDQcKCw&s",
    "https://imgcdn.stablediffusionweb.com/2024/5/21/c0167b34-3875-413a-a670-1bb266de7a0e.jpg",
    "https://i.pinimg.com/550x/38/6e/e9/386ee96b916acaed750c46d330165194.jpg",
  ];

  const Highlights = [
    "https://preview.redd.it/say-something-bad-about-shanks-and-ill-rate-your-opinion-v0-74sxm8o68kzb1.jpg?auto=webp&s=73494645deffdbba60a26e34d96e520c605de53f",
    "https://preview.redd.it/going-merry-or-thousand-sunny-v0-zwgzn343tqzb1.jpg?width=562&format=pjpg&auto=webp&s=e9ecd2766cd1fd9953efae2622abad1abd1c5f8d",
    "https://static.wikia.nocookie.net/onepiece/images/7/7c/Roger_at_Age_51.png/revision/latest?cb=20230617124638",
    "https://static.wikia.nocookie.net/ultimate-worldpedia/images/9/96/Whitebeard_Anime_Concept_Art.png/revision/latest?cb=20180926010539",
    "https://cdn-images.dzcdn.net/images/cover/7f187c9527f5368c5f355427b1172849/0x1900-000000-80-0-0.jpg",
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      {/* Profile Header */}
      <div className="flex items-center gap-12 border-b pb-6">
        <img
          src="https://cdn-images.dzcdn.net/images/cover/7f187c9527f5368c5f355427b1172849/0x1900-000000-80-0-0.jpg"
          alt="Profile"
          className="w-40 h-40 rounded-full border-4 border-gray-300"
        />
        <div className="flex-1">
          <div className="flex items-center ">
            <h2 className="text-3xl font-semibold">Vinsmoker</h2>
            <button className="px-2 py-1 ml-20 bg-gray-200 border rounded-lg text-base font-medium ">
              Edit Profile
            </button>
          </div>
          <div className="flex gap-8 mt-4 text-gray-700 text-lg">
            <span>
              <strong>120</strong> Posts
            </span>
            <span>
              <strong>10K</strong> Followers
            </span>
            <span>
              <strong>500</strong> Following
            </span>
          </div>
          <div className="text-lg">
            <p className="mt-3 ">This is a short bio about the user.</p>
            <p>This is a short bio about the user.</p>
            <p>This is a short bio about the user.</p>
          </div>
        </div>
      </div>

      {/* Story Highlights */}
      <div className="flex gap-6 mt-6 overflow-x-auto border-b-4 border-black pb-4">
        {Highlights.map((img, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={img}
              alt={`Highlight ${index + 1}`}
              className="w-20 h-20 rounded-full border-4 border-gray-400 object-cover cursor-pointer"
              onClick={() => setSelectedImage(img)}
            />
            <span className="text-sm text-gray-600 mt-2">Highlight</span>
          </div>
        ))}
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Post ${index + 1}`}
            className="w-64 h-96 object-cover rounded-md cursor-pointer"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0  flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="w-[35%] h-[70%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
