"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const toastStyle = {
  success: "bg-success",
  error: "bg-error",
  info: "bg-info",
  warning: "bg-warning",
  default: "bg-primary",
};

export default function ToastContainerProvider() {
  return (
    <ToastContainer
      toastClassName={(context) =>
        toastStyle[context?.type || "default"] +
        " relative flex p-3 mb-2 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
      }
      position="top-left"
      autoClose={3000}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme="colored"
    />
  );
}
