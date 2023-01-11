import React from "react";
import {
  ACCENT_BUTTON,
  ICON_PLACE_SELF_CENTER,
} from "../../assets/styles/styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function Buttons({ to, text }) {
  Buttons.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };
  return (
    <div className="container flex flex-wrap items-center justify-between mx-auto h-14 max-w-7xl">
      <div className="flex items-center transition duration-300 ease-in-out delay-150 rounded-md hover:text-blue-900">
        <button className={`text-left ${ACCENT_BUTTON}`} type={"button"}>
          <Link to={to}>
            <h1 className="px-5 py-3">
              <FontAwesomeIcon
                className={`${ICON_PLACE_SELF_CENTER}`}
                icon={faArrowLeft}
              />
              {text}
            </h1>
          </Link>
        </button>
      </div>
    </div>
  );
}

export function DownloadImage({ image, image_name, children }) {
  DownloadImage.propTypes = {
    image: PropTypes.string.isRequired,
    image_name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  const downloadImage = (base64url, filename) => {
    const link = document.createElement("a");
    link.href = base64url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
      onClick={() =>
        downloadImage(`data:image/jpeg;base64,${image}`, `${image_name}.png`)
      }
      type="button"
    >
      {children}
    </button>
  );
}

export function DownloadTextToCSV({ data, filename, children }) {
  DownloadTextToCSV.propTypes = {
    data: PropTypes.shape({}).isRequired,
    filename: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  const downloadCSV = (data, filename) => {
    let csvData = new Blob([data], { type: "text/csv" }, { encoding: "UTF-8" });
    let csvUrl = URL.createObjectURL(csvData);
    let tempLink = document.createElement("a");
    tempLink.href = csvUrl;
    tempLink.download = filename;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <button
      className={`py-1 px-2 flex flex-row justify-center ${ACCENT_BUTTON}`}
      onClick={() => downloadCSV(`${data}`, `${filename}.csv`)}
      type="button"
    >
      {children}
    </button>
  );
}
