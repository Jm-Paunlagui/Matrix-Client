import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { TEXT_FIELD } from "../../assets/styles/styled-components";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import PropTypes, { arrayOf, shape } from "prop-types";

/**
 * @description ListBox component for the application
 * @param per_page
 * @param per_page_limit
 * @param handleSelect
 */
export function Paginator({ per_page, per_page_limit, handleSelect }) {
  Paginator.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    per_page: arrayOf(shape({})).isRequired,
    per_page_limit: PropTypes.number.isRequired,
  };
  return (
    <Listbox
      name={"per_page_limit"}
      onChange={handleSelect("per_page_limit")}
      value={per_page_limit}
    >
      <div className="relative w-1/3">
        <Listbox.Button className={`${TEXT_FIELD} bg-white`}>
          <span className="block truncate text-start text-gray-500">
            {per_page_limit}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {per_page.map((file) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                  }`
                }
                key={file.id}
                value={file.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {file.value}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

/**
 * @description ListBox component for the school year
 * @param school_year
 * @param handleSelect
 * @param school_year_to_choose
 * @param disabled
 */
export function SchoolYearList({
  school_year,
  handleSelect,
  school_year_to_choose,
  disabled,
}) {
  SchoolYearList.propTypes = {
    disabled: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    school_year: PropTypes.string.isRequired,
    school_year_to_choose: arrayOf(shape({})).isRequired,
  };
  return (
    <Listbox
      disabled={disabled}
      name={"school_year"}
      onChange={handleSelect("school_year")}
      value={school_year}
    >
      <Listbox.Label className="block text-base font-bold text-blue-500">
        School Year
      </Listbox.Label>
      <div className="relative mt-1">
        <Listbox.Button className={`${TEXT_FIELD} bg-white`}>
          <span className="block truncate text-start text-gray-500">
            {school_year ? school_year : "Select School Year"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {school_year_to_choose.map((file) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                  }`
                }
                key={file.id}
                value={file.school_year}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {file.school_year}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

/**
 * @description ListBox component for the school semester
 * @param school_semester
 * @param handleSelect
 * @param school_semester_to_choose
 * @param disabled
 */
export function SemesterList({
  school_semester,
  handleSelect,
  school_semester_to_choose,
  disabled,
}) {
  SemesterList.propTypes = {
    disabled: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    school_semester: PropTypes.string.isRequired,
    school_semester_to_choose: arrayOf(shape({})).isRequired,
  };
  return (
    <Listbox
      disabled={disabled}
      name={"school_semester"}
      onChange={handleSelect("school_semester")}
      value={school_semester}
    >
      <Listbox.Label className="block text-base font-bold text-blue-500">
        Semester
      </Listbox.Label>
      <div className="relative mt-1">
        <Listbox.Button className={`${TEXT_FIELD} bg-white`}>
          <span className="block truncate text-start text-gray-500">
            {school_semester ? school_semester : "Select Semester"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {school_semester_to_choose.map((file) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                  }`
                }
                key={file.id}
                value={file.school_semester}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {file.school_semester}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

/**
 * @description This is the component for the list of the CSV Files
 */
export function CsvQuestion({
  csv_question,
  handleSelect,
  csv_question_to_choose,
  disabled,
}) {
  CsvQuestion.propTypes = {
    disabled: PropTypes.bool.isRequired,
    handleSelect: PropTypes.func.isRequired,
    csv_question: PropTypes.string.isRequired,
    csv_question_to_choose: arrayOf(shape({})).isRequired,
  };
  return (
    <Listbox
      disabled={disabled}
      name={"csv_question"}
      onChange={handleSelect("csv_question")}
      value={csv_question}
    >
      <Listbox.Label className="block text-base font-bold text-blue-500">
        Topic
      </Listbox.Label>
      <div className="relative mt-1">
        <Listbox.Button className={`${TEXT_FIELD} bg-white`}>
          <span className="block truncate text-start text-gray-500">
            {csv_question ? csv_question : "Select Topic"}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {csv_question_to_choose.map((file) => (
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-blue-100 text-blue-500" : "text-gray-500"
                  }`
                }
                key={file.id}
                value={file.csv_question}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {file.csv_question}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                        <CheckIcon aria-hidden="true" className="w-5 h-5" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
