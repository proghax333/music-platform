import MainNav from "@/components/main-nav";
import React from "react";

function EventInfoPage() {
  return (
    <>
      <MainNav />

      <main className="w-full h-full overflow-y-auto flex justify-center">
        <div className="w-full h-full max-w-6xl flex flex-col">
          {/* Hero Section */}
          <div className="w-full relative lg:mt-6">
            <img
              src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg"
              alt="Event Banner"
              className="w-full max-h-[400px] object-cover"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center p-6">
              <h1 className="text-white text-4xl font-bold">
                Test Live In Concert - Pune
              </h1>
            </div> */}
          </div>

          {/* Event Details */}
          <div className="w-full bg-white p-6 shadow-md flex flex-col lg:flex-row items-start gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                Test Live In Concert - Pune
              </h2>
              <p className="text-gray-600 mt-1">
                Bollywood, Pop | Hindi | 5yrs + | 2hrs 30mins
              </p>
              <div className="mt-4 flex items-center gap-2 text-gray-700">
                <span className="text-lg font-semibold">
                  📅 Sat, 26 Apr 2025 - 6:30 PM
                </span>
                <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded-md">
                  Filling Fast
                </span>
              </div>
              <p className="mt-2 text-gray-700">
                📍 Amanora Mall, Oasis Lawn, Pune
              </p>
            </div>
            <div>
              <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg">
                Book Now - ₹1,999
              </button>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Singer Info */}
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-xl font-semibold">Singer</h3>
              <div className="flex items-center gap-3 mt-3">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Test"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-lg font-medium">Test</span>
              </div>
            </div>

            {/* Interest & About Section */}
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-xl font-semibold">About</h3>
              <p className="mt-2 text-gray-600">
                Test Live is an electrifying concert featuring the legendary
                playback singer Test. Known for his soulful voice and
                versatility, he performs a mix of Bollywood hits and romantic
                songs.
              </p>
              <button className="mt-3 text-blue-600 font-semibold">
                Read More
              </button>
            </div>

            {/* Location */}
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-xl font-semibold">Location</h3>
              <iframe
                src="https://maps.google.com/maps?q=Amanora%20Mall,%20Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-40 mt-2 rounded-md"
                title="Map"
              ></iframe>
            </div>
          </div>

          {/* Related Events */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mx-4">You may also like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="bg-white p-2 shadow-md rounded-md">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Event"
                  className="w-full rounded-md"
                />
                <p className="text-center mt-2 font-medium">Test1 Live</p>
              </div>
              <div className="bg-white p-2 shadow-md rounded-md">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Event"
                  className="w-full rounded-md"
                />
                <p className="text-center mt-2 font-medium">Test2 Tribute</p>
              </div>
              <div className="bg-white p-2 shadow-md rounded-md">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Event"
                  className="w-full rounded-md"
                />
                <p className="text-center mt-2 font-medium">Test3 Night</p>
              </div>
              <div className="bg-white p-2 shadow-md rounded-md">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Event"
                  className="w-full rounded-md"
                />
                <p className="text-center mt-2 font-medium">Test4 Live</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EventInfoPage;
