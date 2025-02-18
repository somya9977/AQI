/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '../components/navbar/navbar';
import AqiDetails from "../components/AirQuality/AqiDetails";
import Component2 from "../components/AirQuality/AqiPollutants";
import Component3 from "../components/AirQuality/MostPollutedCities";
import Component4 from "../components/AirQuality/HealthAndMl";
import Component5 from "../components/AirQuality/LeastPollutedCities"; 
import Component6 from "../components/AirQuality/CompareDataGraph";
import Component7 from "../components/AirQuality/MetroCitiesDetails";
import Component8 from "../components/AirQuality/AqiHeatMap";
import Map from "../components/AirQuality/Map";
import { setStationName } from '../components/Connectivity/storageHelper';
function AirQualityPage() {
  const [selectedSearch, setSelectedSearch] = useState('');
  const [dangerAlert, setDangerAlert] = useState(null);

  const handleSearchSelected = (search) => {
    setSelectedSearch(search);
    setStationName(search);
  };

  const [childData, setChildData] = useState(null);

  const handleChildData = (data) => {
    // console.log("Data received from child:", data);

    checkPollutionConditions(data);
    setChildData(data);
  };

  const checkPollutionConditions = (data) => {
    const { OZONE, CO, PM10, PM25, NO2, SO2 } = data[0];
    let maxPollutant = null;

    if (OZONE > 30) {
      maxPollutant = {
        level: "Danger",
        message: "Crop burning may be the cause.",
        chemical: "Ozone",
        amount: OZONE,
      };
    }
    if (CO > 60) {
      maxPollutant = {
        level: "Danger",
        message: "Cars may be contributing to the pollution.",
        chemical: "Carbon Monoxide (CO)",
        amount: CO,
      };
    }
    if (PM10 > 200 || PM25 > 200) {
      const maxPM = PM10 > PM25 ? PM10 : PM25;
      maxPollutant = {
        level: "Danger",
        message: "Dust pollution is high.",
        chemical: `Particulate Matter (${maxPM === PM10 ? "PM10" : "PM2.5"})`,
        amount: maxPM,
      };
    }
    if (NO2 > 80) {
      maxPollutant = {
        level: "Danger",
        message: "Factories may be emitting nitrogen dioxide.",
        chemical: "Nitrogen Dioxide (NO2)",
        amount: NO2,
      };
    }
    if (SO2 > 70) {
      maxPollutant = {
        level: "Danger",
        message: "Factories may be emitting sulfur dioxide.",
        chemical: "Sulfur Dioxide (SO2)",
        amount: SO2,
      };
    }

    if (maxPollutant) {
      setDangerAlert(maxPollutant);
    } else {
      setDangerAlert(null);
    }
  };

  // console.log("Hello", childData);

  return (
    <>
     <Navbar onSearchSelected={handleSearchSelected} />
      {dangerAlert && (
        <div
          role="alert"
          className="alert-container aa px-8 mt-3 rounded-xl animated"
        >
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {dangerAlert.level}
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>{dangerAlert.message}</p>
            <p>
              Chemical: {dangerAlert.chemical}, Amount: {dangerAlert.amount}
            </p>
          </div>
        </div>
      )}

    <div>
      {/* AQI PAGE ROW 1 */}
      <div className="m-5 flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[60%] w-full shadow-custom-shadow z-[-1] rounded-2xl">
          <AqiDetails selectedSearch={selectedSearch} />
        </div>
        <div className="lg:w-[40%] w-full shadow-custom-shadow rounded-2xl">
          <Component2 selectedSearch={selectedSearch} onData={handleChildData} />
        </div>
      </div>
      <div className="flex flex-col relative m-5 gap-5">
      <div className="w-full z-0 shadow-custom-shadow rounded-2xl bg-white">
        <Map  selectedSearch={selectedSearch}/>
      </div>
      </div>
      {/* AQI PAGE ROW 2 */}
      <div className="flex flex-col lg:flex-row relative m-5 gap-3">
        <div className="lg:w-[30%] w-full shadow-custom-shadow rounded-2xl bg-white">
          <Component3 />
        </div>
        <div className="lg:w-[70%] w-full shadow-custom-shadow rounded-2xl bg-white">
          <Component4 />
        </div>
      </div>

    </div>

    {/* AQI PAGE ROW 3 */}
    <div className="flex flex-col lg:flex-row relative m-5 gap-3">
      <div className="lg:w-[30%] w-full shadow-custom-shadow rounded-2xl bg-white">
        <Component5 />
      </div>
      <div className="lg:w-[70%] w-full shadow-custom-shadow rounded-2xl bg-white">
        <Component6 />
      </div>
    </div>

    
    <div className="flex flex-col relative m-5 gap-5">
      {/* AQI PAGE ROW 4 */}
      <div className="w-full shadow-custom-shadow rounded-2xl bg-white">
        <Component7 />
      </div>

      {/* AQI PAGE ROW 5 */}
      <div className="w-full shadow-custom-shadow rounded-2xl bg-white">
        <Component8 selectedSearch={selectedSearch} />
      </div>

      {/* AQI PAGE ROW 6 */}
      
    </div>

      
      </>
  );
}

export default AirQualityPage;
