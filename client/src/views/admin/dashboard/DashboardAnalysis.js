import React, {useEffect, useState} from "react";

import {LoadingPageSkeletonImage, LoadingPageSkeletonText,} from "../../../components/loading/LoadingPage";
import httpClient from "../../../http/httpClient";
import {toast} from "react-toastify";
import {Header, HeaderEmail} from "../../../components/headers/Header";
import {CsvQuestion, SchoolYearList, SemesterList,} from "../../../components/listbox/ListBox";
import DisclosureTogglable from "../../../components/disclosure/DisclosureTogglable";

import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {getCookie, isAuth} from "../../../helpers/Auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);
/**
 * @description Handles the admin profile
 */
export default function DashboardAnalysis() {
  const cookie = getCookie("token");
  const [data, setData] = useState({
    loading: true,
    details: [],
  });

  const { loading, details } = data;

  /**
   * @description Fetches the data from the server
   */
  const get_file_details = () => {
    if (isAuth().verified_email === "Verified"){
      httpClient
      .get(`/analysis/dashboard-data-csv/${cookie}`)
      .then((response) => {
        setData({
          ...data,
          loading: false,
          details: response.data.details,
        });
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized Access");
            window.location.href = "/unauthorized-access";
            break;
          case 440:
            toast.error("Session Expired");
            window.location.href = "/login-timeout";
            break;
          default:
            toast.error("Something went wrong");
            window.location.href = "/page-not-found";
        }
      });
    }
  };

  const [analysis, setAnalysis] = useState({
    loading_analysis: true,
    overall_sentiments: [],
    overall_departments: [],
    overall_sentiments_department: [],
    image_path_polarity_v_sentiment: "",
    image_path_review_length_v_sentiment: "",
    image_path_wordcloud: "",
    common_phrase: [],
    common_word: [],
    common_words: [],
  });
  const {
    loading_analysis,
    overall_sentiments,
    overall_departments,
    image_path_polarity_v_sentiment,
    image_path_review_length_v_sentiment,
    image_path_wordcloud,
    common_phrase,
    common_word,
    common_words,
  } = analysis;

  const [options, setOptions] = useState({
    school_year_to_choose: [],
    school_semester_to_choose: [],
    csv_question_to_choose: [],
  });
  const {
    school_year_to_choose,
    school_semester_to_choose,
    csv_question_to_choose,
  } = options;

  const [selected, setSelected] = useState({
    school_year: "All",
    school_semester: "All",
    csv_question: "All",
  });

  const { school_year, school_semester, csv_question } = selected;

  /**
   * @description Fetches the data from the server
   * @param school_year
   * @param school_semester
   * @param csv_question
   */
  const loadPolarityVsentiment = (
    school_year,
    school_semester,
    csv_question,
  ) => {
    if (isAuth().verified_email === "Verified"){
      setSelected({
        ...selected,
        school_year,
        school_semester,
        csv_question,
      });
      httpClient
        .get(
          `/analysis/sentiment_vs_polarity/${school_year}/${school_semester}/${csv_question}/${cookie}`,
        )
        .then((response) => {
          setAnalysis({
            ...analysis,
            loading_analysis: false,
            overall_sentiments: response.data.overall_sentiments,
            overall_departments: response.data.overall_departments,
            image_path_polarity_v_sentiment:
              response.data.image_path_polarity_v_sentiment,
            image_path_review_length_v_sentiment:
              response.data.image_path_review_length_v_sentiment,
            image_path_wordcloud: response.data.image_path_wordcloud,
            common_phrase: response.data.common_phrase,
            common_word: response.data.common_word,
            common_words: response.data.common_words,
          });
        });
      }
  };

  /**
   * @description Options for the listbox
   */
  const optionsForPVS = () => {
    if (isAuth().verified_email === "Verified"){
      httpClient
      .get(`/analysis/options-for-file-data-dashboard`)
      .then((response) => {
        // loadPolarityVsentiment(response.data.school_year[0].school_year, response.data.school_semester[0].school_semester, response.data.csv_question[0].csv_question)
        setOptions({
          ...options,
          school_year_to_choose: response.data.school_year,
          school_semester_to_choose: response.data.school_semester,
          csv_question_to_choose: response.data.csv_question,
        });
        setSelected({
          ...selected,
          school_year: response.data.school_year[0].school_year,
          school_semester: response.data.school_semester[0].school_semester,
          csv_question: response.data.csv_question[0].csv_question,
        });
      });
    }
  };

  /**
   * @description Sets the selected option
   * @param name
   * @returns {(function(*): void)|*}
   */
  const handleSelect = (name) => (value) => {
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  useEffect(() => {
    get_file_details();
  }, []);

  useEffect(() => {
    optionsForPVS();
  }, []);

  useEffect(() => {
    setAnalysis({
      ...analysis,
      loading_analysis: true,
    });
    loadPolarityVsentiment(school_year, school_semester, csv_question);
  }, [school_year, school_semester, csv_question]);

  const dept = {
    labels: overall_departments.map((department) => department.name),
    datasets: [
      {
        type: "bar",
        label: "Negative Sentiment (%)",
        data: overall_departments.map((department) =>
          parseFloat(department.negative_sentiments_percentage.slice(0, -1)),
        ),
        backgroundColor: "rgba(254, 242, 242, 1)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
      {
        type: "bar",
        label: "Positive Sentiment (%)",
        data: overall_departments.map((department) =>
          parseFloat(department.positive_sentiments_percentage.slice(0, -1)),
        ),
        backgroundColor: "rgba(240, 253, 244, 1)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
    ],
  }

  const deptOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
    backgroundColor: "#ecfeff",
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || "";
          if (label) {
            label += ": ";
          }
          label += `${tooltipItem.yLabel}%  `;
          label += overall_departments[tooltipItem.index].number_of_sentiments;
          return label;
        },
      },
    },
  };

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8 pb-8">
      {
        isAuth().verified_email === "Verified" ? (
            <>
                    <Header
                      body="A data visualization dashboard for the sentiment analysis of the students' feedbacks."
                      title="Sentiment Analysis"
                    />
                    <div className="grid grid-cols-2 py-8 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {loading ? (
                        <>
                          <LoadingPageSkeletonText />
                          <LoadingPageSkeletonText />
                          <LoadingPageSkeletonText />
                          <LoadingPageSkeletonText />
                        </>
                      ) : (
                        details.map((detail) => (
                          <div
                            className="flex items-start hover:bg-teal-500 p-0.5 rounded-lg transition delay-150 duration-500 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                            key={detail.id}
                          >
                            <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow w-full">
                              <div
                                className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                  detail.id === 1
                                    ? "bg-red-500"
                                    : detail.id === 2
                                    ? "bg-teal-500"
                                    : detail.id === 3
                                    ? "bg-blue-500"
                                    : "bg-black"
                                }`}
                              >
                                <i className={detail.icon} />
                              </div>
                              <div className="flex flex-col items-start justify-center ml-4">
                                <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                                  {detail.value}
                                </h1>
                                <h1 className="text-sm font-medium text-gray-500">
                                  {detail.title}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="grid w-full grid-cols-1 mb-8">
                      <div className="flex flex-col items-center justify-between w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                        <div className="w-full">
                          <h1 className="text-base font-bold text-blue-500">Show By</h1>
                        </div>
                        <div
                          className={`w-full flex flex-col lg:flex-row place-content-end ${
                            loading_analysis ? "animate-pulse" : ""
                          }`}
                        >
                          <div className="w-full flex">
                            <div className="w-1/2 px-2">
                              <SchoolYearList
                                disabled={loading_analysis}
                                handleSelect={handleSelect}
                                school_year={school_year}
                                school_year_to_choose={school_year_to_choose}
                              />
                            </div>
                            <div className="w-1/2 px-2">
                              <SemesterList
                                disabled={loading_analysis}
                                handleSelect={handleSelect}
                                school_semester={school_semester}
                                school_semester_to_choose={school_semester_to_choose}
                              />
                            </div>
                          </div>
                          <div className="w-full px-2">
                            <CsvQuestion
                              csv_question={csv_question}
                              csv_question_to_choose={csv_question_to_choose}
                              disabled={loading_analysis}
                              handleSelect={handleSelect}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 ">
                      <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                        <div className="w-full z-30">
                          <h1 className="text-md font-bold text-blue-500 mb-4">
                            Number of Positive and Negative Sentiments
                          </h1>
                          <DisclosureTogglable title="Sentiments">
                            <p className="text-base font-medium text-gray-500 mb-4">
                              The overall sentiments of the students&#39; feedbacks.
                            </p>
                          </DisclosureTogglable>
                        </div>
                        <h1 className="text-md font-bold text-blue-500 mb-4">
                          Overall Sentiment
                        </h1>
                        {loading_analysis ? (
                          <>
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                          </>
                        ) : (
                          overall_sentiments.map((overall) => (
                            <div
                              className={`flex flex-col items-start justify-start w-full p-4 rounded-lg shadow ${overall.color50}`}
                              key={overall.id}
                            >
                              <div className="flex items-center justify-center">
                                <div
                                  className={`flex items-center justify-center w-10 h-10 text-white rounded ${overall.color500}`}
                                >
                                  <i className={`${overall.icon}`} />
                                </div>
                                <div className="flex flex-col items-start justify-center ml-4">
                                  <h1 className="py-1 pl-2 text-2xl font-extrabold leading-none tracking-tight text-left text-gray-500">
                                    {overall.percentage} %
                                  </h1>
                                  <h1 className="text-sm font-medium text-gray-500">
                                    with {overall.value} responses from {overall.year}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                        <h1 className="text-md font-bold text-blue-500 mb-4">
                          Department Sentiment
                        </h1>
                        {loading_analysis ? (
                          <>
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                          </>
                        ) : (
                          <Bar data={dept} options={deptOptions} />
                        )}
                      </div>
                      <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                        <div className="w-full z-30">
                          <h1 className="text-md font-bold text-blue-500 mb-4">
                            Sentiment vs Polarity
                          </h1>
                          <DisclosureTogglable title="What are Sentiment and Polarity?">
                            <p className="text-base font-medium text-gray-500 mb-4">
                              Sentiment refers to the emotional or attitudinal content of a
                              piece of text, such as a statement, review, or social media
                              post. It is the overall feeling or attitude expressed in the
                              text.
                            </p>
                            <p className="text-base font-medium text-gray-500 mb-4">
                              Polarity, on the other hand, is a measure of the positivity or
                              negativity of a piece of text. It is typically calculated by
                              analyzing the words and phrases used in the text and assigning a
                              positive or negative score to each one. The overall polarity of
                              the text is then determined by summing up these scores.
                            </p>
                          </DisclosureTogglable>
                        </div>
                        <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg space-y-2">
                          {loading_analysis ? (
                            <LoadingPageSkeletonImage />
                          ) : (
                              <>
                                <img
                                  alt="sentiment_v_pol"
                                  className="shadow rounded-lg"
                                  src={`data:image/jpeg;base64,${image_path_polarity_v_sentiment}`}
                                />
                                <p className="text-base font-medium text-gray-500 mb-4">
                                  Polar words and phrases are usually associated with strong or clearly defined sentiment, while non-polar refers to words and phrases typically used in everyday.
                                </p>
                              </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                        <div className="w-full z-30">
                          <h1 className="text-md font-bold text-blue-500 mb-4">
                            Sentiment vs Response Length
                          </h1>
                          <DisclosureTogglable title="What are Sentiment and Response Length?">
                            <p className="text-base font-medium text-gray-500 mb-4">
                              The length of the responses is a good indicator of the amount of
                              detail the students have provided in their responses. The longer
                              the response, the more detail the student has provided.
                            </p>
                            <p className="text-base font-medium text-gray-500 mb-4">
                              The sentiment of the responses is also a good indicator of the
                              amount of detail the students have provided in their responses.
                              The more positive the sentiment, the more detail the student has
                              provided but sometimes the sentiment can be negative but the
                              response is still detailed.
                            </p>

                          </DisclosureTogglable>
                        </div>
                        <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg space-y-2">
                          {loading_analysis ? (
                            <LoadingPageSkeletonImage />
                          ) : (
                             <>
                              <img
                                alt="review_len_v_sentiment"
                                className="shadow rounded-lg"
                                src={`data:image/jpeg;base64,${image_path_review_length_v_sentiment}`}
                              />
                              <p className="text-base font-medium text-gray-500 mb-4">
                                When the students are happy with there professor, the
                                responses are usually short and positive. When the students are
                                unhappy with there professor, the responses are usually long and
                                negative.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                        <div className="w-full z-30">
                          <h1 className="text-md font-bold text-blue-500 mb-4">Word Cloud</h1>
                          <DisclosureTogglable title="What is a Word Cloud?">
                            <p className="text-base font-medium text-gray-500 mb-4">
                              A word cloud is a visual representation of the frequencies of
                              words in a given text or set of texts. It is typically created
                              by displaying each word in the text as a separate label in a
                              font size proportional to its frequency. The more frequently a
                              word appears in the text, the larger it is displayed in the word
                              cloud.
                            </p>
                            <p className="text-base font-medium text-gray-500 mb-4">
                              Word clouds can be useful for quickly visualizing the most
                              common words in a text and identifying trends or patterns. They
                              are often used in sentiment analysis as a way of summarizing the
                              overall sentiment of a text or group of texts.
                            </p>
                          </DisclosureTogglable>
                        </div>
                        <div className="flex flex-col items-start justify-start w-full p-4 rounded-lg space-y-2">
                          {loading_analysis ? (
                            <LoadingPageSkeletonImage />
                          ) : (
                            <>
                              <img
                                alt="wordcloud"
                                className="shadow rounded-lg"
                                src={`data:image/jpeg;base64,${image_path_wordcloud}`}
                              />
                              <p className="text-base font-medium text-gray-500 mb-4">
                                The word cloud shows the most common words in the responses. The larger the word, the more common it is.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2">
                      <div className="w-full z-30">
                        <h1 className="text-md font-bold text-blue-500 mb-4">
                          Most Common Words in Trigrams (3 words)
                        </h1>
                        <DisclosureTogglable title="What are Trigrams?">
                          <p className="text-base font-medium text-gray-500 mb-4">
                            A trigram is a group of three consecutive words in a given text.
                            Trigrams are often used in natural language processing and
                            linguistics to analyze the frequencies and patterns of words in a
                            text.
                          </p>
                          <p className="text-base font-medium text-gray-500 mb-4">
                            By analyzing the trigrams, we can see the most common phrases that
                            students use in their responses.
                          </p>
                        </DisclosureTogglable>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full pt-4">
                        {loading_analysis ? (
                          <>
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                          </>
                        ) : (
                          common_phrase.map((phrase) => (
                            <div
                              className={`flex flex-col items-start w-full p-2 rounded-lg shadow space-y-2 ${
                                phrase.sentiment === "1" ? "bg-green-50" : "bg-red-50"
                              }`}
                              key={phrase.id}
                            >
                              <div className="flex justify-start w-full p-2 rounded-lg">
                                <div className="flex items-center justify-center">
                                  <div
                                    className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                      phrase.sentiment === "1" ? "bg-green-500" : "bg-red-500"
                                    }`}
                                  >
                                    <i
                                      className={`${
                                        phrase.sentiment === "1"
                                          ? "fas fa-face-smile-beam"
                                          : "fas fa-face-frown"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start justify-center ml-4">
                                    <h1 className="py-1 pl-2 text-base font-bold leading-none tracking-tight text-left text-gray-500">
                                      {phrase.word}
                                    </h1>
                                    <h1 className="text-sm font-medium text-gray-500">
                                      repeated {phrase.frequency}.
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2 mt-8">
                      <div className="w-full z-30">
                        <h1 className="text-md font-bold text-blue-500 mb-4">
                          Most Common Words in Bigrams (2 words)
                        </h1>
                        <DisclosureTogglable title="What are Bigrams?">
                          <p className="text-base font-medium text-gray-500 mb-4">
                            A bigram is a group of two consecutive words in a given text.
                            Bigrams are often used in natural language processing and
                            linguistics to analyze the frequencies and patterns of words in a
                            text.
                          </p>
                          <p className="text-base font-medium text-gray-500 mb-4">
                            By analyzing the bigrams, we can see the most common phrases used
                            by students in their responses.
                          </p>
                        </DisclosureTogglable>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full pt-4">
                        {loading_analysis ? (
                          <>
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                          </>
                        ) : (
                          common_words.map((phrase) => (
                            <div
                              className={`flex flex-col items-start w-full p-2 rounded-lg shadow space-y-2 ${
                                phrase.sentiment === "1" ? "bg-green-50" : "bg-red-50"
                              }`}
                              key={phrase.id}
                            >
                              <div className="flex justify-start w-full p-2 rounded-lg">
                                <div className="flex items-center justify-center">
                                  <div
                                    className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                      phrase.sentiment === "1" ? "bg-green-500" : "bg-red-500"
                                    }`}
                                  >
                                    <i
                                      className={`${
                                        phrase.sentiment === "1"
                                          ? "fas fa-face-smile-beam"
                                          : "fas fa-face-frown"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start justify-center ml-4">
                                    <h1 className="py-1 pl-2 text-base font-bold leading-none tracking-tight text-left text-gray-500">
                                      {phrase.word}
                                    </h1>
                                    <h1 className="text-sm font-medium text-gray-500">
                                      repeated {phrase.frequency}.
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full p-4 bg-blue-50 rounded-lg shadow space-y-2 mt-8">
                      <div className="w-full z-30">
                        <h1 className="text-md font-bold text-blue-500 mb-4">
                          Most Common Words in Unigrams (1 word)
                        </h1>
                        <DisclosureTogglable title="What are unigrams?">
                          <p className="text-base font-medium text-gray-500 mb-4">
                            A unigram is a single word in a given text. Unigrams are often
                            used in natural language processing and linguistics to analyze the
                            frequencies and patterns of words in a text.
                          </p>
                          <p className="text-base font-medium text-gray-500 mb-4">
                            By analyzing the unigrams, we can see the most common words used
                            by students in their responses.
                          </p>
                        </DisclosureTogglable>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full pt-4">
                        {loading_analysis ? (
                          <>
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                            <LoadingPageSkeletonText />
                          </>
                        ) : (
                          common_word.map((phrase) => (
                            <div
                              className={`flex flex-col items-start w-full p-2 rounded-lg shadow space-y-2 ${
                                phrase.sentiment === "1" ? "bg-green-50" : "bg-red-50"
                              }`}
                              key={phrase.id}
                            >
                              <div className="flex justify-start w-full p-2 rounded-lg">
                                <div className="flex items-center justify-center">
                                  <div
                                    className={`flex items-center justify-center w-10 h-10 text-white rounded ${
                                      phrase.sentiment === "1" ? "bg-green-500" : "bg-red-500"
                                    }`}
                                  >
                                    <i
                                      className={`${
                                        phrase.sentiment === "1"
                                          ? "fas fa-face-smile-beam"
                                          : "fas fa-face-frown"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start justify-center ml-4">
                                    <h1 className="py-1 pl-2 text-base font-bold leading-none tracking-tight text-left text-gray-500">
                                      {phrase.word}
                                    </h1>
                                    <h1 className="text-sm font-medium text-gray-500">
                                      repeated {phrase.frequency}.
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
            </>
        ) : (<HeaderEmail title={"admin"} />)
      }
    </div>
  );
}
