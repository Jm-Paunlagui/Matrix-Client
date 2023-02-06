import React, {Fragment, useCallback, useEffect, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ACCENT_BUTTON, DANGER_BUTTON, ICON_PLACE_SELF_CENTER, TEXT_FIELD,} from "../../assets/styles/styled-components";
import httpClient from "../../http/httpClient";
import {toast} from "react-toastify";
import {importSPKI, jwtVerify} from "jose";
import {getNameFromString, getNumberFromString, MATRIX_RSA_PUBLIC_KEY, timeFormat,} from "../../helpers/Helper";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {
  faCaretLeft,
  faCircleMinus,
  faFileCsv,
  faFlagCheckered,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Header, HeaderEmail} from "../../components/headers/Header";
import {useDropzone} from "react-dropzone";
import {LoadingAnimation} from "../../components/loading/LoadingPage";
import {Link} from "react-router-dom";
import DisclosureTogglable from "../../components/disclosure/DisclosureTogglable";
import {getCookie, isAuth, signout} from "../../helpers/Auth";
import Papa from "papaparse";
import PropTypes from "prop-types";

function SampleCSVFormat() {
  const expectedHeaders = ["evaluatee", "email", "department", "course_code"];
  const sampleData = [
    {
      evaluatee: "John Doe",
      email: "johndoe@example.com",
      department: "IT",
      course_code: "IT101",
      "Question 1": "The course content was relevant and useful.",
      "Question 2": "The course was well-organized and easy to follow.",
    },
    {
      evaluatee: "Jane Smith",
      email: "janesmith@example.com",
      department: "Marketing",
      course_code: "MKT202",
      "Question 1": "The course was engaging and interactive.",
      "Question 2": "I would recommend this course to others.",
    },
  ];

  const csvFile = Papa.unparse({
    fields: [...expectedHeaders, ...Object.keys(sampleData[0]).slice(4)],
    data: sampleData,
  });
  // Time stamp for file name
  const timeStamp = new Date().toISOString().replace(/:/g, "-");
  // Download the new CSV file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csvFile], { type: "text/csv" }));
  link.download = `sample-csv-format-${timeStamp}.csv`;
  link.click();
}

