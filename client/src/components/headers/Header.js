import PropTypes from "prop-types";
import React from "react";
import {ICON_PLACE_SELF_CENTER, WARNING_BUTTON} from "../../assets/styles/styled-components";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {isAuth} from "../../helpers/Auth";

/**
 * @description Header for the listbox
 * @param title
 * @param body
 * @constructor
 */
export function Header({ title, body }) {
  Header.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 rounded-lg bg-blue-50 shadow">
      <div className="grid w-full grid-cols-1 rounded">
        <div className="col-span-1 w-full">
          <div className="flex flex-row w-full p-4 justify-center items-center">
            <h1 className="text-2xl font-extrabold leading-none text-left text-blue-500 md:text-5xl lg:text-7xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-row justify-center w-full p-4">
            <p className="text-base font-medium text-blue-500">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


export function HeaderEmail({ title }) {
  HeaderEmail.propTypes = {
    title: PropTypes.string,
  };
  return (
      <div className="flex flex-col items-center justify-center w-full p-4 rounded-lg bg-blue-50 shadow">
      <div className="grid w-full grid-cols-1 rounded">
        <div className="col-span-1 w-full">
          <div className="flex flex-row w-full p-4 justify-center items-center">
            <h1 className="text-2xl font-extrabold leading-none text-left text-blue-500 md:text-3xl">
              You need to verify your email to gain access.
            </h1>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-row justify-center w-full p-4">
                      <button
                        className={`px-2 py-1 flex flex-row justify-center ${WARNING_BUTTON}`}
                        type="button"
                      >
                        <Link to={`/${title}/profile/${isAuth().username}`}>
                          <FontAwesomeIcon
                            className={`${ICON_PLACE_SELF_CENTER}`}
                            icon={faCircleExclamation}
                          />
                          Unverified Email Address
                        </Link>
                      </button>
          </div>
        </div>
      </div>
    </div>
  )
}
