import { MdAdd, MdEdit, MdOutlineArrowBack } from "react-icons/md";
import SettingsNavigation from "./settings-navigation";

function AddressItem({ data }) {
  const { address } = data;

  return (
    <div className="border rounded-lg p-2 min-h-20 flex">
      <p>{address}</p>
      <button className="mx-2">
        <MdEdit />
      </button>
    </div>
  );
}

function AddressesSettings() {
  const addresses = [
    {
      address:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      address:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      address:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];

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
                <h1 className="text-4xl font-extrabold">Addresses Settings</h1>
              </div>

              <div className="h-full overflow-y-auto">
                <div className="mx-8 mt-4">
                  <div className="flex flex-col gap-4">
                    {addresses.map((address, idx) => {
                      return <AddressItem key={idx} data={address} />;
                    })}
                  </div>
                </div>

                <div className="mx-8 mt-4 space-y-1">
                  <button className="flex gap-2 items-center rounded-lg bg-blue-900 text-gray-50 p-2 px-4 font-semibold">
                    <MdAdd className="w-5 h-5" />
                    Add New Address
                  </button>
                </div>

                <div className="mx-8 mt-4 ml-auto max-w-20 space-y-1">
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
  );
}

export default AddressesSettings;
