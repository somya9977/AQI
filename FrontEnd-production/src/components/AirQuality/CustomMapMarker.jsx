import React, { useRef, useEffect, forwardRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const createMarkerIcon = (aqi, highlight) => {
    let color = '#24c45c'; // Default color for "Good" AQI
    if (aqi <= 50) {
        color = '#24c45c'; // Good
    } else if (aqi <= 100) {
        color = '#ecb40c'; // Satisfactory
    } else if (aqi <= 200) {
        color = '#fc7414'; // Moderate
    } else if (aqi <= 300) {
        color = '#ec4444'; // Poor
    } else if (aqi <= 400) {
        color = '#7c1c1c'; // Very Poor
    } else {
        color = '#5c1c84'; // Severe
    }

    const size = highlight ? 50 : 35;
    const iconAnchor = [size / 2, size];

    const svg = `<svg width="${size}" height="${size * 1.33}" viewBox="0 0 35 45" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.205 3.217H6.777c-2.367 0-4.286 1.87-4.286 4.179v19.847c0 2.308 1.919 4.179 4.286 4.179h5.357l5.337 13.58 5.377-13.58h5.357c2.366 0 4.285-1.87 4.285-4.179V7.396c0-2.308-1.919-4.179-4.285-4.179" fill="${color}"/>
                    <text x="50%" y="40%" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">${aqi}</text>
                </svg>`;
    const icon = new L.DivIcon({
        html: svg,
        className: '',
        iconSize: [size, size * 1.33],
        iconAnchor: iconAnchor
    });

    return icon;
};

const CustomMapMarker = forwardRef(({ position, aqi, station, city, polDate, highlight, shouldOpenPopup }, ref) => {
    const markerRef = useRef(null);

    useEffect(() => {
        const marker = markerRef.current;
        if (marker) {
            if (shouldOpenPopup) {
                marker.openPopup();
            }
            const openPopup = () => {
                marker.openPopup();
            };

            const closePopup = () => {
                marker.closePopup();
            };

            marker.on('mouseover', openPopup);
            marker.on('mouseout', closePopup);
            marker.on('click', openPopup);

            return () => {
                marker.off('mouseover', openPopup);
                marker.off('mouseout', closePopup);
                marker.off('click', openPopup);
            };
        }
    }, [shouldOpenPopup]);

    const size = highlight ? 50 : 35; // Define size here
    const markerIcon = createMarkerIcon(aqi, highlight);
    
    return (
        <Marker position={position} icon={markerIcon} ref={markerRef}>
            <Popup offset={[0, -size / 2]}>
                <div>
                    <strong>{station}</strong>
                    <br />
                    {city}
                    <br />
                    <strong>Last reading: {polDate}</strong>
                </div>
            </Popup>
        </Marker>
    );
});

// Add display name for the component
CustomMapMarker.displayName = 'CustomMapMarker';

export default CustomMapMarker;
