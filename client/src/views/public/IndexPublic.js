import Footer from "../../components/footers/Footer";
import NavigationBar from "../../components/navbars/NavigationBar";
import { Outlet, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

/**
 * @description Handles about, home, insights, privacy, and terms listbox for the application
 */
export default function IndexPublic() {
  // Actively monitor the path of the user and display the right color for the background
  const location = useLocation();

  // Destructure the location object to get the pathname
  const { pathname } = location;

  // Javascript split method to get the first part of the pathname.
  const splitLocation = pathname.split("/");

  const [color, setColor] = useState("bg-white");

  // If the path is the home listbox, then display the home listbox background color bg-blue-50
  useEffect(() => {
    if (splitLocation[1] === "" || splitLocation[1] === "aboutus") {
      setColor("bg-blue-50");
    } else {
      setColor("bg-blue-200");
    }
  }, [splitLocation[1]]);

  return (
    <>
      <NavigationBar />
      <div className={`mt-16 ${color} font-Montserrat`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
