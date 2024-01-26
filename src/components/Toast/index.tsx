import React from "react";

const Toast = ({ id, title, message, type }: Toast) => {
  return (
    <div
      className={`fixed top-4 right-4 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white py-4 px-4 rounded-md animate-fade-in-down`}
    >
      <div className="flex flex-col gap-2 items-start justify-between">
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
