import {NavLink} from "react-router-dom";
import React from "react";
import {ACCENT_BUTTON, ICON_PLACE_SELF_CENTER,} from "../../assets/styles/styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faSignIn} from "@fortawesome/free-solid-svg-icons";
import {signout} from "../../helpers/Auth";

/**
 * @description Unauthorized component for the application
 * for text -text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-rose-500 to-red-500
 */
export function Unauthorized() {
  signout();
  return (
    <div className="flex justify-center min-h-screen overflow-hidden text-white font-Montserrat bg-gradient-to-br from-pink-600 via-red-600 to-orange-600">
      <div className="flex flex-col items-center justify-center text-center ">
        <h1 className="text-6xl font-extrabold xl:text-9xl">401</h1>
        <p className="mb-16 text-3xl font-extrabold xl:text-6xl">
          Unauthorized Access
        </p>

        <NavLink to="/">
          <div
            className={`px-5 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
          >
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faHome}
            />
            <h1 className="text-center">Return Home</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

/**
 * @description PageNotFound component for the application
 */
export function PageNotFound() {
  return (
    <div className="flex justify-center min-h-screen overflow-hidden text-white font-Montserrat bg-gradient-to-br from-pink-600 via-red-600 to-orange-600">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold xl:text-9xl">404</h1>
        <p className="mb-16 text-3xl font-extrabold">oh no! page not found</p>

        <NavLink to="/">
          <div
            className={`px-5 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
          >
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faHome}
            />
            <h1 className="text-center">Return Home</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

/**
 * @description SessionExpired component for the application
 */
export function LoginTimeOut() {
  signout();
  return (
    <div className="flex justify-center min-h-screen overflow-hidden text-white font-Montserrat bg-gradient-to-br from-pink-600 via-red-600 to-orange-600">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold xl:text-9xl">440</h1>
        <p className="mb-16 text-3xl font-extrabold">
          oh no! Session Expired, Please Login Again
        </p>

        <NavLink to="/auth">
          <div
            className={`px-5 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
          >
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faSignIn}
            />
            <h1 className="text-center">Authenticate</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

/**
 * @description Invalid Token component for the application
 */
export function InvalidToken() {
  return (
    <div className="flex justify-center min-h-screen overflow-hidden text-white font-Montserrat bg-gradient-to-br from-pink-600 via-red-600 to-orange-600">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-extrabold xl:text-9xl">498</h1>
        <p className="mb-16 text-3xl font-extrabold">oh no! Invalid Token</p>

        <NavLink to="/">
          <div
            className={`px-5 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
          >
            <FontAwesomeIcon
              className={`${ICON_PLACE_SELF_CENTER}`}
              icon={faHome}
            />
            <h1 className="text-center">Return Home</h1>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
