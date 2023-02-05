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

/**
 * @description Handles the Insights for the department per semester
 */
export default function InsightsPerSemesterEmployees() {
  /**
   * @description The initial state of the data
   */
  const [topEmployeePerSem, setTopEmployeePerSem] = useState({
    loading: true,
    top_professor_per_sem: [],
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
    top_professor_per_sem,
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
  } = topEmployeePerSem;

  const [filteredTopEmployeePerSem, setFilteredTopEmployeePerSem] = useState(
    top_professor_per_sem,
  );

  /**
   * @description Get the top professor per a semester from the backend
   */
  const getTopEmployeePerSem = () => {
    httpClient.get(`/data/options-for-file`).then((response) => {
      setTopEmployeePerSem({
        ...topEmployeePerSem,
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
    setTopEmployeePerSem({
      ...topEmployeePerSem,
      [name]: value,
      errorMessage: "",
    });
  };

  /**
   * @description Gets the data from the backend and displays it on the listbox.
   * @param event
   * @returns {Promise<void>}
   */
  const handleViewFile = async (event) => {
    event.preventDefault();
    setTopEmployeePerSem({
      ...topEmployeePerSem,
      ok: true,
      textChange: "Loading...",
      loading: true,
    });
    await httpClient
      .post("/data/get-top-professor-by-file", {
        school_year,
        school_semester,
        csv_question,
      })
      .then((response) => {
        setTopEmployeePerSem({
          ...topEmployeePerSem,
          top_professor_per_sem: response.data.top_professors,
          title: response.data.title,
          s_y: response.data.s_y,
          ok: false,
          textChange: "View Insights",
        });
        setFilteredTopEmployeePerSem(response.data.top_professors);
      })
      .catch((error) => {
        setTopEmployeePerSem({
          ...topEmployeePerSem,
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
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const result = top_professor_per_sem.filter((data) => {
      return (
        data.name.toLowerCase().search(value) !== -1 ||
        data.department.toLowerCase().search(value) !== -1
      );
    });
    setFilteredTopEmployeePerSem(result);
  };

  /**
   * @description Updates the file number to get the data from the backend.
   */
  useEffect(() => {
    getTopEmployeePerSem();
  }, []);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8 pb-8">
      <Header
        body={"Insights for Professor per semester"}
        title={"Top Professor Per Semester"}
      />
      <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
        <div className="col-span-1">
          <SearchBar
            customStyle="mb-8"
            name="searchValue"
            onChange={(event) => handleSearch(event)}
            placeholder="Search"
            type="text"
          />
          <div className="place-content-center shadow">
            <div
              className={`grid w-full h-full grid-cols-1 p-4 bg-blue-50 rounded-lg outline outline-2 shadow mb-8 ${
                error ? `animate-wiggle` : "outline-gray-100"
              }`}
              onAnimationEnd={() => {
                setTopEmployeePerSem({
                  ...topEmployeePerSem,
                  error: false,
                });
              }}
            >
              {
                <form
                  className={`${loading ? "animate-pulse" : ""}`}
                  onSubmit={handleViewFile}
                >
                  <h1 className="mb-4 text-xl font-bold text-blue-500">
                    View Previous Insight
                  </h1>
                  <p className="mb-4 text-sm text-gray-500">
                    You can view your previous insight here by selecting a
                    specific school year, semester and the topic you want to
                    view.
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
              }
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
              {filteredTopEmployeePerSem.length > 0 || false ? (
                <>
                  {filteredTopEmployeePerSem.map((professor) => (
                    <div
                      className={`flex flex-col w-full bg-white rounded-lg shadow`}
                      key={professor.id}
                    >
                      <div className="grid w-full h-full grid-cols-1">
                        <div
                          className={`col-span-1 py-5 items-center justify-center w-full rounded-t-lg
                                                 ${
                                                   professor.id === 0
                                                     ? "bg-yellow-50"
                                                     : professor.id === 1
                                                     ? "bg-gray-50"
                                                     : professor.id === 2
                                                     ? "bg-orange-50"
                                                     : "bg-cyan-50"
                                                 }`}
                        >
                          <div className="flex flex-col items-center justify-center w-full p-4">
                            <h1 className="text-5xl font-black leading-none tracking-tight text-gray-500">
                              {professor.name}
                            </h1>
                          </div>
                        </div>
                        <div className="col-span-4 place-self-center">
                          <div className="grid grid-cols-2 gap-8 py-4 lg:grid-cols-3 md:gap-20">
                            <div className="flex flex-col items-center justify-center w-full">
                              <div
                                className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                  professor.id === 0
                                    ? "bg-yellow-500"
                                    : professor.id === 1
                                    ? "bg-gray-500"
                                    : professor.id === 2
                                    ? "bg-orange-500"
                                    : "bg-cyan-500"
                                }`}
                              >
                                <i
                                  className={`fas ${
                                    professor.id === 0
                                      ? "fa-trophy"
                                      : professor.id === 1
                                      ? "fa-medal"
                                      : professor.id === 2
                                      ? "fa-award"
                                      : "fa-crown"
                                  }`}
                                />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {professor.id + 1}
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Rank
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white rounded bg-blue-500">
                                <i className="fas fa-building" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {professor.department}
                              </h1>
                              <h1 className="text-sm font-medium text-gray-500">
                                Department
                              </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                              <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded">
                                <i className="fas fa-face-smile-beam" />
                              </div>
                              <h1 className="text-2xl font-bold text-gray-500">
                                {professor.positive_sentiments_percentage}
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
                                {professor.negative_sentiments_percentage}
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
                                {professor.number_of_sentiments}
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
                                {professor.share}
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
