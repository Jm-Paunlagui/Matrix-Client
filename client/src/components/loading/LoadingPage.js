import React from "react";

import PropTypes from "prop-types";

/**
 * @description Circular loading animation
 */
export function LoadingAnimation({ moreClasses }) {
  LoadingAnimation.propTypes = {
    moreClasses: PropTypes.string,
  };
  return (
    <svg className={`mr-1 spinner ${moreClasses}`} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        fill="transparent"
        r="20"
        strokeWidth="5"
      />
    </svg>
  );
}

/**
 * @description Logout in the loading animation
 */
export default function LoadingPage() {
  return (
    <div className="flex items-center mx-auto w-full h-96">
      <div className="h-full mx-auto font-Montserrat">
        <div className="w-full flex items-center content-center justify-center h-full">
          <div className="flex flex-col justify-center animate-pulse">
            <div className={`px-5 py-1 pl-4 flex flex-row justify-center`}>
              {<LoadingAnimation moreClasses="text-blue-500" />}
              {/* Animated text */}
              <h6 className="text-xl font-bold text-blue-500">Getting data</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @description Skeleton loading animation
 */
export function LoadingPageSkeletonText() {
  return (
    <div className="bg-blue-50 shadow rounded-md p-4 w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-blue-300 h-10 w-10" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-blue-300 rounded" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-blue-300 rounded col-span-2" />
              <div className="h-2 bg-blue-300 rounded col-span-1" />
            </div>
            <div className="h-2 bg-blue-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @description Skeleton loading animation for images
 */
export function LoadingPageSkeletonImage() {
  return (
    <div className="bg-blue-50 shadow rounded-md p-4 w-full">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-96 bg-blue-300 rounded" />
        </div>
      </div>
    </div>
  );
}
