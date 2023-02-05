import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export default function BreadCrumb() {
  const location = useLocation();

  const [path, setPath] = useState([]);

  // Link is http://localhost:3000/admin/analytics format to a friendly format for the breadcrumb like Admin  / Analytics
  const friendlyPath = (path) => {
    return path
      .split("/")
      .filter((x) => x)
      .map((x) => x[0].toUpperCase() + x.slice(1))
      .map((x, i, a) =>
        i === a.length - 1 ? (
          <b className="bg-cyan-100 text-blue-500 rounded p-2" key={x}>
            {x}
          </b>
        ) : (
          x
        ),
      )
      .reduce((prev, curr) => [prev, " / ", curr]);
  };

  useEffect(() => {
    setPath(friendlyPath(location.pathname));
  }, [location]);

  return (
    <div className="px-6 mx-auto max-w-7xl pt-8">
      <div className="flex flex-row items-center justify-center w-full p-4 rounded-lg bg-blue-50 shadow">
        <div className="grid w-full grid-cols-1 rounded">
          <div className="col-span-4">
            <div className="flex flex-row justify-start w-full">
              <p className="text-base font-medium text-blue-500">{path}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
