import MainNav from "@/components/main-nav";
import Input from "@/ui/Input";
import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { NavLink } from "react-router";

function EventsPage() {
  return (
    <>
      <MainNav />

      <main className="flex-1 flex flex-col w-full h-full overflow-y-hidden items-center">
        <div className="flex-1 flex w-full max-w-6xl h-full border-l">
          <div className="w-72 lg:max-w-72 flex flex-col border-r pt-4">
            <div className="w-full flex gap-4 justify-start px-4 items-center">
              <button className="w-10 h-10 flex items-center justify-center border rounded-lg">
                <MdArrowLeft size={24} className="text-neutral-900" />
              </button>

              <h3 className="font-bold font-poppins">Filters</h3>
            </div>

            <div className="p-4 flex gap-2 w-full">
              <Input className="text-sm" placeholder="Search..." />
              <button className="bg-primary-900 text-primary-content-900 text-sm px-2 flex-1 rounded-md">
                Filter
              </button>
            </div>

            <div className="p-4"></div>
          </div>

          <div className="flex-1 flex overflow-y-auto">
            <div className="w-full h-full flex flex-col overflow-y-auto p-4 gap-4">
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
              <EventCard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function EventCard() {
  return (
    <div className="flex flex-col rounded-md overflow-hidden border-b min-h-fit">
      <div className="bg-[url('https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?cs=srgb&dl=pexels-bri-schneiter-28802-346529.jpg&fm=jpg')] min-h-40 relative bg-cover">
        <div className="absolute bg-white w-20 h-20 top-32 left-4 border-4 rounded-md flex items-center justify-center">
          <span className="font-extrabold text-primary-800 text-3xl">Z</span>
        </div>
      </div>

      <div className="text-base-content-50 w-full border-l border-r pb-2">
        <div className="flex w-full justify-between">
          <div className="ml-28">
            <h3 className="mt-4 font-bold text-xl">
              <NavLink to="/events/123">Event Name</NavLink>
            </h3>

            <p className="text-sm text-base-600">100+ interested</p>

            <p className="text-sm text-base-700 my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              natus tempora rerum perferendis eaque hic sapiente praesentium
              vero labore exercitationem, maxime, eligendi a reiciendis eius?
            </p>
          </div>

          <div>
            <button className="bg-primary-900 text-primary-content-900 p-2 px-4 text-sm rounded-md mt-4 mr-4">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
