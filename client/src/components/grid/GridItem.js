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
      <div className="flex-1 w-full rounded-lg">
        <h1 className="text-md font-bold text-blue-500">Response</h1>
        <h1 className="text-md font-medium text-gray-500">
          {sentiment.sentences}
        </h1>
      </div>
      <div className="text-md font-bold text-blue-500">
        <div className="flex items-center justify-start">
          <div
            className={`flex items-center justify-center w-10 h-10 text-white rounded ${
              sentiment.sentiment >= 50 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <i
              className={`fas ${
                sentiment.sentiment >= 50
                  ? "fa-face-smile-beam"
                  : "fa-face-frown"
              }`}
            />
          </div>
          <div className="flex flex-col items-start justify-center ml-4 place-items-end">
            <h1 className="py-1 pl-2 text-md font-medium leading-none tracking-tight text-left text-gray-500">
              {sentiment.sentiment}
            </h1>
            <h1 className="text-sm font-medium text-gray-500">
              Sentiment Score
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
