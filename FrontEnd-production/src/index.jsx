import React from "react";
import ReactDOM from "react-dom/client";
import AirQualityPage from "./pages/AirQualityPage";
import WeatherMoniter from "./pages/WeatherMoniter"; // Ensure correct import path
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WaterQualiity from "./pages/WaterQualiity"; // Corrected typo and path

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AirQualityPage />} />
        <Route path="/water-quality-index" element={<WaterQualiity />} /> 
        <Route path="/weather" element={<WeatherMoniter />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
