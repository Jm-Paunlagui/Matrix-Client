import React from "react";
import PropTypes from "prop-types";

/**
 * @description GridItem component for the application
 */
export function GridItemResponse({ sentiment }) {
  GridItemResponse.propTypes = {
    sentiment: PropTypes.string.isRequired,
  };
  return (
    <div className="justify-start">
      <div className="flex w-full rounded-lg">
        <h1 className="text-md font-medium text-gray-500">
          {sentiment.sentences}
        </h1>
      </div>
    </div>
  );
}
