import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBaseUrl, setStationName, setUrl } from "../Connectivity/storageHelper";

function Navbar({ onSearchSelected }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [defaultSuggestions, setDefaultSuggestions] = useState([]);

  useEffect(() => {
    fetchStationsData();
  }, []);

  var stationdata = [];
  const fetchStationsData = async () => {
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}get-MapData`);
      stationdata = await response.json();
      getUserLocation();
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          findNearestStation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const findNearestStation = (userLat, userLong) => {
    if (stationdata.length === 0) {
      console.error("Stations data is empty or not loaded.");
      return;
    }

    let nearestStation = null;
    let minDistance = Number.MAX_VALUE;

    stationdata.forEach((station) => {
      const distance = getDistanceFromLatLonInKm(userLat, userLong, station.Latitude, station.Longitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station.Station;
      }
    });

    if (nearestStation) {
      setSearchTerm(nearestStation);
      onSearchSelected(nearestStation);
      performSearch(nearestStation);
    } else {
      console.error("No nearest station found.");
    }
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const updateSuggestions = (input) => {
    setSearchTerm(input);
    const filteredSuggestions = defaultSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const selectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    performSearch(suggestion);
    onSearchSelected(suggestion);
  };

  const performSearch = (selectedSuggestion) => {
    const baseUrl = getBaseUrl();
    const endpoint = 'get-pollution-by-date-station/';
    const queryParams = { pol_Station: selectedSuggestion };

    const apiUrl = `${baseUrl}${endpoint}?${new URLSearchParams(queryParams)}`;
    setUrl(apiUrl);
    setStationName(selectedSuggestion);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const baseUrl = getBaseUrl()
      fetch(`${baseUrl}get-stations/?pol_Station=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          setDefaultSuggestions(data.map(station => station.Station));
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [searchTerm]);

  const showSuggestions = suggestions.length > 0 && searchTerm !== "";
  const handleFocus = () => {
    setSearchTerm('');
  };

  return (
    <nav className="sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-2xl bg-opacity-10 shadow-2xl border-slate-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.jpeg" className="lg:h-12 h-10 bg-transparent rounded-full" alt="Earth Enovate Logo" />
          <span className="lg:text-3xl text-xl text-black font-semibold"> Earth Enovate </span>
        </a>
        <div className="md:hidden">
          <button
            type="button"
            className="bg-transparent hover:bg-transparent focus:ring-4 focus:ring-gray-200 rounded-lg text-gray-500 hover:text-gray-700 text-sm p-2.5 mr-1"
            onClick={toggleMobileMenu}
          >
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>

        <div className={`w-full md:w-auto md:order-1 md:flex ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <div className="flex space-x-4 text-black items-center">
              <Link to="/" className="hover:text-slate-600 transition ease-in-out delay-100">
                Air Quality
              </Link>
              <Link to="/water-quality-index" className="hover:text-slate-600 transition ease-in-out delay-100">
                Water Quality
              </Link>
              <Link to="/weather" className="hover:text-slate-600 transition ease-in-out delay-100">
                Weather
              </Link>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => updateSuggestions(e.target.value)}
                onFocus={handleFocus}
              />
              {showSuggestions && (
                <div className="suggestions absolute top-10 left-0 right-0 bg-white border border-gray-200 rounded max-h-80 overflow-y-auto z-10">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`bg-white border border-gray-100 rounded-lg mt-2 p-4 md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => updateSuggestions(e.target.value)}
          onFocus={handleFocus}
        />
        {showSuggestions && (
          <div className="suggestions mt-2 bg-white border border-gray-200 rounded max-h-80 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
