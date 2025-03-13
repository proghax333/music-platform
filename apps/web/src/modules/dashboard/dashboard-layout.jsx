import SiteLogo from "@/components/site-logo";
import { Outlet } from "react-router";

import { AiFillDollarCircle, AiFillProduct } from "react-icons/ai";
import { FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShop, FaUsers } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";

function DashboardLayout() {
  return (
    <>
      <nav></nav>

      <main className="w-full h-full flex flex-col overflow-hidden font-inter">
        {/* top app bar */}
        <div className="w-full h-16 min-h-16 shadow-neutral-200 border-b flex flex-row p-2 items-center">
          <SiteLogo />

          <h3 className="mx-6 font-bold text-lg text-neutral-700 font-inter">
            Dashboard
          </h3>

          <div className="ml-auto mr-4">
            <div
              className="w-12 h-12 flex items-center justify-center shadow border rounded-full
              text-neutral-600 border-neutral-300 cursor-pointer"
            >
              A
            </div>
          </div>
        </div>

        <div className="flex w-full h-full">
          {/* side bar */}
          <div className="h-full overflow-y-auto min-w-16 bg-white border-r py-4 flex flex-col">
            <div className="w-full h-full flex flex-col gap-3">
              <button
                className={`mx-auto p-2 ${true ? "bg-neutral-200" : ""} hover:bg-neutral-200 rounded-md`}
              >
                <FaShop size={24} />
              </button>
              <button className={`mx-auto p-2 hover:bg-neutral-200 rounded-md`}>
                <FaCartPlus size={24} />
              </button>
              <button className={`mx-auto p-2 hover:bg-neutral-200 rounded-md`}>
                <TbTruckDelivery size={24} />
              </button>
              <button className={`mx-auto p-2 hover:bg-neutral-200 rounded-md`}>
                <AiFillDollarCircle size={24} />
              </button>
              <button className={`mx-auto p-2 hover:bg-neutral-200 rounded-md`}>
                <FaUsers size={24} />
              </button>
              <button className={`mx-auto p-2 hover:bg-neutral-200 rounded-md`}>
                <MdEvent size={24} />
              </button>
            </div>
          </div>

          {/* main content */}
          <div className="w-full h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardLayout;
