import React, { useState, useEffect } from "react";
import {
    ACCENT_BUTTON,
    ICON_PLACE_SELF_CENTER,
} from "../../../../assets/styles/styled-components";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFileCsv} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../../http/httpClient";
import { LoadingPageSkeletonText } from "../../../../components/loading/LoadingPage";
import { removeComma } from "../../../../helpers/Helper";
import { toast } from "react-toastify";
import Buttons from "../../../../components/buttons/buttons";
import {Header, HeaderEmail} from "../../../../components/headers/Header";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import { NoData } from "../../../../components/warnings/WarningMessages";
import { Paginator } from "../../../../components/listbox/ListBox";
import { ItemsPerPage } from "../../../../components/items/Items";
import {isAuth} from "../../../../helpers/Auth";

/**
 * @description Handles the lists data of the file department and professor
 */
export default function ManagementFilesData() {
  /**
   * @description Gets the file id from the url to load the data
   * @type {string}
   */
  const fileId = useParams().fileId;

  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

  const [fileInfo, setFileInfo] = useState({
    loading: true,
    data_departments: [],
    data_professors: [],
    current_page: "",
    has_next: false,
    has_prev: true,
    page_number: 1,
    total_items: "",
    total_pages: "",
    per_page_limit: per_page[0].value,
  });

  const {
    loading,
    data_departments,
    data_professors,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
    per_page_limit,
  } = fileInfo;

  const [filteredProfessors, setFilteredProfessors] = useState(data_professors);
  const [filteredDepartments, setFilteredDepartments] =
    useState(data_departments);
  /**
   * @description Pagination handler for the users table
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleSelect = (name) => (value) => {
    setFileInfo({ ...fileInfo, [name]: value, page_number: 1 });
  };
  /**
   * @description Loads the data from the backend
   * @param fileId
   * @param page
   * @param per_page_limit
   */
  const loadAll = (fileId, page, per_page_limit) => {
    if (isAuth().verified_email === "Verified"){
      httpClient
      .get(`/data/view-csv-file/${fileId}/${page}/${per_page_limit}`)
      .then((response) => {
        setFileInfo({
          ...fileInfo,
          loading: false,
          data_departments: response.data.department_file,
          data_professors: response.data.professor_file,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
        setFilteredProfessors(response.data.professor_file);
        setFilteredDepartments(response.data.department_file);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
    }
  };

  /**
   * @description Filters the professors by the search input
   * @param event
   */
  const handleSearchForProfessor = (event) => {
    const value = event.target.value.toLowerCase();
    const result = data_professors.filter((data) => {
      return data.evaluatee_list.toLowerCase().search(value) !== -1;
    });
    setFilteredProfessors(result);
  };

  /**
   * @description Filters the departments by the search input
   * @param event
   */
  const handleSearchForDepartment = (event) => {
    const value = event.target.value.toLowerCase();
    const result = data_departments.filter((data) => {
      return data.department_list.toLowerCase().search(value) !== -1;
    });
    setFilteredDepartments(result);
  };

  useEffect(() => {
    setFileInfo({ ...fileInfo, loading: true });
    loadAll(fileId, page_number, per_page_limit);
  }, [fileId, page_number, per_page_limit]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <Buttons text="Back" to="/admin/management/files/data" />
        {
            isAuth().verified_email === "Verified" ? (
                <>
                  <Header
                    body={"List of departments that detected in the uploaded file."}
                    title={"Department Data"}
                  />
                  <SearchBar
                    customStyle="mt-8"
                    name="searchValue"
                    onChange={(event) => handleSearchForDepartment(event)}
                    placeholder="Search"
                    type="text"
                  />
                  <div className="grid grid-cols-1 py-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
                    {loading ? (
                      <>
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                      </>
                    ) : filteredDepartments.length > 0 ? (
                      filteredDepartments.map((department) => (
                        <div
                          className="hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                          key={department.id}
                        >
                          <div className="flex flex-col w-full bg-blue-50 rounded-lg shadow">
                            <div className="col-span-1 w-full">
                              <div className="flex flex-row w-full p-4">
                                <h1 className="text-md font-bold leading-none text-blue-500">
                                  Department:
                                </h1>
                                <h1 className="text-md font-bold leading-none text-gray-500 ml-2">
                                  {department.name}
                                </h1>
                              </div>
                            </div>
                            <hr className="w-full border-gray-300" />
                            <div className="col-span-4 text-start p-4">
                              <div className="flex flex-row w-full py-2">
                                <h1 className="text-base font-bold leading-none text-blue-500">
                                  Details
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  No. of Professors:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {department.department}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  No. of Courses:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {department.department_evaluatee_course_code}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  No. of Responses:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {department.number_of_sentiments}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Negative Score:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {department.negative_sentiments_percentage}%
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Positive Score:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {department.positive_sentiments_percentage}%
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Share of Voice:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {department.share}%
                                </h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={"col-span-4"}>
                        <NoData message="Data Unavailable" />
                      </div>
                    )}
                  </div>
                  <Header
                    body={"List of Professors that detected in the uploaded file."}
                    title={"Professor Data"}
                  />
                  <SearchBar
                    customStyle="mt-8"
                    name="searchValue"
                    onChange={(event) => handleSearchForProfessor(event)}
                    placeholder="Search"
                    type="text"
                  />

                  <ItemsPerPage
                    Datas={fileInfo}
                    current_page={current_page}
                    has_next={has_next}
                    has_prev={has_prev}
                    items={data_professors}
                    moreClasses={"mt-8 mb-8"}
                    page_number={page_number}
                    setDatas={setFileInfo}
                    total_items={total_items}
                    total_pages={total_pages}
                  >
                    <Paginator
                      handleSelect={handleSelect}
                      per_page={per_page}
                      per_page_limit={per_page_limit}
                    />
                  </ItemsPerPage>
                  <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
                    {loading ? (
                      <>
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                        <LoadingPageSkeletonText />
                      </>
                    ) : filteredProfessors.length > 0 ? (
                      filteredProfessors.map((professor) => (
                        <div
                          className="flex flex-col hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                          key={professor.id}
                        >
                          <div className="flex-1 w-full bg-blue-50 rounded-lg shadow">
                            <div className="col-span-1 w-full">
                              <div className="flex flex-row w-full p-4">
                                <h1 className="text-md font-bold leading-none text-blue-500">
                                  Professor:
                                </h1>
                                <h1 className="text-md font-bold leading-none text-gray-500 ml-2">
                                  {professor.name}
                                </h1>
                              </div>
                            </div>
                            <hr className="w-full border-gray-300" />
                            <div className="col-span-4 text-start p-4">
                              <div className="flex flex-row w-full py-2">
                                <h1 className="text-base font-bold leading-none text-blue-500">
                                  Details
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  From:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {professor.department}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  No. of Responses:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {professor.number_of_sentiments}
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Negative Score:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {professor.negative_sentiments_percentage}%
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Positive Score:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {professor.positive_sentiments_percentage}%
                                </h1>
                              </div>
                              <div className="flex flex-row items-start w-full py-2">
                                <h1 className="text-base font-medium leading-none text-gray-500">
                                  Share of Voice:
                                </h1>
                                <h1 className="ml-2 text-base leading-none text-gray-500">
                                  {professor.share}%
                                </h1>
                              </div>
                            </div>
                            <div className="col-span-1 w-full">
                              <div className="flex flex-row w-full px-4">
                                <h1 className="text-base font-bold leading-none text-blue-600">
                                  Actions
                                </h1>
                              </div>
                              <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                                <button
                                  className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                                  type="button"
                                >
                                  <Link to={`${removeComma(professor.name)}`}>
                                    <FontAwesomeIcon
                                      className={`${ICON_PLACE_SELF_CENTER}`}
                                      icon={faFileCsv}
                                    />
                                    Read each response
                                  </Link>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={"col-span-full"}>
                        <NoData message="Data Unavailable" />
                      </div>
                    )}
                  </div>
                  <ItemsPerPage
                    Datas={fileInfo}
                    current_page={current_page}
                    has_next={has_next}
                    has_prev={has_prev}
                    items={data_professors}
                    page_number={page_number}
                    setDatas={setFileInfo}
                    total_items={total_items}
                    total_pages={total_pages}
                  >
                    <Paginator
                      handleSelect={handleSelect}
                      per_page={per_page}
                      per_page_limit={per_page_limit}
                    />
                  </ItemsPerPage>
                </>
            ) : (
                <HeaderEmail title={"admin"} />
            )
        }
    </div>
  );
}
