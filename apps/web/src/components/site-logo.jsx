import React from "react";
import { NavLink } from "react-router";

function SiteLogo() {
  return (
    <div className="cursor-pointer">
      <NavLink to="/">
        <h2
          className="
      w-[128px] h-[48px] border flex items-center justify-center font-oswald font-extrabold
      rounded-md
    "
        >
          Lyv Music
        </h2>
      </NavLink>
    </div>
  );
}

export default SiteLogo;
