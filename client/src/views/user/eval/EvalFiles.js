import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Header, HeaderEmail} from "../../../components/headers/Header";
import httpClient from "../../../http/httpClient";
import {LoadingPageSkeletonText} from "../../../components/loading/LoadingPage";
import {SearchBar} from "../../../components/searchbar/SearchBar";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  STATUS_GREEN,
  STATUS_RED,
  STATUS_WARNING,
  WARNING_BUTTON,
} from "../../../assets/styles/styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faFileCsv,} from "@fortawesome/free-solid-svg-icons";
import {isAuth} from "../../../helpers/Auth";
import {NoData} from "../../../components/warnings/WarningMessages";
import {toast} from "react-toastify";
import {ItemsPerPage} from "../../../components/items/Items";
import {Paginator} from "../../../components/listbox/ListBox";

/**
 * @description Handles evaluation pages for the application
 */
export default function EvalFiles() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

  const fullname = isAuth().full_name;

  // Converts the fullname to UPPERCASE and replaces the space with an underscore
  const folderName = fullname.toUpperCase().replace(" ", "_");

  const [fileData, setFileData] = useState({
    loading: true,
    files_list: [],
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
    files_list,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
    per_page_limit,
  } = fileData;

  const [filteredListOfFiles, setFilteredListOfFiles] = useState(files_list);

  /**
   * @description Search bar handler for the users table
   * @param event
   */
  const handleSearchForFile = (event) => {
    const searchValue = event.target.value;
    const filteredList = files_list.filter((file) => {
      return (
        file.school_year.toLowerCase().includes(searchValue.toLowerCase()) ||
        file.school_semester
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        file.csv_question.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfFiles(filteredList);
  };

  /**
   * @description Search bar handler for the files
   */
  const handleSelect = (name) => (value) => {
    setFileData({
      ...fileData,
      [name]: value,
    });
  };

  /**
   * @description Loads the files from the backend
   * @param page
   * @param per_page
   */
  const loadFiles = (page, per_page) => {
    if(isAuth().verified_email === "Verified"){
      setFileData({
      ...fileData,
      loading: true,
    });
    httpClient
      .get(`/data/list-of-csv-files-to-view-collections/${page}/${per_page}`)
      .then((response) => {
        setFileData({
          ...fileData,
          loading: false,
          files_list: response.data.csv_files,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
        setFilteredListOfFiles(response.data.csv_files);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
    }
  };

  /**
   * @description Loads the files from the backend
   */
  useEffect(() => {
    loadFiles(page_number, per_page_limit);
  }, [page_number, per_page_limit]);

  return (
    <div className="px-6 mx-auto max-w-7xl mt-8">
      {
        isAuth().verified_email === "Verified" ? (
            <>
              <Header
                body={
                  "Files that have been uploaded and analyzed by the system. Click on the file to view the collections."
                }
                title="File Results"
              />
              <SearchBar
                customStyle="mt-8"
                name="searchValue"
                onChange={(event) => handleSearchForFile(event)}
                placeholder="Search"
                type="text"
              />
              <ItemsPerPage
                Datas={fileData}
                current_page={current_page}
                has_next={has_next}
                has_prev={has_prev}
                items={files_list}
                moreClasses={"mt-8 mb-8"}
                page_number={page_number}
                setDatas={setFileData}
                total_items={total_items}
                total_pages={total_pages}
              >
                <Paginator
                  handleSelect={handleSelect}
                  per_page={per_page}
                  per_page_limit={per_page_limit}
                />
              </ItemsPerPage>
              <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
                {loading ? (
                  <>
                    <LoadingPageSkeletonText />
                    <LoadingPageSkeletonText />
                    <LoadingPageSkeletonText />
                  </>
                ) : filteredListOfFiles.length > 0 ? (
                  filteredListOfFiles.map((file) => (
                    <div
                      className="flex flex-col hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                      key={file.id}
                    >
                      <div className="flex-1 w-full bg-blue-50 rounded-lg shadow">
                        <div className="col-span-1 w-full">
                          <div className="flex flex-row w-full p-4">
                            <h1 className="text-md font-bold leading-none text-blue-600">
                              Evaluated File ID
                            </h1>
                            <h1 className="text-md font-bold leading-none text-gray-500 ml-2">
                              {file.id}-{file.school_year}
                            </h1>
                          </div>
                        </div>
                        <hr className="w-full border-gray-300" />
                        <div className="col-span-4 text-start p-4">
                          <div className="flex flex-row w-full py-2">
                            <h1 className="text-base font-bold leading-none text-blue-500">
                              Status
                            </h1>
                          </div>
                          <div className="content-end flex flex-wrap justify-start w-full gap-2">
                            <div
                              className={`p-2 flex flex-row justify-center ${
                                file.flag_deleted ? STATUS_RED : STATUS_GREEN
                              }`}
                            >
                              <h1 className="text-sm leading-none uppercase">
                                {file.flag_deleted
                                  ? "Archived"
                                  : "Available"}
                              </h1>
                            </div>
                            <div
                              className={`p-2 flex flex-row justify-center ${
                                file.flag_release ? STATUS_GREEN : STATUS_WARNING
                              }`}
                            >
                              <h1 className="text-sm leading-none uppercase">
                                {file.flag_release ? "Published" : "Unpublished"}
                              </h1>
                            </div>
                          </div>
                          <div className="flex flex-row w-full py-2">
                            <h1 className="text-base font-bold leading-none text-blue-500">
                              Details
                            </h1>
                          </div>
                          <div className="flex flex-row items-start w-full py-2">
                            <h1 className="text-base font-medium leading-none text-gray-500">
                              School Year:
                            </h1>
                            <h1 className="ml-2 text-base leading-none text-gray-600">
                              {file.school_year}
                            </h1>
                          </div>
                          <div className="flex flex-row items-start w-full py-2">
                            <h1 className="text-base font-medium leading-none text-gray-500">
                              School Semester:
                            </h1>
                            <h1 className="ml-2 text-base leading-none text-gray-500">
                              {file.school_semester}
                            </h1>
                          </div>
                          <div className="flex flex-row items-start w-full py-2">
                            <h1 className="text-base font-medium leading-none text-gray-500">
                              Topic:
                            </h1>
                            <h1 className="ml-2 text-base leading-none text-gray-500">
                              {file.csv_question}
                            </h1>
                          </div>
                        </div>
                        {!file.flag_release ? null : isAuth().verified_email ===
                          "Verified" ? (
                          <div className="col-span-1 w-full">
                            <div className="flex flex-row w-full px-4">
                              <h1 className="text-base font-bold leading-none text-blue-500">
                                Actions
                              </h1>
                            </div>
                            <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                              <button
                                className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
                                type="button"
                              >
                                <Link to={`${file.id}/${folderName}`}>
                                  <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faFileCsv}
                                  />
                                  View
                                </Link>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="col-span-1 w-full">
                            <div className="flex flex-row w-full px-4">
                              <h1 className="text-base font-bold leading-none text-blue-500">
                                You need to verify your email to view this file
                              </h1>
                            </div>
                            <div className="p-4 content-end flex flex-wrap justify-start w-full gap-2">
                              <button
                                className={`px-2 py-1 flex flex-row justify-center ${WARNING_BUTTON}`}
                                type="button"
                              >
                                <Link to={`/user/profile/${isAuth().username}`}>
                                  <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faCircleExclamation}
                                  />
                                  Unverified Email Address
                                </Link>
                              </button>
                            </div>
                          </div>
                        )}
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
                Datas={fileData}
                current_page={current_page}
                has_next={has_next}
                has_prev={has_prev}
                items={files_list}
                page_number={page_number}
                setDatas={setFileData}
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
        ) : (<HeaderEmail title={"user"} />)
      }
    </div>
  );
}
