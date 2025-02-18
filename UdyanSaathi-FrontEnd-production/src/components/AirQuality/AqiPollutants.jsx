/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import AnimatedBackground from "../animations/AnimatedBackground";
import { getUrl } from "../Connectivity/storageHelper";

const Component2 = ({ selectedSearch, onData }) => {
  const [state, setState] = useState({
    value: 60, // Default initial value
    color: "transparent",
  });

  const [pollution, setPollution] = useState([]);

  //Call FUNCTION TO CALL API FOR DATA
  useEffect(() => {
    getPollutionData();
  }, [selectedSearch]);

  //API CALL FOR DATA
  const getPollutionData = async () => {
    try {
      const apiurl = getUrl();
      const response = await fetch(apiurl);
      const data = await response.json();
      // console.log("DATA:", data);
      setPollution(data);
      onData(data);

      if (data.length > 0) {
        setState((prevState) => ({
          ...prevState,
          value: data[0].AQI,
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="relative rounded-2xl lg:p-0 p-4 flex flex-col justify-around h-full">
        <div className="absolute inset-0 rounded-2xl">
          <AnimatedBackground />
        </div>
        <div className="mb-7 flex justify-center ">
          {pollution.map((pol) => (
            <p key={pol.id} className="mt-8 lg:text-[28px] text-center text-lg text-[#33a0d3]">
              Major Air pollutants in {pol.City}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-evenly">
            <div className="w-20 flex flex-col items-center py-5 gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/pm2.5-icon.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>
              {pollution.map((pol) => (
                <p key={pol.id} className="text-center flex flex-col text-base font-medium">
                  {pol.PM25}
                  <span className="text-xs font-extralight">(PM2.5)</span>
                </p>
              ))}
            </div>
            <div className="w-20 flex flex-col items-center py-5 gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/pm10-icon.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>
              {pollution.map((pol) => (
                <p key={pol.id} className="text-center flex flex-col text-base font-medium">
                  {pol.PM10}
                  <span className="text-xs font-extralight">(PM10)</span>
                </p>
              ))}
            </div>
            <div className="w-20 flex flex-col items-center py-5 gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/so2.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>
              {pollution.map((pol) => (
                <p key={pol.id} className="text-center flex flex-col text-base font-medium">
                  {pol.SO2}
                  <span className="text-xs font-extralight">(SO2)</span>
                </p>
              ))}
            </div>
          </div>
          <div className="poll-row-2 flex flex-row justify-evenly">
            <div className="w-20 flex flex-col items-center py-5 gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/CO.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>
              {pollution.map((pol) => (
                <p key={pol.id} className="text-center flex flex-col text-base font-medium">
                  {pol.CO}
                  <span className="text-xs font-extralight">(CO)</span>
                </p>
              ))}
            </div>
            <div className="w-20 flex flex-col items-center py-5 gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/o3.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>
              {pollution.map((pol) => (
                <p key={pol.id} className="text-center flex flex-col text-base font-medium">
                  {pol.OZONE}
                  <span className="text-xs font-extralight">(OZONE)</span>
                </p>
              ))}
            </div>
            <div className="w-20 flex flex-col items-center py-5 gap-2.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="30"
                viewBox="0 0 46 34"
                fill="none"
              >
                <image
                  href="/no2.webp"
                  width="36"
                  height="40"
                  x="0"
                  y="0"
                  preserveAspectRatio="none"
                />
              </svg>
              {pollution.map((pol) => (
                <p key={pol.id} className="text-center flex flex-col text-base font-medium">
                  {pol.NO2}
                  <span className="text-xs font-extralight">(NO2)</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component2;