function CsvPreview({ file, rowCount = 5 }) {
  CsvPreview.propTypes = {
    file: PropTypes.any,
    rowCount: PropTypes.number,
  };
  const [data, setData] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  const [headersMatch, setHeadersMatch] = useState(false);

  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
          setNumRows(results.data.length);
          setNumCols(Object.keys(results.data[0]).length);

          // Check if first 4 headers match expected headers
          const expectedHeaders = [
            "evaluatee",
            "email",
            "department",
            "course_code",
          ];
          const firstFourHeaders = Object.keys(results.data[0]).slice(0, 4);
          if (
            JSON.stringify(firstFourHeaders) === JSON.stringify(expectedHeaders)
          ) {
            setHeadersMatch(true);
          } else {
            setHeadersMatch(false);
            // Generate new CSV file with sample data
            SampleCSVFormat();
          }
        },
      });
    }
  }, [file]);

  return (
    <>
      <div className="flex flex-wrap justify-start items-center">
        <h1 className="text-xl font-bold text-blue-500 py-2 md:mr-4">
          Preview CSV File (First 5 Rows)
        </h1>
        <div
          className={`p-4 max-w-fit rounded-lg ${
            headersMatch
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          }`}
        >
          <p className="text-sm font-medium">
            {headersMatch
              ? "Headers match expected first 4 headers"
              : "Headers do not match expected headers. A sample CSV file has been generated and downloaded to your computer. Please use this file as a reference and try again."}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {numRows} rows x {numCols} columns
      </p>
      <div className="overflow-auto overscroll-auto rounded-lg">
        <table>
          <thead>
            <tr className="bg-blue-100">
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th className="px-4 py-2 text-blue-500 truncate" key={key}>
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, rowCount).map((row, index) => (
              <tr className="bg-white" key={index}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td
                    className="px-4 py-2 text-gray-500 truncate"
                    key={cellIndex}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/**
 * @description Handles the admin prediction
 */
export default function AdminPrediction() {
  /**
   * @description decode the jwt token and return the payload
   */
  const loadProcessBy = () => {
    const token = getCookie("token");
    httpClient
      .get("/user/get_user", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        toast.info(
          `Get ready to analyze the data ${response.data.user.username}!`,
          {
            position: "bottom-center",
          },
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        // Remove cookie and token
        signout();
        window.location.href = "/login-timeout";
      });
  };

  const [previousData, setPreviousData] = useState({
    p_csv_question: "",
    p_flag_deleted: "",
    p_flag_release: "",
    p_id: "",
    p_school_semester: "",
    p_school_year: "",
  });

  const {
    p_csv_question,
    p_flag_deleted,
    p_flag_release,
    p_id,
    p_school_semester,
    p_school_year,
  } = previousData;
  const get_previous_evaluated_file = () => {
    httpClient.get("/data/get-previous-evaluated-file").then((response) => {
      setPreviousData({
        ...previousData,
        p_csv_question: response.data.p_csv_question,
        p_flag_deleted: response.data.p_flag_deleted,
        p_flag_release: response.data.p_flag_release,
        p_id: response.data.p_id,
        p_school_semester: response.data.p_school_semester,
        p_school_year: response.data.p_school_year,
      });
    });
  };

  /**
   * @description Process by state
   */
  useEffect(() => {
    if (isAuth().verified_email === "Verified"){
      get_previous_evaluated_file();
      loadProcessBy();
    }
  }, []);

  const [csv_file_to_view, setCSVFileToView] = useState();

  const [handlers, setHandlers] = useState({
    buttonDisabled: false,
    ok: false,
    errorEffect: false,
    errorMessage: "",
    textChange: "Upload File",
    okToAnS: false,
    errorEffectToAnS: false,
    errorMessageToAnS: "",
    textChangeToAnS: "Analyze Sentiment and Save",
  });

  const {
    buttonDisabled,
    ok,
    errorEffect,
    errorMessage,
    textChange,
    okToAnS,
    errorEffectToAnS,
    errorMessageToAnS,
    textChangeToAnS,
  } = handlers;

  const [timeAnalyze, setTimeAnalyze] = useState({
    overall_time: "",
    pre_formatter_time: "",
    post_formatter_time: "",
    tokenizer_time: "",
    padding_time: "",
    model_time: "",
    prediction_time: "",
    sentiment_time: "",
    adding_predictions_time: "",
    adding_to_db_time: "",
    analysis_user_time: "",
    analysis_department_time: "",
    analysis_collection_time: "",
  });

  const {
    overall_time,
    pre_formatter_time,
    post_formatter_time,
    tokenizer_time,
    padding_time,
    model_time,
    prediction_time,
    sentiment_time,
    adding_predictions_time,
    adding_to_db_time,
    analysis_user_time,
    analysis_department_time,
    analysis_collection_time,
  } = timeAnalyze;

  /**
   * @description Handles the file upload
   * @type {(function(*): void)|*}
   */
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setCSVFileToView(acceptedFiles[0]);
    setHandlers({
      ...handlers,
      errorMessage: "",
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  /**
   * @description Removes the file on call
   */
  const removeAll = () => {
    setCSVFileToView(null);
    setHandlers({
      ...handlers,
      errorMessage: "",
    });
    acceptedFiles.splice(0, acceptedFiles.length);
  };

  const [csv_columns, setCSVColumns] = useState({
    csv_file_name: "",
    csv_columns_to_pick: [],
  });

  const { csv_file_name, csv_columns_to_pick } = csv_columns;

  const [selectedColumn, setSelectedColumn] = useState({
    selected_column_for_sentence: "",
    selected_column_for_evaluatee: "",
    selected_column_for_department: "",
    selected_column_for_course_code: "",
    selected_semester: "",
  });

  const semester = [
    { name: "1st Semester", id: 1 },
    { name: "2nd Semester", id: 2 },
    { name: "3rd Semester", id: 3 },
    { name: "Summer", id: 4 },
  ];

  const { selected_column_for_sentence, selected_semester } = selectedColumn;

  const [extras, setExtras] = useState({
    csv_question: "",
    school_year: "",
  });
  const { csv_question, school_year } = extras;

  /**
   * @description For step counter in the forgot password form.
   */
  const [count, setCount] = useState(1);

  /**
   * @description Reset and clears the error messages and when selects a column.
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleSelect = (name) => (value) => {
    setSelectedColumn({
      ...selectedColumn,
      [name]: value,
    });
    setHandlers({
      ...handlers,
      errorMessageToAnS: "",
    });
    setExtras({
      ...extras,
      csv_question: "",
    });
  };

  /**
   * @description Gets the input from the user and sets the state
   */
  const handleExtras = (name) => (event) => {
    setExtras({ ...extras, [name]: event.target.value });
    setHandlers({
      ...handlers,
      errorMessageToAnS: "",
    });
  };

  /**
   * @description Handles the view of the csv file and to select the columns
   * @param event
   * @returns {Promise<void>}
   */
  const handleSubmitCSVToView = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      ok: true,
      textChange: "Uploading File...",
    });
    const formData = new FormData();
    formData.append("csv_file_to_view", csv_file_to_view);
    await httpClient
      .post("/data/view-columns", formData)
      .then(async (response) => {
        setHandlers({
          ...handlers,
          ok: false,
          showButtonToView: false,
          textChange: "Upload File",
        });
        toast.success(response.data.message);
        jwtVerify(
          response.data.token_columns,
          await importSPKI(MATRIX_RSA_PUBLIC_KEY, "RS256"),
        ).then((result) => {
          setCSVColumns({
            ...csv_columns,
            show_columns: true,
            csv_file_name: result.payload.csv_file_name,
            csv_columns_to_pick: result.payload.csv_columns,
          });
        });
        setCount(count + 1);
      })
      .catch((error) => {
        removeAll();
        setCSVColumns({
          ...csv_columns,
          show_columns: false,
          csv_file_name: "",
        });
        setHandlers({
          ...handlers,
          ok: false,
          errorEffect: true,
          errorMessage: error.response.data.message,
          textChange: "Upload File",
        }) || toast.error(error.message);
      });
  };

  /**
   * @description Resets the state back to the first step.
   * @param type
   * @returns {Promise<void>}
   */
  const handleResetWhenDone = async (type) => {
    setExtras({
      ...extras,
      csv_question: "",
      school_year: "",
    });
    setSelectedColumn({
      ...selectedColumn,
      selected_column_for_sentence: "",
      selected_semester: "",
    });
    setCSVColumns({
      ...csv_columns,
      show_columns: true,
      csv_file_name: "",
      csv_columns_to_pick: [],
    });
    setHandlers({
      ...handlers,
      textChange: "Upload File",
      okToAnS: false,
      errorEffectToAnS: false,
      errorMessageToAnS: "",
      textChangeToAnS: "Analyze Sentiment and Save",
    });
    setTimeAnalyze({
      ...timeAnalyze,
      overall_time: "",
      pre_formatter_time: "",
      post_formatter_time: "",
      tokenizer_time: "",
      padding_time: "",
      model_time: "",
      prediction_time: "",
      sentiment_time: "",
      adding_predictions_time: "",
      analysis_user_time: "",
      analysis_department_time: "",
      analysis_collection_time: "",
    });
    setCount(1);
    await httpClient
      .post("/data/delete-uploaded-csv-file", {
        file_name: csv_file_name,
      })
      .then((response) => {
        if (type === "done") {
          toast.success(response.data.message);
          get_previous_evaluated_file();
        } else if (type === "cancel") {
          toast.warning("Discard the changes");
        } else {
          toast.error("File deleted due to error.");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
    removeAll();
  };

  /**
   * @description Handles the analysis and saving of the csv file
   * @param event
   * @returns {Promise<void>}
   */
  const handleSubmitToAnalyzeAndSave = async (event) => {
    event.preventDefault();
    setHandlers({
      ...handlers,
      buttonDisabled: true,
      okToAnS: true,
      textChangeToAnS: "Processing File...",
    });
    const regex = /S\.Y\.\s\d{4}-\d{4}/;
    if (!getNumberFromString(selected_column_for_sentence)) {
      setHandlers({
        ...handlers,
        okToAnS: false,
        errorEffectToAnS: true,
        errorMessageToAnS: "Select a source header column for sentence",
        textChangeToAnS: "Analyze Sentiment and Save",
      });
    } else if (!regex.test(school_year)) {
      setHandlers({
        ...handlers,
        okToAnS: false,
        errorEffectToAnS: true,
        errorMessageToAnS: "Invalid school year format.",
        textChangeToAnS: "Analyze Sentiment and Save",
      });
    } else if (!selected_semester) {
      setHandlers({
        ...handlers,
        okToAnS: false,
        errorEffectToAnS: true,
        errorMessageToAnS: "Select a school semester",
        textChangeToAnS: "Analyze Sentiment and Save",
      });
    } else if (
      getNameFromString(selected_column_for_sentence) !== csv_question
    ) {
      setHandlers({
        ...handlers,
        okToAnS: false,
        errorEffectToAnS: true,
        errorMessageToAnS:
          "Question column does not match the selected column for sentence",
        textChangeToAnS: "Analyze Sentiment and Save",
      });
    } else {
      await httpClient
        .post("/data/analyze-save-csv", {
          file_name: csv_file_name,
          csv_question,
          school_year,
          selected_column_for_sentence: getNumberFromString(
            selected_column_for_sentence,
          ),
          selected_semester,
        })
        .then((response) => {
          toast.success(response.data.message);
          get_previous_evaluated_file();
          setHandlers({
            ...handlers,
            buttonDisabled: false,
            okToAnS: false,
            textChangeToAnS: "Analyze Sentiment and Save",
          });
          setTimeAnalyze({
            ...timeAnalyze,
            overall_time: response.data.overall_time,
            pre_formatter_time: response.data.pre_formatter_time,
            post_formatter_time: response.data.post_formatter_time,
            tokenizer_time: response.data.tokenizer_time,
            padding_time: response.data.padding_time,
            model_time: response.data.model_time,
            prediction_time: response.data.prediction_time,
            sentiment_time: response.data.sentiment_time,
            adding_predictions_time: response.data.adding_predictions_time,
            adding_to_db_time: response.data.adding_to_db_time,
            analysis_user_time: response.data.analysis_user_time,
            analysis_department_time: response.data.analysis_department_time,
            analysis_collection_time: response.data.analysis_collection_time,
          });
          setCount(count + 1);
        })
        .catch((error) => {
          setHandlers({
            ...handlers,
            okToAnS: false,
            errorEffectToAnS: true,
            errorMessageToAnS: error.response.data.message,
            textChangeToAnS: "Analyze Sentiment and Save",
          });
        });
    }
  };

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      {
        isAuth().verified_email === "Verified" ? (
            <>
              <Header
                body={
                  "Upload a CSV file to analyze and choose the column that contains the responses to analyze. The system will automatically create users but you have to manually send the credentials to them if the results are ready."
                }
                title={"Sentiment Analyzer"}
              />
              <div className="grid grid-cols-1 py-8 md:grid-cols-3 gap-y-6 md:gap-6">
                <div className="col-span-1 p-8 rounded-lg bg-blue-50 shadow col-start-2 md:col-start-auto">
                  <h1 className="mb-4 text-xl font-bold text-blue-500">
                    Right Format of CSV File to Upload
                  </h1>
                  <p className="mb-4 text-sm text-gray-500 font-medium">
                    Your CSV file should contain the following headers:{" "}
                    <b className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                      evaluatee, email, department, course code
                    </b>{" "}
                    and pick a header for the{" "}
                    <b className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                      sentence
                    </b>
                    .
                  </p>
                  <p className="mb-4 text-sm text-gray-500 font-medium">
                    <b className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                      sentence
                    </b>{" "}
                    is the header that contains the responses of the students.
                  </p>
                  <button
                    className={`mb-4 px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON} ${
                      buttonDisabled &&
                      `opacity-50 cursor-not-allowed pointer-events-none`
                    }`}
                    disabled={buttonDisabled}
                    onClick={() => {
                      SampleCSVFormat();
                    }}
                    type="button"
                  >
                    <FontAwesomeIcon
                      className={`${ICON_PLACE_SELF_CENTER}`}
                      icon={faFileCsv}
                    />
                    Download Sample CSV File
                  </button>
                  <h1 className="mb-4 text-xl font-bold text-blue-500">
                    System&#39;s First Run
                  </h1>
                  <p className="mb-4 text-sm text-gray-500 font-medium">
                    On the first run, the system will take a long time to analyze and
                    save the data. This is because the system is{" "}
                    <b className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                      automatically creates user accounts
                    </b>{" "}
                    and saves the results to there respective database based on the
                    user&#39;s full name.{" "}
                    <b className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                      but it still depends on the size of the data to analyze and save.
                    </b>
                  </p>
                  <h1 className="mb-4 text-xl font-bold text-blue-500">
                    Account Credentials
                  </h1>
                  <p className="mb-4 text-sm text-gray-500 font-medium">
                    Admin will send the credentials to the users if the results are
                    ready right through their email. You can manage these accounts in
                    the{" "}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                      <Link to={"/admin/management/users/professors"}>
                        User management
                      </Link>
                    </span>{" "}
                    page.
                  </p>
                </div>
                <div className="col-span-2 row-start-1 md:row-start-auto">
                  <div
                    className={`flex flex-col w-full bg-blue-50 rounded-lg shadow ${
                      errorEffect || errorEffectToAnS
                        ? `animate-wiggle outline outline-2`
                        : ""
                    }`}
                    onAnimationEnd={() =>
                      setHandlers({
                        ...handlers,
                        errorEffect: false,
                        errorEffectToAnS: false,
                      })
                    }
                  >
                    <div className="grid w-full h-full grid-cols-1 md:grid-cols-5">
                      <div className="flex flex-col w-full h-full col-span-5 p-8 pb-8 space-y-4">
                        {p_id === "" ? (
                          ""
                        ) : (
                          <>
                            <h1 className="text-xl font-bold text-blue-500">
                              Quick view
                            </h1>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Previously Evaluated Columns"}
                              >
                                <div className="space-y-2">
                                  <h1 className="text-gray-500 font-medium">
                                    ID - {p_id}
                                  </h1>
                                  <h1 className="text-gray-500 font-medium">
                                    Evaluated Column - {p_csv_question}
                                  </h1>
                                  <h1 className="text-gray-500 font-medium">
                                    School Year - {p_school_year} @ {p_school_semester}
                                  </h1>
                                  <h1 className="text-gray-500 font-medium">
                                    Published - {p_flag_release}
                                  </h1>
                                  <h1 className="text-gray-500 font-medium">
                                    Deleted (Temporary) - {p_flag_deleted}
                                  </h1>
                                </div>
                              </DisclosureTogglable>
                            </div>
                          </>
                        )}
                        <h1 className="text-xl font-bold text-blue-500">
                          {count === 1
                            ? "Upload CSV File"
                            : count === 2
                            ? "Header Selection"
                            : "Time elapsed"}
                        </h1>
                        <h1 className="font-medium">
                          {count === 3
                            ? `${timeFormat(overall_time)}`
                            : `Step ${count} of 2`}
                        </h1>
                        {count === 1 ? (
                          <form
                            encType={"multipart/form-data"}
                            onSubmit={handleSubmitCSVToView}
                          >
                            <div className="p-2 rounded bg-yellow-100 mb-4">
                              <h1 className="text-sm font-medium text-yellow-500">
                                <b>Note:</b> Make sure that the CSV file contains the overall data before uploading. Mismatched data from the previous analyzed CSV file will be rejected. If you want to analyze a new CSV file which contains new set of professors and departments, please archive all/previous the data first.
                              </h1>
                            </div>
                            <div className="flex flex-col space-y-4">
                              <div className="flex flex-col w-full space-y-2">
                                <div
                                  className="flex items-center justify-center w-full"
                                  {...getRootProps()}
                                >
                                  <label
                                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                                      errorEffect || errorEffectToAnS
                                        ? `animate-wiggle border-red-500`
                                        : "border-gray-300"
                                    }`}
                                    htmlFor="dropzone-file"
                                  >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <svg
                                        aria-hidden="true"
                                        className="w-10 h-10 mb-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                        />
                                      </svg>
                                      <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">
                                          Click to upload
                                        </span>{" "}
                                        or drag and drop
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        CSV files only
                                      </p>
                                    </div>
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                      <p className="text-sm text-gray-500">
                                        Drop the files here ...
                                      </p>
                                    ) : (
                                      <p className="text-sm text-gray-500 px-4">
                                        Drag &#39;n&#39; drop some files here, or click
                                        to select files
                                      </p>
                                    )}
                                    {acceptedFiles.map((file) => (
                                      <>
                                        <p
                                          className="px-4 text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500"
                                          key={file.path}
                                        >
                                          {file
                                            ? `${file.path} - ${file.size} bytes`
                                            : ""}
                                        </p>
                                      </>
                                    ))}
                                  </label>
                                </div>
                                <p
                                  className="mt-1 text-sm text-gray-500"
                                  id="file_input_help"
                                >
                                  The file must be a .csv file.
                                </p>
                              </div>
                            </div>
                            <div className="flex space-y-2 overscroll-auto overflow-auto">
                              {acceptedFiles.map((file) => (
                                <div key={file.size}>
                                  <CsvPreview file={file} />
                                </div>
                              ))}
                            </div>
                            {/* Error message */}
                            {errorMessage ? (
                              <div className="mt-2 text-sm font-semibold text-red-500">
                                {errorMessage}
                              </div>
                            ) : null}
                            <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2">
                              <div className="p-1" />
                              <button
                                className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
                                type="submit"
                              >
                                {ok ? <LoadingAnimation /> : null}
                                {textChange}
                              </button>
                            </div>
                          </form>
                        ) : count === 2 ? (
                          <form onSubmit={handleSubmitToAnalyzeAndSave}>
                            <div className="flex flex-col space-y-4">
                              <p className="text-gray-500">
                                Select the header that contains the responses to be
                                analyzed. The responses should be in the form of a
                                sentence. For example, &ldquo;I like the teacher&ldquo;.
                              </p>
                              <div className="flex flex-col w-full space-y-2">
                                <h1 className="text-base font-medium text-blue-500">
                                  File Name
                                </h1>
                                <input
                                  className={`${TEXT_FIELD} cursor-not-allowed text-gray-500 bg-white ${
                                    buttonDisabled &&
                                    `opacity-50 cursor-not-allowed pointer-events-none`
                                  }`}
                                  disabled
                                  placeholder="File Name"
                                  type="text"
                                  value={csv_file_name}
                                />
                              </div>
                              <div className="flex flex-col w-full space-y-2">
                                <Listbox
                                  disabled={buttonDisabled}
                                  name={"sentence"}
                                  onChange={handleSelect(
                                    "selected_column_for_sentence",
                                  )}
                                >
                                  <Listbox.Label className="block text-base font-medium text-blue-500">
                                    Sentence
                                  </Listbox.Label>
                                  <div className="relative mt-1">
                                    <Listbox.Button
                                      className={`${TEXT_FIELD} text-gray-500 bg-white ${
                                        buttonDisabled &&
                                        `opacity-50 cursor-not-allowed pointer-events-none`
                                      }`}
                                    >
                                      <span className="block truncate text-start">
                                        {selected_column_for_sentence
                                          ? selected_column_for_sentence
                                          : "Select a column"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          aria-hidden="true"
                                          className="h-5 w-5 text-blue-500"
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
                                      <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {csv_columns_to_pick.map((column) => (
                                          <Listbox.Option
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                  ? "bg-blue-100 text-blue-500"
                                                  : "text-gray-500"
                                              }`
                                            }
                                            key={column.id}
                                            value={`${column.id} - ${column.name}`}
                                          >
                                            {({ selected }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${
                                                    selected
                                                      ? "font-medium"
                                                      : "font-normal"
                                                  }`}
                                                >
                                                  {`${column.id} - ${column.name}`}
                                                </span>
                                                {selected ? (
                                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                                                    <CheckIcon
                                                      aria-hidden="true"
                                                      className="h-5 w-5"
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
                              <div className="flex flex-col w-full space-y-2">
                                <h1 className="text-base font-medium text-blue-500">
                                  School Year (e.g. S.Y. 2020-2021)
                                </h1>
                                <input
                                  className={`truncate ${TEXT_FIELD} text-gray-500 bg-white ${
                                    buttonDisabled &&
                                    `opacity-50 cursor-not-allowed pointer-events-none`
                                  }`}
                                  disabled={buttonDisabled}
                                  name="school_year"
                                  onChange={handleExtras("school_year")}
                                  placeholder="S.Y. 2020-2021"
                                  type="text"
                                  value={school_year}
                                />
                                <Listbox
                                  disabled={buttonDisabled}
                                  name={"semester"}
                                  onChange={handleSelect("selected_semester")}
                                >
                                  <Listbox.Label className="block text-base font-medium text-blue-500">
                                    Semester
                                  </Listbox.Label>
                                  <div className="relative mt-1">
                                    <Listbox.Button
                                      className={`${TEXT_FIELD} text-gray-500 bg-white ${
                                        buttonDisabled &&
                                        `opacity-50 cursor-not-allowed pointer-events-none`
                                      }`}
                                    >
                                      <span className="block truncate text-start">
                                        {selected_semester
                                          ? selected_semester
                                          : "Select a semester"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          aria-hidden="true"
                                          className="h-5 w-5 text-blue-500"
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
                                      <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {semester.map((sem) => (
                                          <Listbox.Option
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                  ? "bg-blue-100 text-blue-500"
                                                  : "text-gray-500"
                                              }`
                                            }
                                            key={sem.id}
                                            value={sem.name}
                                          >
                                            {({ selected }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${
                                                    selected
                                                      ? "font-medium"
                                                      : "font-normal"
                                                  }`}
                                                >
                                                  {sem.name}
                                                </span>
                                                {selected ? (
                                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                                                    <CheckIcon
                                                      aria-hidden="true"
                                                      className="h-5 w-5"
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
                              <div className="flex flex-col w-full space-y-2">
                                {selected_column_for_sentence ? (
                                  <h1 className="text-base font-medium text-blue-500">
                                    Please type {'"'}
                                    <b className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                                      {getNameFromString(selected_column_for_sentence)}
                                    </b>
                                    {'"'} to confirm.
                                  </h1>
                                ) : (
                                  <h1 className="text-base font-medium text-blue-500">
                                    Select a column for sentence.
                                  </h1>
                                )}
                                <input
                                  autoComplete={"off"}
                                  className={`truncate ${TEXT_FIELD} text-gray-700 bg-white ${
                                    buttonDisabled &&
                                    `opacity-50 cursor-not-allowed pointer-events-none`
                                  }`}
                                  disabled={buttonDisabled}
                                  name="csv_question"
                                  onChange={handleExtras("csv_question")}
                                  placeholder="Question"
                                  type="text"
                                  value={csv_question}
                                />
                              </div>
                            </div>
                            {/* Error message */}
                            {errorMessageToAnS ? (
                              <div className="mt-2 text-sm font-semibold text-red-500 bg-red-100 rounded p-2">
                                {errorMessageToAnS}
                              </div>
                            ) : null}
                            <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2 gap-2">
                              <button
                                className={`px-8 py-1 flex flex-row justify-center ${DANGER_BUTTON} ${
                                  buttonDisabled &&
                                  `opacity-50 cursor-not-allowed pointer-events-none text-gray-500`
                                }`}
                                disabled={buttonDisabled}
                                onClick={() => handleResetWhenDone("cancel")}
                                type="button"
                              >
                                <FontAwesomeIcon
                                  className={`${ICON_PLACE_SELF_CENTER}`}
                                  icon={faCircleMinus}
                                />
                                Discard
                              </button>
                              <button
                                className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON} ${
                                  buttonDisabled &&
                                  `opacity-50 cursor-not-allowed pointer-events-none`
                                }`}
                                disabled={buttonDisabled}
                                type="submit"
                              >
                                {okToAnS ? (
                                  <LoadingAnimation />
                                ) : (
                                  <FontAwesomeIcon
                                    className={`${ICON_PLACE_SELF_CENTER}`}
                                    icon={faMagnifyingGlassChart}
                                  />
                                )}
                                {textChangeToAnS}
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="flex flex-col space-y-4">
                            <p className="text-gray-500">
                              Why does it take so long? Here&#39;s why: We are using a
                              deep learning model to analyze your data. This model is a
                              neural network that is trained to understand the meaning
                              of your data. This process takes time. We are working on
                              making this process faster.
                            </p>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Removed Empty Columns and Text Preprocessing"}
                              >
                                <p className="text-gray-500">
                                  We are removing empty columns from your data. This is
                                  to make sure that the model does not get confused by
                                  empty columns in your data.
                                </p>
                                <p className="text-gray-500">
                                  We are also doing some text preprocessing which
                                  includes removing punctuations, numbers, non-ascii
                                  characters, tabs, carriage, newline, whitespace,
                                  multiple_whitespaces (also at the beginning and end of
                                  the response) ,special_characters, urls, emails, html
                                  tags.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Pass: 1
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(pre_formatter_time)}
                                    </p>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Pass: 2
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(post_formatter_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable title={"Tokenization"}>
                                <p className="text-gray-500">
                                  Neural networks utilize numbers as their inputs, so we
                                  need to convert our input text into numbers.
                                </p>
                                <p className="text-gray-500">
                                  Tokenization is the process of converting text into
                                  tokens. A token is a sequence of characters or a
                                  substring of the text. In our trained model, we used
                                  its own tokenizer to tokenize the text to avoid any
                                  mismatch in the tokens.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(tokenizer_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Padding and Truncating the Sequences"}
                              >
                                <p className="text-gray-500">
                                  We need to make sure that all the sequences are of the
                                  same length. This is because neural networks cannot
                                  process inputs of different lengths.
                                </p>
                                <p className="text-gray-500">
                                  It is required to pad the sequences with zeros to make
                                  them of the same length and truncate the sequences
                                  that are longer than the maximum length of the
                                  sequence. We have used a maximum length of 300.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(padding_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable title={"Loading the Model"}>
                                <p className="text-gray-500">
                                  Loading the model is the process of loading the
                                  trained model into the memory. This is done to make
                                  the model ready for inference.
                                </p>
                                <p className="text-gray-500">
                                  Inference is the process of predicting the output of
                                  the model. In our case, the model is predicting the
                                  meaning of the text. This process takes time because
                                  the model is large in size.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(model_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Predicting the Meaning of the Text"}
                              >
                                <p className="text-gray-500">
                                  This is the final step of the process. We are
                                  predicting the meaning of the text using the trained
                                  model.
                                </p>
                                <p className="text-gray-500">
                                  We are also using a threshold of 0.5 to filter out the
                                  predictions that are less than 0.5. This is done to
                                  make sure that the predictions are accurate.
                                </p>
                                <p className="text-gray-500">
                                  We also converted the predictions into a readable
                                  format, from -e notation to a percentage format.
                                  example of -e notation: -1.3e-01, example of
                                  percentage format: 13.00%
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Actual Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(prediction_time)}
                                    </p>
                                  </div>
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Converting to Percentage
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(sentiment_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Writing the Predictions to a CSV File"}
                              >
                                <p className="text-gray-500">
                                  We are writing the predictions to a CSV file to easily
                                  add the predictions to the database.
                                </p>
                                <p className="text-gray-500">
                                  Additionally, we are also computing the converted
                                  sentiment, removal of stop words, response length,
                                  word count, and polarity to save them in the database.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(adding_predictions_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Adding the Predictions to the Database"}
                              >
                                <p className="text-gray-500">
                                  We are adding the predictions to the database. This is
                                  done to make sure that the predictions are saved for
                                  future use. Additionally, we are also adding the
                                  converted sentiment, removal of stop words, response
                                  length, word count, and polarity to the database.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(adding_to_db_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={
                                  "User Account Automation and Analysis Computations"
                                }
                              >
                                <p className="text-gray-500">
                                  While we are processing your data, we are also
                                  creating a user account for you. This is done to make
                                  sure that you can access your predictions in the
                                  future. You can manage these accounts in the{" "}
                                  <span className="text-blue-500 font-medium">
                                    <Link to={"/admin/management/users/professors"}>
                                      User management
                                    </Link>
                                  </span>{" "}
                                  page.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(analysis_user_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Department Analysis Computations"}
                              >
                                <p className="text-gray-500">
                                  While we are processing your data, we are also
                                  computing the department analysis. This is done to
                                  make sure that you can access the department analysis
                                  in the future. You can access the department analysis
                                  in the{" "}
                                  <span className="text-blue-500 font-medium">
                                    <Link to={"/admin/management/files/data"}>
                                      File Management
                                    </Link>
                                  </span>{" "}
                                  page and choose file to view.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(analysis_department_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col w-full">
                              <DisclosureTogglable
                                title={"Collection Provider Analysis Computations"}
                              >
                                <p className="text-gray-500">
                                  This process also takes time because it compiles each
                                  professor&#39;s courses and responses into there own
                                  respective database. This is done to make sure that
                                  the professor can access their predictions in the
                                  future. You can access the collection provider
                                  analysis in the{" "}
                                  <span className="text-blue-500 font-medium">
                                    <Link to={"/admin/management/files/data"}>
                                      File Management
                                    </Link>
                                  </span>{" "}
                                  page and choose file and Professor to view.
                                </p>
                                <div className="content-end flex flex-wrap justify-start w-full gap-2">
                                  <div className="bg-white p-2 rounded-lg">
                                    <h1 className="text-base font-medium text-blue-500">
                                      Time taken
                                    </h1>
                                    <p className="text-gray-500">
                                      {timeFormat(analysis_collection_time)}
                                    </p>
                                  </div>
                                </div>
                              </DisclosureTogglable>
                            </div>
                            <div className="flex flex-col justify-end w-full mt-8 lg:flex-row lg:space-x-2 gap-2">
                              <button
                                className={`
                                px-5 py-1 pl-4 ${ACCENT_BUTTON}`}
                                onClick={() => {
                                  setCount(2);
                                  setHandlers({
                                    ...handlers,
                                    buttonDisabled: false,
                                    textChange: "Upload File",
                                    textChangeToAnS: "Analyze Sentiment and Save",
                                    errorMessageToAnS: "",
                                  });
                                }}
                                type="button"
                              >
                                <FontAwesomeIcon
                                  className={`${ICON_PLACE_SELF_CENTER}`}
                                  icon={faCaretLeft}
                                />
                                Next Header to Analyze
                              </button>
                              <button
                                className={`px-8 py-1 flex flex-row justify-center ${ACCENT_BUTTON}`}
                                onClick={() => handleResetWhenDone("done")}
                                type="button"
                              >
                                <FontAwesomeIcon
                                  className={`${ICON_PLACE_SELF_CENTER}`}
                                  icon={faFlagCheckered}
                                />
                                Finish
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
        ) : (<HeaderEmail title={"admin"} />)
      }
    </div>
  );
}
