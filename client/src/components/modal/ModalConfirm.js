import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, BoltIcon, DocumentArrowDownIcon,} from "@heroicons/react/24/outline";
import {
  ACCENT_BUTTON,
  DANGER_BUTTON, ICON_PLACE_SELF_CENTER,
} from "../../assets/styles/styled-components";
import PropTypes from "prop-types";
import {faFileCsv, faFileExcel} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

/**
 * @description A modal to confirm the deletion of a file
 * @param title
 * @param description
 * @param id
 * @param to_delete
 * @param onConfirm
 * @constructor
 */
export default function ModalConfirm({
  title,
  children,
  is_danger,
  description,
  body,
  id,
  onConfirm,
  is_many,
}) {
  ModalConfirm.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    is_danger: PropTypes.bool,
    description: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    onConfirm: PropTypes.func,
    is_many: PropTypes.bool,
  };

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <button
        className={`py-1 px-2 flex flex-row justify-center ${
          is_danger ? DANGER_BUTTON : ACCENT_BUTTON
        }`}
        onClick={() => setOpen(true)}
        type="button"
      >
        {children}
      </button>
      <Transition.Root as={Fragment} show={open}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {is_danger ? (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-red-600"
                          />
                        </div>
                      ) : (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                          <BoltIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-teal-600"
                          />
                        </div>
                      )}
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm text-gray-500">
                          {description}
                        </Dialog.Description>
                        <Dialog.Description className="mt-1 text-sm text-gray-500">
                          {body}
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                        is_danger
                          ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                          : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                      }`}
                      onClick={() => {
                        setOpen(false);
                        is_many ? onConfirm() : onConfirm(id);
                      }}
                      type="button"
                    >
                      {children}
                    </button>
                    <button
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export function ModalTypeOfDownload({title,
  children,
  is_danger,
  description,
  id,
  onConfirmCSV,
  onConfirmExcel,
  is_many,
}) {
  ModalTypeOfDownload.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    is_danger: PropTypes.bool,
    description: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    onConfirmCSV: PropTypes.func,
    onConfirmExcel: PropTypes.func,
    is_many: PropTypes.bool,
  };
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <button
        className={`py-1 px-2 flex flex-row justify-center ${
          is_danger ? DANGER_BUTTON : ACCENT_BUTTON
        }`}
        onClick={() => setOpen(true)}
        type="button"
      >
        {children}
      </button>
      <Transition.Root as={Fragment} show={open}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 sm:mx-0 sm:h-10 sm:w-10">
                          <DocumentArrowDownIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-teal-600"
                          />
                        </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                        <Dialog.Description className="mt-2 text-sm text-gray-500">
                          {description}
                        </Dialog.Description>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                              is_danger
                                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                            }`}
                            onClick={() => {
                              setOpen(false);
                              is_many ? onConfirmExcel("excel") : onConfirmExcel(id, "excel");
                            }}
                            type="button"
                          >
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faFileExcel}
                            />
                            Excel File
                          </button>
                          <button
                            className={`mt-3 md:mt-0 inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                              is_danger
                                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                                : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                            }`}
                            onClick={() => {
                              setOpen(false);
                              is_many ? onConfirmCSV("csv") : onConfirmCSV(id, "csv");
                            }}
                            type="button"
                          >
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faFileCsv}
                            />
                            CSV File
                          </button>
                    <button
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
    );
}
