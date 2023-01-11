import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import httpClient from "../../../http/httpClient";
import { LoadingPageSkeletonText } from "../../../components/loading/LoadingPage";
import { Header } from "../../../components/headers/Header";
import { toReadableName } from "../../../helpers/Helper";
import Buttons from "../../../components/buttons/buttons";
import { GridItemResponse } from "../../../components/grid/GridItem";
import { isAuth } from "../../../helpers/Auth";
import { NoData } from "../../../components/warnings/WarningMessages";
import { toast } from "react-toastify";
import { ItemsPerPage } from "../../../components/items/Items";
import { Paginator } from "../../../components/listbox/ListBox";

/**
 * @description Displays the sentiment score of the file along with the response
 */
export default function EvalReadCourseSentiment() {
  const per_page = [
    { value: 25, label: "25", id: 1 },
    { value: 50, label: "50", id: 2 },
    { value: 100, label: "100", id: 3 },
    { value: 250, label: "250", id: 4 },
    { value: 500, label: "500", id: 5 },
  ];
  /**
   * @description Gets the information from the url
   */
  const { fileId, folderName, fileName } = useParams();

  const fullname = isAuth().full_name;

  // Converts the fullname to UPPERCASE and replaces the space with an underscore
  const folderNameV = fullname.toUpperCase().replace(" ", "_");

  const [readDataResponse, setReadDataResponse] = useState({
    loading: true,
    sentiments_list: [],
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
    sentiments_list,
    current_page,
    has_next,
    has_prev,
    page_number,
    total_items,
    total_pages,
    per_page_limit,
  } = readDataResponse;
  /**
   * @description Search bar handler for the files
   */
  const handleSelect = (name) => (value) => {
    setReadDataResponse({
      ...readDataResponse,
      [name]: value,
    });
  };
  /**
   * @description Loads the sentiment score of the file along with the response
   * @param fileId
   * @param read_responses
   * @param file_name
   * @param page
   * @param per_page
   */
  const loadReadDataResponse = (
    fileId,
    read_responses,
    file_name,
    page,
    per_page,
  ) => {
    httpClient
      .get(
        `/data/read-data-response/${fileId}/${read_responses}/${file_name}/${page}/${per_page}`,
      )
      .then((response) => {
        setReadDataResponse({
          ...readDataResponse,
          loading: false,
          sentiments_list: response.data.sentiments_list,
          current_page: response.data.current_page,
          has_next: response.data.has_next,
          has_prev: response.data.has_prev,
          total_items: response.data.total_items,
          total_pages: response.data.total_pages,
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        window.location.href = "/login-timeout";
      });
  };

  useEffect(() => {
    loadReadDataResponse(
      fileId,
      folderName,
      fileName,
      page_number,
      per_page_limit,
    );
  }, [fileId, folderName, fileName, page_number, per_page_limit]);

  return folderNameV === folderName ? (
    <div className="px-6 mx-auto max-w-7xl">
      <Buttons
        text="Back"
        to={`/user/evaluation-results/files/${fileId}/${folderName}`}
      />
      <Header
        body={`Here is the data response for ${toReadableName(fileName)}`}
        title={`${toReadableName(fileName)}`}
      />
      <ItemsPerPage
        Datas={readDataResponse}
        current_page={current_page}
        has_next={has_next}
        has_prev={has_prev}
        items={sentiments_list}
        moreClasses={"mt-8 mb-8"}
        page_number={page_number}
        setDatas={setReadDataResponse}
        total_items={total_items}
        total_pages={total_pages}
      >
        <Paginator
          handleSelect={handleSelect}
          per_page={per_page}
          per_page_limit={per_page_limit}
        />
      </ItemsPerPage>
      <div className=" place-content-center space-y-8">
        <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-y-6 md:gap-6">
          {loading ? (
            <>
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
              <LoadingPageSkeletonText />
            </>
          ) : sentiments_list.length > 0 ? (
            sentiments_list.map((sentiment) => (
              <div
                className={`flex flex-col p-8 rounded-lg shadow ${
                  sentiment.sentiment >= 50 ? "bg-green-50" : "bg-red-50"
                }`}
                key={sentiment.id}
              >
                <GridItemResponse key={sentiment.id} sentiment={sentiment} />
              </div>
            ))
          ) : (
            <div className={"col-span-full"}>
              <NoData message="Data Unavailable" />
            </div>
          )}
        </div>
      </div>
      <ItemsPerPage
        Datas={readDataResponse}
        current_page={current_page}
        has_next={has_next}
        has_prev={has_prev}
        items={sentiments_list}
        page_number={page_number}
        setDatas={setReadDataResponse}
        total_items={total_items}
        total_pages={total_pages}
      >
        <Paginator
          handleSelect={handleSelect}
          per_page={per_page}
          per_page_limit={per_page_limit}
        />
      </ItemsPerPage>
    </div>
  ) : (
    <Navigate to="/unauthorized-access" />
  );
}
