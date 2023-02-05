import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { isAuth } from "../../../helpers/Auth";

/**
 * @description Handles admin pages for the application
 */
export default function IndexUserDashboard() {
  return isAuth().role === "user" ? (
    <div className="font-Montserrat">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/unauthorized-access" />
  );
}
