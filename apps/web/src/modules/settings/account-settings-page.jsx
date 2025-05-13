import { MdOutlineArrowBack } from "react-icons/md";
import SettingsNavigation from "./settings-navigation";
import { NavLink } from "react-router";
import MainNav from "@/components/main-nav";

function AccountSettings() {
  return (
    <>
      <MainNav />

      <div className="w-full flex-1 bg-gray-200 flex flex-col items-center">
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
                  <h1 className="text-4xl font-extrabold">Account Settings</h1>
                </div>

                <div className="w-full h-full overflow-y-auto">
                  <div className="mx-8 mt-4 space-y-1">
                    <label
                      htmlFor="name"
                      className="font-semibold text-gray-700"
                    >
                      Profile Picture
                    </label>

                    <div>
                      <img
                        src="https://placehold.co/128/128/FFF"
                        className="w-28 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="mx-8 mt-4 space-y-1">
                    <label
                      htmlFor="name"
                      className="font-semibold text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="border-2 rounded-lg p-2 w-full"
                    />
                  </div>

                  <div className="mx-8 mt-4 space-y-1">
                    <label
                      htmlFor="description"
                      className="font-semibold text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="border-2 rounded-lg p-2 w-full"
                    />
                  </div>

                  <div className="mx-8 mt-4 ml-auto w-full max-w-20 space-y-1">
                    <button className="w-full rounded-lg bg-slate-900 text-gray-50 p-2 font-semibold">
                      Save
                    </button>
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

export default AccountSettings;
