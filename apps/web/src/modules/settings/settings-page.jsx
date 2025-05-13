import { MdOutlineArrowBack } from "react-icons/md";
import SettingsNavigation from "./settings-navigation";
import MainNav from "@/components/main-nav";

function Settings() {
  return (
    <>
      <MainNav />
      <div className="w-full h-full bg-gray-200 flex flex-col items-center">
        <div className="w-full h-full p-8 max-w-5xl overflow-y-auto">
          <div className="w-full h-full shadow-lg rounded-xl bg-white flex">
            {/* left navigation */}
            <SettingsNavigation alwaysExpanded={true} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
