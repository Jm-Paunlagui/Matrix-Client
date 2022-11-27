import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { isAuth } from "../../../helpers/Auth";

/**
 * @description Handles admin pages for the application
 */
export default function IndexManagementFiles() {
  return isAuth().role === "admin" ? (
    <div className="mt-16 font-Montserrat">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/unauthorized-access" />
  );
}
