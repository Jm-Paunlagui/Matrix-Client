import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export const TEXT_FIELD = `w-full p-4 text-sm font-medium tracking-wider rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`;

export const DELAY_1 = "transition duration-300 ease-in-out delay-150";
export const DELAY_3 = "transition duration-300 ease-in-out delay-300";
export const DELAY_5 = "transition duration-300 ease-in-out delay-500";
export const DELAY_7 = "transition duration-300 ease-in-out delay-700";
export const DELAY_9 = "transition duration-300 ease-in-out delay-1000";
export const ICON_PLACE_SELF_CENTER = "pr-2 place-self-center";
export const ICON_PLACE_SELF_CENTER_1 = "place-self-center";

export const DEFAULT_BUTTON_TRANSITION = `${DELAY_3} border border-transparent rounded-lg`;

// px-5 py-3 pl-4 for a button
// px-5 py-3 for link
export const ACCENT_BUTTON = `font-semibold tracking-wide text-teal-600 bg-blue-100 hover:bg-teal-700 hover:text-blue-50 shadow ${DEFAULT_BUTTON_TRANSITION}`;
export const DANGER_BUTTON = `font-semibold tracking-wide text-red-600 bg-blue-100 hover:bg-red-700 hover:text-red-50 shadow ${DEFAULT_BUTTON_TRANSITION}`;
export const MAIN_BUTTON = `font-semibold tracking-wide text-blue-500 bg-blue-100 hover:bg-blue-500 hover:text-blue-50 shadow ${DEFAULT_BUTTON_TRANSITION}`;

export const STATUS_GREEN =
  "font-semibold tracking-wide text-teal-600 bg-teal-100 rounded-lg";
export const STATUS_RED =
  "font-semibold tracking-wide text-red-600 bg-red-100 rounded-lg";
export const STATUS_WARNING =
  "font-semibold tracking-wide text-yellow-600 bg-yellow-100 rounded-lg";

export const DEFAULT_BUTTON = `font-semibold tracking-wide text-white ${DEFAULT_BUTTON_TRANSITION}`;
export const CONTRAST = `font-semibold tracking-wide text-teal-600 ${DEFAULT_BUTTON_TRANSITION}`;
export const PRIMARY_BUTTON = `hover:translate-y-0.5 shadow-[0_4px_0_rgb(30,64,175)] hover:shadow-[0_2px_0px_rgb(30,64,175)] font-semibold tracking-wide text-white bg-blue-500 border-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const SECONDARY_BUTTON = `hover:translate-y-0.5 shadow-[0_4px_0_rgb(55,48,163)] hover:shadow-[0_2px_0px_rgb(55,48,163)] font-semibold tracking-wide text-white bg-indigo-500 border-2 hover:bg-white hover:text-indigo-500 hover:border-indigo-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const SUCCESS_BUTTON = `hover:translate-y-0.5 shadow-[0_4px_0_rgb(17,94,89)] hover:shadow-[0_2px_0px_rgb(17,94,89)] font-semibold tracking-wide text-white bg-teal-500 border-2 hover:bg-white hover:text-teal-500 hover:border-teal-500 ${DEFAULT_BUTTON_TRANSITION}`;
//export const DANGER_BUTTON = `hover:translate-y-0.5 shadow-[0_4px_0_rgb(153,27,27)] hover:shadow-[0_2px_0px_rgb(153,27,27)] font-semibold tracking-wide text-white bg-red-500 border-2 hover:bg-white hover:text-red-500 hover:border-red-500 ${DEFAULT_BUTTON_TRANSITION}`;
export const WARNING_BUTTON = `font-semibold tracking-wide text-yellow-600 bg-yellow-100 hover:bg-yellow-500 hover:text-yellow-50 shadow ${DEFAULT_BUTTON_TRANSITION}`;
export const INFO_BUTTON = `hover:translate-y-0.5 shadow-[0_4px_0_rgb(0,0,0)] hover:shadow-[0_2px_0px_rgb(0,0,0)] font-semibold tracking-wide text-white bg-blue-500 border-2 hover:bg-white hover:text-blue-500 hover border-blue-500 ${DEFAULT_BUTTON_TRANSITION}`;

export const PRIMARY_RADIO = `bg-white text-gray-500 outline-blue-100 cursor-pointer focus:outline-none hover:bg-blue-50 peer-checked:ring-blue-400 peer-checked:text-blue-400 peer-checked:ring-2 peer-checked:outline-transparent ${DEFAULT_BUTTON_TRANSITION}`;
export const SECONDARY_RADIO = `bg-white text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-indigo-500 peer-checked:text-blue-500 peer-checked:ring-2 peer-checked:border-transparent ${DEFAULT_BUTTON_TRANSITION}`;
export const DANGER_RADIO = `bg-white text-gray-500 outline-red-100 rounded-lg cursor-pointer focus:outline-none hover:bg-red-50 peer-checked:ring-red-500 peer-checked:text-red-500 peer-checked:ring-2 peer-checked:outline-transparent ${DEFAULT_BUTTON_TRANSITION}`;

/**
 * @description Recovery email not set
 */
export function EMAIL_NOT_SET(email_type = "") {
  return (
    <div
      className={`px-5 py-1 pl-4 flex flex-row justify-start rounded-lg cursor-default text-white bg-yellow-500`}
    >
      <FontAwesomeIcon
        className={`${ICON_PLACE_SELF_CENTER}`}
        icon={faWarning}
      />
      {email_type} email not set up yet for this account.
    </div>
  );
}
