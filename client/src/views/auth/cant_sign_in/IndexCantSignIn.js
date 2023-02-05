import React from "react";

import BackNavigation from "../../../components/navbars/BackNavigation";
import logo from "../../../assets/img/android-chrome-192x192.png";
import { ACCENT_BUTTON } from "../../../assets/styles/styled-components";
import { Link, NavLink } from "react-router-dom";

export default function IndexCantSignIn() {
  return (
    <div className="container h-full mx-auto font-Montserrat">
      <div className="flex items-center content-center justify-center h-full">
        <div className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-5/12">
          <div
            className={`relative flex flex-col w-full min-w-0 break-words bg-blue-50 border rounded-lg shadow`}
          >
            <BackNavigation backTo={"/auth"} hasText={false} isSmall />
            <div className={"px-6 lg:px-28"}>
              <NavLink to="/">
                <div className="flex items-center justify-center py-2 text-gray-800">
                  <img alt="logo" className="w-12 h-12 -mt-12" src={logo} />
                </div>
              </NavLink>
              <div className="flex-auto mb-24 space-y-6 -mt-14">
                <div className="mb-3 text-start">
                  <h6 className="mt-16 text-lg font-bold text-blue-500 xl:text-2xl">
                    Can&#39;t sign in?
                  </h6>
                </div>
                <div className="mb-3 text-start">
                  <p className="text-gray-500">
                    There are a few reasons you might not be able to sign in.
                    Check the options below for possible solutions.
                  </p>
                </div>
                <div className="flex flex-col justify-center mt-6 space-y-6">
                  <button className={`${ACCENT_BUTTON}`} type={"button"}>
                    <Link to={"/forgot-password"}>
                      <h1 className="px-5 py-1">Forgot password?</h1>
                    </Link>
                  </button>
                  <button className={`${ACCENT_BUTTON}`} type={"button"}>
                    <Link to={"/forgot-username"}>
                      <h1 className="px-5 py-1">Forgot username?</h1>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
