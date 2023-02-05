import { Outlet } from "react-router-dom";
import React from "react";

/**
 * @description Handles admin pages for the application
 */
export default function IndexEval() {
  return (
    <div className="font-Montserrat">
      <Outlet />
    </div>
  );
}
