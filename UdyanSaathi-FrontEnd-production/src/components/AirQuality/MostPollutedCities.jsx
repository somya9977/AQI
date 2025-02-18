import React, { useState, useEffect } from "react";
import { getBaseUrl } from "../Connectivity/storageHelper";

const Component3 = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("last-day");
  const [selectedParameter, setSelectedParameter] = useState("AQI");
  const [error, setError] = useState(null);
  const options = ["last-day", "last-7-days", "last-month"];
  const AqiOptions = ["CO", "NH3", "NO2", "OZONE", "PM25", "PM10", "SO2", "AQI"];

  useEffect(() => {
    fetchData(); // Initial data fetch on component mount
  }, [selectedOption, selectedParameter]); // Fetch data whenever these dependencies change

  const fetchData = async () => {
    try {
      const to_date = getDateRange(selectedOption);
      const airQualityData = await fetchAirQualityData(to_date, selectedParameter);
      // console.log(airQualityData);
      setCitiesData(airQualityData);
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again."); // Set an error message
    }
  };

  const getDateRange = (interval) => {
    let to_date = 1; // Default to_date value

    if (interval === "last-day") {
      to_date = 1;
    } else if (interval === "last-7-days") {
      to_date = 6;
    } else if (interval === "last-month") {
      to_date = 30;
    }

    return String(to_date);
  };

  const fetchAirQualityData = async (to_date, parameter) => {
    try {
      const baseurl = getBaseUrl();
      const url = `${baseurl}get-Top10Cities/?to_date=${to_date}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 m-6 rounded-2xl">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-xl text-[#33a0d3]">
              Most polluted cities in India
            </h3>
          </div>
          <p className="text-sm text-slate-500 my-1 mb-2">
            Real Time worst city rankings
          </p>
          <div className="select flex flex-row gap-4">
            <select
              className="border border-gray-300 p-2 rounded-md mt-3"
              onChange={(e) => setSelectedOption(e.target.value)}
              value={selectedOption}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 p-2 rounded-md mt-3"
              onChange={(e) => setSelectedParameter(e.target.value)}
              value={selectedParameter}
            >
              {AqiOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    AQI
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
  {citiesData.map((city, index) => (
    <tr key={index}>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{index + 1}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{city.City}</div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800`}
        >
          {city[selectedParameter] !== 0 ? city[selectedParameter] : 'N/A'}
        </span>
      </td>
    </tr>
  ))}
</tbody>


            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Component3;
