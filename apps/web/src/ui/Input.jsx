import { cls } from "@/utils/cls";
import React from "react";

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cls("p-2 border border-base-300 rounded-md", className)}
      {...props}
    />
  );
});

export default Input;
