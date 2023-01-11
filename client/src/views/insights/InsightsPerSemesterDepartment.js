import React, { useEffect, useState } from "react";
import {
  LoadingAnimation,
  LoadingPageSkeletonText,
} from "../../components/loading/LoadingPage";
import httpClient from "../../http/httpClient";
import { Header } from "../../components/headers/Header";
import { SearchBar } from "../../components/searchbar/SearchBar";
import { NoData } from "../../components/warnings/WarningMessages";
import {
  CsvQuestion,
  SchoolYearList,
  SemesterList,
} from "../../components/listbox/ListBox";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
} from "../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import {isAuth} from "../../helpers/Auth";

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

  const [filteredTopDepartmentPerSem, setFilteredTopDepartmentPerSem] =
    useState(top_department_per_sem);

  /**
   * @description Get the top professor per a semester from the backend
   */
  const getTopEmployeePerSem = () => {
    httpClient.get(`/data/options-for-file`).then((response) => {
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
   * @description Gets the data from the backend and displays it to the listbox.
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
        school_year,
        school_semester,
        csv_question,
      })
      .then((response) => {
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          top_department_per_sem: response.data.top_department,
          title: response.data.title,
          s_y: response.data.s_y,
          ok: false,
          textChange: "View Insights",
        });
        setFilteredTopDepartmentPerSem(response.data.top_department);
      })
      .catch((error) => {
        setTopDepartmentPerSem({
          ...topDepartmentPerSem,
          error: true,
          errorMessage: error.response.data.message,
          ok: false,
          textChange: "View Insights",
        });
      });
  };

  /**
   * @description Handles the search bar value and filters the data
   * @param event
   */
  const handleSearchForDepartment = (event) => {
    const value = event.target.value.toLowerCase();
    const result = top_department_per_sem.filter((data) => {
      return data.department.toLowerCase().search(value) !== -1;
    });
    setFilteredTopDepartmentPerSem(result);
  };

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8 pb-8">
      <Header
        body={"Insights for the department per semester"}
        title="Top Department Per Semester"
      />
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="col-span-1">
          <SearchBar
            customStyle="mb-8"
            name="searchValue"
            onChange={(event) => handleSearchForDepartment(event)}
            placeholder="Search"
            type="text"
          />
          <div className="place-content-center">
            <div
              className={`grid w-full h-full grid-cols-1 p-4 bg-blue-50 rounded-lg outline outline-2 shadow mb-8 ${
                error ? `animate-wiggle` : "outline-gray-100"
              }`}
              onAnimationEnd={() => {
                setTopDepartmentPerSem({
                  ...topDepartmentPerSem,
                  error: false,
                });
              }}
            >
              <form
                className={`${loading ? "animate-pulse" : ""}`}
                onSubmit={handleViewFile}
              >
                <h1 className="mb-4 text-xl font-bold text-blue-500">
                  View Previous Insight
                </h1>
                <p className="mb-4 text-sm text-gray-500">
                  You can view your previous insight here by selecting a
                  specific school year, semester and the topic you want to view.
                </p>
                <div className="flex flex-col w-full space-y-2">
                  <SchoolYearList
                    disabled={loading}
                    handleSelect={handleSelect}
                    school_year={school_year}
                    school_year_to_choose={school_year_to_choose}
                  />
                  <SemesterList
                    disabled={loading}
                    handleSelect={handleSelect}
                    school_semester={school_semester}
                    school_semester_to_choose={school_semester_to_choose}
                  />
                  <CsvQuestion
                    csv_question={csv_question}
                    csv_question_to_choose={csv_question_to_choose}
                    disabled={loading}
                    handleSelect={handleSelect}
                  />
                </div>
                {/* Error message */}
                {errorMessage ? (
                  <div className="mt-2 text-sm font-semibold text-red-500">
                    {errorMessage}
                  </div>
                ) : null}
                <div className="flex flex-col justify-end w-full mt-8 lg:space-x-2">
                  <button
                    className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
                    type="submit"
                  >
                    {ok ? (
                      <LoadingAnimation />
                    ) : (
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faMagnifyingGlassChart}
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
            <div className="space-y-8">
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
            </div>
          ) : (
            <div className=" place-content-center space-y-8">
              {filteredTopDepartmentPerSem.length > 0 || false ? (
                <>
                  {filteredTopDepartmentPerSem.map((department) => (
                    <div
                      className={`flex flex-col w-full bg-white rounded-lg shadow`}
                      key={department.id}
                    >
                      <div className="grid w-full h-full grid-cols-1">
                        <div
                          className={`col-span-1 py-5 items-center justify-center w-full rounded-t-lg
                                                 ${
                                                   department.id === 0
                                                     ? "bg-yellow-50"
                                                     : department.id === 1
                                                     ? "bg-gray-50"
                                                     : department.id === 2
                                                     ? "bg-orange-50"
                                                     : "bg-cyan-50"
                                                 }`}
                        >
                          <div className="flex flex-col items-center justify-center w-full p-4">
                            <h1 className="text-5xl font-black leading-none tracking-tight text-gray-500">
                              {department.name}
                            </h1>
                          </div>
                        </div>
                        <div className="col-span-4 place-self-center">
                          <div className="grid grid-cols-2 gap-8 py-4 lg:grid-cols-3 md:gap-20">
                            <div className="flex flex-col items-center justify-center w-full">
                              <div
                                className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                  department.id === 0
                                    ? "bg-yellow-500"
                                    : department.id === 1
                                    ? "bg-gray-500"
                                    : department.id === 2
                                    ? "bg-orange-500"
                                    : "bg-cyan-500"
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
                              <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-blue-500">
                                <i className="fas fa-user-tie" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {department.department}
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Professors
                              </h1>
                            </div>
                            {isAuth().role === "admin" || isAuth().role === "user" ? (
                                <>
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
                                </>
                            ) : null}
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
                <NoData message="Choose the following options to view the data" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
