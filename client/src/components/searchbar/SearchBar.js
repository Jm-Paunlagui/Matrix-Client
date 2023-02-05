import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";

/**
 * @description Search bar for filtering data
 * @param placeholder
 * @param onChange
 * @param name
 * @param style
 * @constructor
 */
export function SearchBar({ placeholder, onChange, name, customStyle }) {
  SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    customStyle: PropTypes.string,
  };
  return (
    <div
      className={`flex flex-row items-center justify-between w-full px-4 py-2 bg-blue-50 rounded-lg shadow ${customStyle}`}
    >
      <div className="flex flex-row items-center w-full">
        <FontAwesomeIcon className="text-blue-500" icon={faSearch} />
        <input
          className="w-full px-2 py-1 ml-2 text-gray-500 bg-transparent outline-none "
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  );
}
