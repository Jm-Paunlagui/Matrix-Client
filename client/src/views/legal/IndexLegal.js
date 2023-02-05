import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "../../components/footers/Footer";

/**
 * @description Handles about, home, insights, privacy, and terms listbox for the application
 */
export default function IndexPublic() {
  return (
    <>
      <div className={`bg-blue-50 font-Montserrat pb-8`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
