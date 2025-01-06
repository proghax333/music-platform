import { cls } from "@/utils/cls";
import React from "react";

import * as motion from "motion/react-client";

function Toggle() {
  const [isOn, setIsOn] = React.useState(false);

  function handleClick() {
    setIsOn((value) => !value);
  }

  return (
    <div
      className={cls(
        "bg-gray-500 p-1 rounded-full w-14 cursor-pointer flex",
        isOn && "bg-green-600",
        isOn && "justify-end"
      )}
      onClick={handleClick}
    >
      <motion.div
        layout
        className={cls("w-6 h-6 rounded-full bg-white")}
        transition={{
          type: "spring",
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      ></motion.div>
    </div>
  );
}

export default Toggle;
