import { MdOutlineArrowBack } from "react-icons/md";
import SettingsNavigation from "./settings-navigation";

function SecuritySettings() {
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col items-center">
      <div className="w-full h-full p-8 max-w-5xl overflow-y-auto">
        <div className="w-full h-full shadow-lg rounded-xl bg-white flex">
          {/* left navigation */}
          <SettingsNavigation />

          {/* settings view */}
          <div className="w-full h-full">
            <div className="flex-1 flex flex-col w-full h-full">
              <div className="flex gap-6 items-center mt-8 mb-4 mx-8">
                <button>
                  <MdOutlineArrowBack className="w-8 h-8 mt-1" />
                </button>
                <h1 className="text-4xl font-extrabold">Security Settings</h1>
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
  );
}

export default SecuritySettings;
