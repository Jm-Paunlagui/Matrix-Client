import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {toReadableName} from "../../../../helpers/Helper";
import httpClient from "../../../../http/httpClient";
import {LoadingPageSkeletonText} from "../../../../components/loading/LoadingPage";
import Buttons from "../../../../components/buttons/buttons";
import {Header, HeaderEmail} from "../../../../components/headers/Header";
import {GridItemResponse} from "../../../../components/grid/GridItem";
import {toast} from "react-toastify";
import {NoData} from "../../../../components/warnings/WarningMessages";
import {Paginator} from "../../../../components/listbox/ListBox";
import {ItemsPerPage} from "../../../../components/items/Items";
import {isAuth} from "../../../../helpers/Auth";

/**
 * @description Displays the sentiment score of the file along with the response
 */
export default function ManagementFilesReadDataResponse() {
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
  const { fileId, read_responses, file_name } = useParams();

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
    if (isAuth().verified_email === "Verified") {
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
    }
  };

  useEffect(() => {
    loadReadDataResponse(
      fileId,
      read_responses,
      file_name,
      page_number,
      per_page_limit,
    );
  }, [fileId, read_responses, file_name, page_number, per_page_limit]);

  // Count the number of Positive and Negative sentiments
  let positive = 0;
  let negative = 0;

  sentiments_list.map((sentiment) => {
    if (sentiment.sentiment >= 50) {
      positive += 1;
    } else {
      negative += 1;
    }
  });

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <Buttons
        text="Back"
        to={`/admin/management/files/data/${fileId}/${read_responses}`}
      />
      {isAuth().verified_email === "Verified" ? (
        <>
          <Header
            body={`Here is the comments for ${toReadableName(
              file_name,
            )} with a total of ${positive} positive and ${negative} negative sentiments.`}
            title={`${toReadableName(file_name)}`}
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
            <div className="grid grid-cols-1 pb-8 gap-y-6 md:gap-6">
              {loading ? (
                <>
                  <LoadingPageSkeletonText />
                  <LoadingPageSkeletonText />
                  <LoadingPageSkeletonText />
                </>
              ) : sentiments_list.length > 0 ? (
                sentiments_list.map((sentiment) => (
                  <ol
                    className={`flex flex-col py-4 px-8 rounded-lg shadow list-disc ${
                      sentiment.sentiment >= 50 ? "bg-green-50" : "bg-red-50"
                    } marker:text-blue-500`}
                    key={sentiment.id}
                  >
                    <li key={sentiment.id}>
                      <GridItemResponse
                        key={sentiment.id}
                        sentiment={sentiment}
                      />
                    </li>
                  </ol>
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
        </>
      ) : (
        <HeaderEmail title={"admin"} />
      )}
    </div>
  );
}
