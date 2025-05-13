import { MdOutlineArrowBack } from "react-icons/md";
import SettingsNavigation from "./settings-navigation";
import { NavLink } from "react-router";
import MainNav from "@/components/main-nav";

function LogoutSettings() {
  return (
    <>
      <MainNav />
      <div className="w-full h-full bg-gray-200 flex flex-col items-center">
        <div className="w-full h-full p-8 max-w-5xl overflow-y-auto">
          <div className="w-full h-full shadow-lg rounded-xl bg-white flex">
            {/* left navigation */}
            <SettingsNavigation />

            {/* settings view */}
            <div className="w-full h-full">
              <div className="flex-1 flex flex-col w-full h-full">
                <div className="flex gap-6 items-center mt-8 mb-4 mx-8">
                  <NavLink to={"/settings"}>
                    <button>
                      <MdOutlineArrowBack className="w-8 h-8 mt-1" />
                    </button>
                  </NavLink>
                  <h1 className="text-4xl font-extrabold">Logging out</h1>
                </div>

                <div className="w-full h-full overflow-y-auto">
                  <div className="w-full flex items-center justify-center mt-12">
                    <div className="loading w-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogoutSettings;
