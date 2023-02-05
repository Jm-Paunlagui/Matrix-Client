import { Outlet } from "react-router-dom";
import React from "react";
import { isAuth } from "../../helpers/Auth";

/**
 * @description Handles admin pages for the application
 */
export default function IndexInsights() {
  return (
    <div
      className={`font-Montserrat ${
        isAuth().role === "admin" ? "" : isAuth().role === "user" ? "" : "mt-16"
      }`}
    >
      <Outlet />
    </div>
  );
}
