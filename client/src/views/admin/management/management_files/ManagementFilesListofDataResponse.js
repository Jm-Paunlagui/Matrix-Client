import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
} from "../../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../../http/httpClient";
import { LoadingPageSkeletonText } from "../../../../components/loading/LoadingPage";
import { toReadableName } from "../../../../helpers/Helper";
import Buttons from "../../../../components/buttons/buttons";
import { Header, HeaderEmail } from "../../../../components/headers/Header";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import { NoData } from "../../../../components/warnings/WarningMessages";
import { toast } from "react-toastify";
import { ItemsPerPage } from "../../../../components/items/Items";
import { Paginator } from "../../../../components/listbox/ListBox";
import { isAuth } from "../../../../helpers/Auth";

/**
 * @description Lists the courses to read each course's data
 */
export default function ManagementFilesListofDataResponse() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];
  const { fileId, read_responses } = useParams();

  const [listOfTaughtCourses, setListOfTaughtCourses] = useState({
    loading: true,
    file_list: [],
    topic: "",
    school_year: "",
    school_semester: "",
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
    file_list,
    topic,
    school_year,
    school_semester,
    current_page,
    has_next,
    has_prev,
    page_number,
    per_page_limit,
    total_pages,
    total_items,
  } = listOfTaughtCourses;

  const [filteredListOfTaughtCourses, setFilteredListOfTaughtCourses] =
    useState(file_list);

  /**
   * @description Search bar handler for the files
   */
  const handleSelect = (name) => (value) => {
    setListOfTaughtCourses({
      ...listOfTaughtCourses,
      [name]: value,
    });
  };

  /**
   * @description Loads the list of taught courses
   * @param fileId
   * @param read_responses
   * @param page
   * @param per_page
   * @returns {void}
   */
  const loadListOfTaughtCourses = (fileId, read_responses, page, per_page) => {
    if (isAuth().verified_email === "Verified") {
      httpClient
        .get(
          `/data/get-list-of-taught-courses/${fileId}/${read_responses}/${page}/${per_page}`,
        )
        .then((response) => {
          setListOfTaughtCourses({
            ...listOfTaughtCourses,
            loading: false,
            file_list: response.data.file_list,
            topic: response.data.topic,
            school_year: response.data.school_year,
            school_semester: response.data.school_semester,
            current_page: response.data.current_page,
            has_next: response.data.has_next,
            has_prev: response.data.has_prev,
            total_items: response.data.total_items,
            total_pages: response.data.total_pages,
          });
          setFilteredListOfTaughtCourses(response.data.file_list);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          window.location.href = "/login-timeout";
        });
    }
  };

  /**
   * @description Filters the list of taught courses
   * @param event
   */
  const handleSearchForCourse = (event) => {
    const searchValue = event.target.value;
    const filteredList = file_list.filter((course) => {
      return (
        course.file_title.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.file_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredListOfTaughtCourses(filteredList);
  };

  useEffect(() => {
    loadListOfTaughtCourses(
      fileId,
      read_responses,
      page_number,
      per_page_limit,
    );
  }, [fileId, read_responses, page_number, per_page_limit]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <Buttons text="Back" to={`/admin/management/files/data/${fileId}`} />
      {isAuth().verified_email === "Verified" ? (
        <>
          <Header
            body={`Sentiment Analysis Evaluation Results for the School Year ${school_year} and School Semester ${school_semester}`}
            title={`${topic}`}
          />
          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForCourse(event)}
            placeholder="Search"
            type="text"
          />
          <ItemsPerPage
            Datas={listOfTaughtCourses}
            current_page={current_page}
            has_next={has_next}
            has_prev={has_prev}
            items={file_list}
            moreClasses={"mt-8 mb-8"}
            page_number={page_number}
            setDatas={setListOfTaughtCourses}
            total_items={total_items}
            total_pages={total_pages}
          >
            <Paginator
              handleSelect={handleSelect}
              per_page={per_page}
              per_page_limit={per_page_limit}
            />
          </ItemsPerPage>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-6">
            {loading ? (
              <>
                <LoadingPageSkeletonText />
                <LoadingPageSkeletonText />
                <LoadingPageSkeletonText />
                <LoadingPageSkeletonText />
              </>
            ) : filteredListOfTaughtCourses.length > 0 ? (
              filteredListOfTaughtCourses.map((file) => (
                <div
                  className="flex flex-col hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                  key={file.id}
                >
                  <div className="flex-1 w-full bg-blue-50 rounded-lg shadow">
                    <div className="col-span-1 w-full">
                      <div className="flex flex-row w-full p-4">
                        <h1 className="text-md font-bold leading-none text-blue-600">
                          Course Code
                        </h1>
                        <h1 className="text-md font-bold leading-none text-gray-600 ml-2">
                          {file.file_title}
                        </h1>
                      </div>
                    </div>
                    <hr className="w-full border-gray-300" />
                    <div className="col-span-4 text-start p-4">
                      <div className="flex flex-row w-full py-2">
                        <h1 className="text-base font-bold leading-none text-blue-600">
                          Details
                        </h1>
                      </div>
                      <div className="flex flex-row items-start w-full py-2">
                        <h1 className="text-base font-medium leading-none text-gray-600">
                          No. Responses:
                        </h1>
                        <h1 className="ml-2 text-base leading-none text-gray-600">
                          {file.number_of_responses}
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
                          <Link to={`${file.file_name}`}>
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faFileCsv}
                            />
                            Read {toReadableName(file.file_title)}
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
        </>
      ) : (
        <HeaderEmail title={"admin"} />
      )}
    </div>
  );
}
