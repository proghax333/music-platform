import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

function RootLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default RootLayout;
