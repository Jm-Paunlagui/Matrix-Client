import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";

/**
 * @description For no data found
 * @param type
 * @constructor
 */
export function NoData({ message }) {
  NoData.propTypes = {
    message: PropTypes.string,
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-4 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500">
      <div className="grid w-full grid-cols-1 rounded">
        <div className="col-span-1 w-full">
          <div className="flex flex-row w-full p-4 justify-center items-center">
            <FontAwesomeIcon
              className="text-white text-4xl"
              icon={faExclamationCircle}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-row justify-center w-full p-4">
            <h1 className="text-4xl font-extrabold text-center text-white md:text-5xl lg:text-5xl">
              {message}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
