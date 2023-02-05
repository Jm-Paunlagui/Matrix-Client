import AdminNavigationBar from "../../components/navbars/AdminNavigationBar";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {isAuth} from "../../helpers/Auth";
import BreadCrumb from "../../components/breadcrumb/Breadcrumb";

/**
 * @description Handles admin pages for the application
 */
export default function IndexAdmin() {
  return isAuth().role === "admin" ? (
    <>
      <AdminNavigationBar />
      <div className="font-Montserrat pb-16">
        <BreadCrumb />
        <Outlet />
      </div>
      {/*<Footer />*/}
    </>
  ) : (
    <Navigate to="/unauthorized-access" />
  );
}
