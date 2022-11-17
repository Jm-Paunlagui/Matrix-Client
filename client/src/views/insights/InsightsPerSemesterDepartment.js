import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import {
  ICON_PLACE_SELF_CENTER,
  LOADING_ANIMATION,
  PRIMARY_BUTTON,
  TEXT_FIELD,
} from "../../assets/styles/input-types-styles";
import LoadingPage from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";

/**
 * @description Handles the Insights for the department per semester
 */
export default function InsightsPerSemesterDepartment() {
  /**
   * @description The initial state of the data
   */
  const [topDepartmentPerSem, setTopDepartmentPerSem] = useState({
    loading: true,
    top_department_per_sem: [],
    school_year_to_choose: [],
    school_semester_to_choose: [],
    csv_question_to_choose: [],
    school_year: "",
    school_semester: "",
    csv_question: "",
    ok: false,
    error: false,
    errorMessage: "",
    textChange: "View Insights",
  });

  /**
   * @description The destructured data from the state
   */
  const {
    loading,
    top_department_per_sem,
    school_year_to_choose,
    school_semester_to_choose,
    csv_question_to_choose,
    school_year,
    school_semester,
    csv_question,
    ok,
    error,
    errorMessage,
    textChange,
  } = topDepartmentPerSem;

  /**
   * @description Get the top professor per a semester from the backend
   */
  const getTopEmployeePerSem = () => {
    httpClient.get(`/data/options-for-file`).then((response) => {
      console.log(response.data);
      setTopDepartmentPerSem({
        ...topDepartmentPerSem,
        loading: false,
        school_year_to_choose: response.data.school_year,
        school_semester_to_choose: response.data.school_semester,
        csv_question_to_choose: response.data.csv_question,
      });
    });
  };

  /**
   * @description Get the value of the file number from the dropdown list.
   */
  const handleSelect = (name) => (value) => {
    setTopDepartmentPerSem({
      ...topDepartmentPerSem,
      [name]: value,
      errorMessage: "",
    });
  };

  /**
   * @description Updates the file number to get the data from the backend.
   */
  useEffect(() => {
    getTopEmployeePerSem();
  }, []);

  /**
   * @description Gets the data from the backend and displays it to the page.
   * @param event
   * @returns {Promise<void>}
   */
  const handleViewFile = async (event) => {
    event.preventDefault();
    setTopDepartmentPerSem({
      ...topDepartmentPerSem,
      ok: true,
      textChange: "Loading...",
      loading: true,
    });
    await httpClient
      .post("/data/get-top-department-by-file", {
        school_year: school_year,
        school_semester: school_semester,
        csv_question: csv_question,
      })
      .then((response) => {
        console.log(response.data.top_departments);
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          top_department_per_sem: response.data.top_departments,
          title: response.data.title,
          s_y: response.data.s_y,
          ok: false,
          textChange: "View Insights",
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          error: true,
          errorMessage: error.response.data.message,
          ok: false,
          textChange: "View Insights",
        });
      });
  };

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <>
        <div className="flex flex-col items-center justify-center w-full h-40 p-4 md:h-48 lg:h-64">
          <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl lg:text-7xl">
            Sentiment of Departments
          </h1>
        </div>
        <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
          <div className="col-span-1">
            <div className=" place-content-center">
              <div className="grid w-full h-full grid-cols-1 mb-8 rounded outline outline-2 outline-gray-100">
                <div className="items-center justify-center w-full col-span-1 py-5">
                  <div className="flex flex-col items-center justify-center w-full p-4">
                    <h1 className="py-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                      {csv_question}
                    </h1>
                    <h1 className="text-sm font-medium text-gray-500">
                      @{school_year} {school_semester}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="place-content-center">
              <div
                className={`grid w-full h-full grid-cols-1 p-4 rounded outline outline-2  ${
                  error ? `animate-wiggle` : "outline-gray-100"
                }`}
                onAnimationEnd={() => {
                  setTopDepartmentPerSem({
                    ...topDepartmentPerSem,
                    error: false,
                  });
                }}
              >
                <form onSubmit={handleViewFile}>
                  <div className="flex flex-col w-full space-y-2">
                    <Listbox
                      name={"school_year"}
                      onChange={handleSelect("school_year")}
                    >
                      <Listbox.Label className="block text-base font-medium text-gray-700">
                        View by:
                      </Listbox.Label>
                      <div className="relative mt-1">
                        <Listbox.Button className={TEXT_FIELD}>
                          <span className="block truncate text-start">
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
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
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
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon
                                          aria-hidden="true"
                                          className="w-5 h-5"
                                        />
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
                    <Listbox
                      name={"school_semester"}
                      onChange={handleSelect("school_semester")}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className={TEXT_FIELD}>
                          <span className="block truncate text-start">
                            {school_semester
                              ? school_semester
                              : "Select Semester"}
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
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
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
                                        <CheckIcon
                                          aria-hidden="true"
                                          className="w-5 h-5"
                                        />
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
                    <Listbox
                      name={"csv_question"}
                      onChange={handleSelect("csv_question")}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className={TEXT_FIELD}>
                          <span className="block truncate text-start">
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
                                    active
                                      ? "bg-blue-100 text-blue-900"
                                      : "text-gray-900"
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
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                        <CheckIcon
                                          aria-hidden="true"
                                          className="w-5 h-5"
                                        />
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
                  </div>
                  {/* Error message */}
                  {errorMessage ? (
                    <div className="mt-2 text-sm font-semibold text-red-500">
                      {errorMessage}
                    </div>
                  ) : null}
                  <div className="flex flex-col justify-end w-full mt-8 lg:space-x-2">
                    <button
                      className={`px-8 py-1 flex flex-row justify-center ${PRIMARY_BUTTON}`}
                      type="submit"
                    >
                      {ok ? (
                        LOADING_ANIMATION()
                      ) : (
                        <FontAwesomeIcon
                          className={`${ICON_PLACE_SELF_CENTER}`}
                          icon={faMagnifyingGlassChart}
                          size={"lg"}
                        />
                      )}
                      {textChange}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            {loading ? (
              LoadingPage()
            ) : (
              <div className=" place-content-center">
                {top_department_per_sem.length > 0 ? (
                  <>
                    {top_department_per_sem.map((department) => (
                      <div
                        className={`flex flex-col mb-8 w-full bg-white rounded shadow
                                      ${
                                        department.id === 0
                                          ? "border-solid border-4 border-yellow-100"
                                          : department.id === 1
                                          ? "border-solid border-4 border-gray-100"
                                          : department.id === 2
                                          ? "border-solid border-4 border-orange-100"
                                          : "border-solid border-4 border-blue-100"
                                      }`}
                        key={department.id}
                      >
                        <div className="grid w-full h-full grid-cols-1 rounded">
                          <div
                            className={`col-span-1 py-5 items-center justify-center w-full
                                                 ${
                                                   department.id === 0
                                                     ? "bg-yellow-50"
                                                     : department.id === 1
                                                     ? "bg-gray-50"
                                                     : department.id === 2
                                                     ? "bg-orange-50"
                                                     : "bg-blue-50"
                                                 }`}
                          >
                            <div className="flex flex-col items-center justify-center w-full p-4">
                              <h1 className="text-5xl font-black leading-none tracking-tight text-gray-700">
                                {department.department}
                              </h1>
                            </div>
                          </div>
                          <div className="col-span-4 place-self-center">
                            <div className="grid grid-cols-3 gap-8 py-4 md:grid-cols-4 md:gap-20">
                              <div className="flex flex-col items-center justify-center w-full">
                                <div
                                  className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                    department.id === 0
                                      ? "bg-yellow-500"
                                      : department.id === 1
                                      ? "bg-gray-500"
                                      : department.id === 2
                                      ? "bg-orange-500"
                                      : "bg-blue-500"
                                  }`}
                                >
                                  <i
                                    className={`fas ${
                                      department.id === 0
                                        ? "fa-trophy"
                                        : department.id === 1
                                        ? "fa-medal"
                                        : department.id === 2
                                        ? "fa-award"
                                        : "fa-crown"
                                    }`}
                                  />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-500">
                                  {department.id + 1}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  Rank
                                </h1>
                              </div>
                              <div className="flex flex-col items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-gradient-to-br from-red-500 to-teal-500">
                                  <i className="fas fa-masks-theater" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-500">
                                  {department.overall_sentiment}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  Overall
                                </h1>
                              </div>
                              <div className="flex flex-col items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded">
                                  <i className="fas fa-face-smile-beam" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-500">
                                  {department.positive_sentiments_percentage}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  Positivity Rate
                                </h1>
                              </div>
                              <div className="flex flex-col items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-red-500 rounded">
                                  <i className="fas fa-face-frown" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-500">
                                  {department.negative_sentiments_percentage}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  Negativity Rate
                                </h1>
                              </div>
                              <div className="flex flex-col items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-violet-500">
                                  <i className="fa-regular fa-comments" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-500">
                                  {department.number_of_sentiments}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  Responses
                                </h1>
                              </div>
                              <div className="flex flex-col items-center justify-center w-full">
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-black rounded">
                                  <i className="fas fa-share-nodes" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-500">
                                  {department.share}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  Share
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-40 p-4 border-4 border-red-600 border-double rounded-lg md:h-48 lg:h-64">
                    <h1 className="py-4 mb-4 text-4xl font-extrabold leading-none tracking-tight text-left text-gray-500 md:text-5xl lg:text-7xl">
                      Select what to view
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
