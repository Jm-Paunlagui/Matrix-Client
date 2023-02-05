import React, { useEffect, useState } from "react";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
  STATUS_GREEN,
  STATUS_RED,
  STATUS_WARNING,
} from "../../../../assets/styles/styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxArchive,
  faDownLong,
  faFileArrowDown,
  faFileCsv,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import httpClient from "../../../../http/httpClient";
import {
  LoadingAnimation,
  LoadingPageSkeletonText,
} from "../../../../components/loading/LoadingPage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Header, HeaderEmail } from "../../../../components/headers/Header";
import { SearchBar } from "../../../../components/searchbar/SearchBar";
import { Paginator } from "../../../../components/listbox/ListBox";
import { NoData } from "../../../../components/warnings/WarningMessages";
import ModalConfirm, {
  ModalTypeOfDownload,
} from "../../../../components/modal/ModalConfirm";
import { ItemsPerPage } from "../../../../components/items/Items";
import { isAuth } from "../../../../helpers/Auth";

/**
 * @description Handles the files to view and delete
 */
export default function ManagementFilesCSV() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];

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

  const [loadingIdDownload, setLoadingIdDownload] = useState({});
  const [loadingIdPublish, setLoadingIdPublish] = useState({});
  const [loadingIdDelete, setLoadingIdDelete] = useState({});
  const [loadingIdUnpublish, setLoadingIdUnpublish] = useState({});
  const [disabledAllButtons, setDisabledAllButtons] = useState({});

  /**
   * @description Search bar handler for the files
   */
  const handleSelect = (name) => (value) => {
    setFileData({
      ...fileData,
      [name]: value,
    });
  };

  const [loadingAnimation, setLoadingAnimation] = useState({
    massDisable: false,
    massDelete: false,
    textChangeDelete: "Archive all",
    massPublish: false,
    textChangePublish: "Publish all",
    massUnpublished: false,
    textChangeUnpublished: "Unpublished all",
    massDownload: false,
    textChangeDownload: "Download all analysis",
  });

  const {
    massDisable,
    massDelete,
    textChangeDelete,
    massPublish,
    textChangePublish,
    massUnpublished,
    textChangeUnpublished,
    massDownload,
    textChangeDownload,
  } = loadingAnimation;

  // Disable all buttons if mass action is in progress
  const disableAllButtons = (bool) => {
    for (let i = 0; i < files_list.length; i++) {
      disabledAllButtons[files_list[i].id] = bool;
    }
  };

  /**
   * @description Filters the list of files based on the search value
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
   * @description Loads the files from the backend
   * @param page
   * @param per_page_limit
   */
  const loadFiles = (page, per_page_limit) => {
    // setFileData({
    //   ...fileData,
    //   loading: true,
    // });
    isAuth().verified_email === "Verified"
      ? httpClient
          .get(`/data/list-of-csv-files-to-view/${page}/${per_page_limit}`)
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
          })
      : "";
  };

  /**
   * @description Loads the files from the backend by page number and per page limit.
   */
  useEffect(() => {
    loadFiles(page_number, per_page_limit);
  }, [page_number, per_page_limit]);

  /**
   * @description Handles the delete of a file from the backend
   * @param file
   */
  const handleDelete = (file) => {
    setLoadingIdDelete((files) => ({ ...files, [file]: true }));
    setDisabledAllButtons((files) => ({ ...files, [file]: true }));
    httpClient
      .put(`/data/delete-csv-file/${file}`)
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        toast.success(response.data.message);
        setLoadingIdDelete((files) => ({ ...files, [file]: false }));
        setDisabledAllButtons((files) => ({ ...files, [file]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIdDelete({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Handles the publish of a file from the backend
   * @param file
   */
  const handlePublish = (file) => {
    setLoadingIdPublish((files) => ({ ...files, [file]: true }));
    setDisabledAllButtons((files) => ({ ...files, [file]: true }));
    httpClient
      .put(`/data/publish-selected-csv-file/${file}`)
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        toast.success(response.data.message);
        setLoadingIdPublish((files) => ({ ...files, [file]: false }));
        setDisabledAllButtons((files) => ({ ...files, [file]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIdPublish({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Handles the unpublish of a file from the backend
   * @param file
   */
  const handleUnpublished = (file) => {
    setLoadingIdUnpublish((files) => ({ ...files, [file]: true }));
    setDisabledAllButtons((files) => ({ ...files, [file]: true }));
    httpClient
      .put(`/data/unpublished-selected-csv-file/${file}`)
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        toast.success(response.data.message);
        setLoadingIdUnpublish((files) => ({ ...files, [file]: false }));
        setDisabledAllButtons((files) => ({ ...files, [file]: false }));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoadingIdUnpublish({});
        setDisabledAllButtons({});
      });
  };

  /**
   * @description Handles the mass delete of files from the backend
   */
  const handleDeleteAll = () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massDelete: true,
      textChangeDelete: "Archiving all files...",
    });
    httpClient
      .put("/data/delete-csv-file-all")
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDelete: false,
          textChangeDelete: "Archive all",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDelete: false,
          textChangeDelete: "Archive all",
        });
        toast.error(error.response.data.message);
      });
  };

  /**
   * @description Handles the mass publish of files from the backend
   */
  const handlePublishAll = () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massPublish: true,
      textChangePublish: "Publishing files...",
    });
    httpClient
      .put("/data/publish-all-csv-file")
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massPublish: false,
          textChangePublish: "Publish all",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massPublish: false,
          textChangePublish: "Publish all",
        });
        toast.error(error.response.data.message);
      });
  };

  /**
   * @description Handles the mass unpublish of files from the backend
   */
  const handleUnpublishedAll = () => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massUnpublished: true,
      textChangeUnpublished: "Unpublishing files...",
    });
    httpClient
      .put("/data/unpublished-all-csv-file")
      .then((response) => {
        loadFiles(page_number, per_page_limit);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massUnpublished: false,
          textChangeUnpublished: "Unpublished all",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massUnpublished: false,
          textChangeUnpublished: "Unpublished all",
        });
        toast.error(error.response.data.message);
      });
  };

  /**
   * @description Handles the download of a file from the backend
   * @param file
   * @param type
   */
  const handleDownload = (file, type) => {
    setLoadingIdDownload((files) => ({ ...files, [file]: true }));
    setDisabledAllButtons((files) => ({ ...files, [file]: true }));
    httpClient
      .get(`/data/download-csv-file/${file}/${type}`, { responseType: "blob" })
      .then((response) => {
        const filename =
          response.headers["content-disposition"].split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        toast.success(response.data.message);
        setLoadingIdDownload((files) => ({ ...files, [file]: false }));
        setDisabledAllButtons((files) => ({ ...files, [file]: false }));
      })
      .catch((error) => {
        toast.error(error.message);
        setLoadingIdDownload({});
        setDisabledAllButtons({});
      });
  };

  const handleDownloadAll = (type) => {
    disableAllButtons(true);
    setLoadingAnimation({
      ...loadingAnimation,
      massDisable: true,
      massDownload: true,
      textChangeDownload: "Downloading all analysis...",
    });
    httpClient
      .get(`/data/download-all-csv-file/${type}`, { responseType: "blob" })
      .then((response) => {
        const filename =
          response.headers["content-disposition"].split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        toast.success(response.data.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDownload: false,
          textChangeDownload: "Download all analysis",
        });
      })
      .catch((error) => {
        toast.error(error.message);
        disableAllButtons(false);
        setLoadingAnimation({
          ...loadingAnimation,
          massDisable: false,
          massDownload: false,
          textChangeDownload: "Download all analysis",
        });
      });
  };

  return (
    <div className="px-6 mx-auto mt-8 max-w-7xl mb-60">
      {isAuth().verified_email === "Verified" ? (
        <>
          <Header
            body={
              "View and Delete files CSV files that have been analyzed by the system."
            }
            title={"File Management"}
          />

          <SearchBar
            customStyle="mt-8"
            name="searchValue"
            onChange={(event) => handleSearchForFile(event)}
            placeholder="Search"
            type="text"
          />
          <div className="grid grid-cols-1 md:gap-6">
            <div className="w-full bg-blue-50 rounded-lg shadow-md p-4 mt-8">
              <div className="content-end flex flex-wrap justify-start w-full gap-2">
                <div className="flex flex-row w-full">
                  <h1 className="text-base font-bold leading-none text-blue-500">
                    Mass Actions
                  </h1>
                </div>
                <ModalConfirm
                  body={`Are you sure you want to publish all files?`}
                  description="This action cannot be undone. This will publish all files that have been unpublished and can now be accessed by the professors."
                  disabled={massDisable}
                  is_manny
                  onConfirm={() => handlePublishAll()}
                  title="Publish All Files"
                >
                  {massPublish ? (
                    <>
                      <LoadingAnimation moreClasses="text-teal-600" />
                      {textChangePublish}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faUpLong}
                      />
                      {textChangePublish}
                    </>
                  )}
                </ModalConfirm>
                <ModalTypeOfDownload
                  description="Choose the type of download you want to perform. File can be downloaded as a CSV or XLSX file."
                  disabled={massDisable}
                  is_manny
                  onConfirmCSV={() => handleDownloadAll("csv")}
                  onConfirmExcel={() => handleDownloadAll("excel")}
                  title="Download File"
                >
                  {massDownload ? (
                    <>
                      <LoadingAnimation moreClasses="text-teal-600" />
                      {textChangeDownload}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faFileArrowDown}
                      />
                      {textChangeDownload}
                    </>
                  )}
                </ModalTypeOfDownload>
                <ModalConfirm
                  body={`Are you sure you want to archive all files from the system?`}
                  description="This action cannot be undone. This will archive all files from the system and they will be restored if you restore all files."
                  disabled={massDisable}
                  is_danger
                  is_manny
                  onConfirm={() => handleDeleteAll()}
                  title="Archive All Files"
                >
                  {massDelete ? (
                    <>
                      <LoadingAnimation moreClasses="text-red-600" />
                      {textChangeDelete}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faBoxArchive}
                      />
                      {textChangeDelete}
                    </>
                  )}
                </ModalConfirm>
                <ModalConfirm
                  body={`Are you sure you want to unpublished all files?`}
                  description="This action cannot be undone. This will unpublished all files that have been published and can no longer be accessed by the professors."
                  disabled={massDisable}
                  is_danger
                  is_manny
                  onConfirm={() => handleUnpublishedAll()}
                  title="Unpublished All Files"
                >
                  {massUnpublished ? (
                    <>
                      <LoadingAnimation moreClasses="text-red-600" />
                      {textChangeUnpublished}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        className={`${ICON_PLACE_SELF_CENTER}`}
                        icon={faDownLong}
                      />
                      {textChangeUnpublished}
                    </>
                  )}
                </ModalConfirm>
              </div>
            </div>
          </div>
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
                              ? "Deleted Temporarily"
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
                          <Link to={`${file.id}`}>
                            <FontAwesomeIcon
                              className={`${ICON_PLACE_SELF_CENTER}`}
                              icon={faFileCsv}
                            />
                            View
                          </Link>
                        </button>
                        <ModalTypeOfDownload
                          description="Choose the type of download you want to perform. File can be downloaded as a CSV or XLSX file."
                          disabled={disabledAllButtons[file.id]}
                          id={file.id}
                          is_manny={false}
                          onConfirmCSV={handleDownload}
                          onConfirmExcel={handleDownload}
                          title="Download File"
                        >
                          {loadingIdDownload[file.id] ? (
                            <>
                              <LoadingAnimation moreClasses="text-teal-600" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faFileArrowDown}
                              />
                              Download Analysis
                            </>
                          )}
                        </ModalTypeOfDownload>
                        <ModalConfirm
                          body={`Are you sure you want to publish ${file.csv_question} with a school year of ${file.school_year} and a school semester of ${file.school_semester}?`}
                          description="This action cannot be undone. This will publish the file and its associated data to the system and can now view by the professors."
                          disabled={disabledAllButtons[file.id]}
                          id={file.id}
                          is_manny={false}
                          onConfirm={handlePublish}
                          title="Publish File"
                        >
                          {loadingIdPublish[file.id] ? (
                            <>
                              <LoadingAnimation moreClasses="text-teal-600" />
                              Publishing File...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faUpLong}
                              />
                              Publish File
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to archive ${file.csv_question} with a school year of ${file.school_year} and a school semester of ${file.school_semester}?`}
                          description="This action cannot be undone. This will archive the file and its associated data from the system and can no longer view by the professors."
                          disabled={disabledAllButtons[file.id]}
                          id={file.id}
                          is_danger
                          is_manny={false}
                          onConfirm={handleDelete}
                          title="Archive File Confirmation"
                        >
                          {loadingIdDelete[file.id] ? (
                            <>
                              <LoadingAnimation moreClasses="text-red-600" />
                              Archiving File...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faBoxArchive}
                              />
                              Archive File
                            </>
                          )}
                        </ModalConfirm>
                        <ModalConfirm
                          body={`Are you sure you want to unpublished ${file.csv_question} with a school year of ${file.school_year} and a school semester of ${file.school_semester}?`}
                          description="This action cannot be undone. This will unpublished all files that have been published and cannot be accessed by the professors."
                          disabled={disabledAllButtons[file.id]}
                          id={file.id}
                          is_danger
                          is_manny={false}
                          onConfirm={handleUnpublished}
                          title="Unpublish File"
                        >
                          {loadingIdUnpublish[file.id] ? (
                            <>
                              <LoadingAnimation moreClasses="text-red-600" />
                              Unpublishing File...
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon
                                className={`${ICON_PLACE_SELF_CENTER}`}
                                icon={faDownLong}
                              />
                              Unpublish File
                            </>
                          )}
                        </ModalConfirm>
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
      ) : (
        <HeaderEmail title={"admin"} />
      )}
    </div>
  );
}
