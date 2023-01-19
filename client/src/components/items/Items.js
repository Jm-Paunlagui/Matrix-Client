import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
} from "../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";

export function ItemsPerPage({
  current_page,
  total_pages,
  items,
  total_items,
  has_prev,
  setDatas,
  Datas,
  page_number,
  has_next,
  moreClasses,
  children,
}) {
  ItemsPerPage.propTypes = {
    current_page: PropTypes.string,
    total_pages: PropTypes.string,
    items: PropTypes.array,
    total_items: PropTypes.string,
    has_prev: PropTypes.bool,
    setDatas: PropTypes.func,
    Datas: PropTypes.shape({}),
    page_number: PropTypes.number,
    has_next: PropTypes.bool,
    moreClasses: PropTypes.string,
    children: PropTypes.node,
  };
  return items.length < 25 ? (
    <div className="mt-8" />
  ) : (
    <div
      className={`flex flex-col justify-end w-full ${moreClasses} p-4 space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0 bg-blue-50 rounded-lg shadow`}
    >
      <div className="flex flex-row items-center w-full space-x-2 justify-between md:justify-start">
        <h1 className="font-medium text-blue-500 text-start">
          Page {current_page} of {total_pages}
        </h1>
        <h1 className="text-base font-medium leading-none text-blue-500">
          Showing of {items.length} of {total_items} items
        </h1>
      </div>
      <div className="flex flex-row items-center w-full space-x-2 justify-between lg:justify-end">
        <h1 className="text-base font-medium leading-none text-blue-500">
          Items per page:
        </h1>
        {children}
      </div>
      <button
        className={`px-8 py-1 flex flex-row justify-center items-center ${ACCENT_BUTTON}
                        ${has_prev ? "" : "cursor-not-allowed opacity-50"}`}
        disabled={!has_prev}
        onClick={() => setDatas({ ...Datas, page_number: page_number - 1 })}
        type="button"
      >
        <FontAwesomeIcon
          className={`${ICON_PLACE_SELF_CENTER}`}
          icon={faCaretLeft}
        />
        Previous
      </button>
      <button
        className={`px-8 py-1 flex flex-row justify-center items-center ${ACCENT_BUTTON}
                        ${has_next ? "" : "cursor-not-allowed opacity-50"}`}
        disabled={!has_next}
        onClick={() => setDatas({ ...Datas, page_number: page_number + 1 })}
        type="button"
      >
        <FontAwesomeIcon
          className={`${ICON_PLACE_SELF_CENTER}`}
          icon={faCaretRight}
        />
        Next
      </button>
    </div>
  );
}
