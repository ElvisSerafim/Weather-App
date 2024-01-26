import React from "react";
import Toast from "../Toast";
import { useToast } from "@/contexts/ToastContext";

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className=" fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
