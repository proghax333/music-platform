import { cls } from "@/utils/cls";
import React from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { NavLink } from "react-router";

function SettingsNavigation({ className, alwaysExpanded }) {
  const menuItems = [
    { label: "Account", link: "/settings/account" },
    { label: "Addresses", link: "/settings/addresses" },
    { label: "Activity", link: "/settings/activity" },
    { label: "Privacy", link: "/settings/privacy" },
    { label: "Security", link: "/settings/security" },
    { label: "Logout", link: "/settings/logout" },
  ];

  return (
    <div
      className={cls(
        "h-full w-full md:block md:border-r overflow-y-auto",
        !alwaysExpanded && "max-w-64 hidden",
        className
      )}
    >
      <div>
        <NavLink to={"/"}>
          <span className="block p-2">
            <div className="flex gap-2 items-center p-2">
              <button>
                <MdOutlineArrowBack className="w-4 h-4" />
              </button>
              <h1 className="text-sm text-gray-800 font-extrabold">Go Home</h1>
            </div>
          </span>
        </NavLink>
      </div>
      <div className="mt-1">
        {menuItems.map((item) => {
          return (
            <NavLink
              className="block border-b p-4 font-semibold w-full cursor-pointer"
              key={`settings-nav-${item.link}`}
              to={item.link}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SettingsNavigation;
