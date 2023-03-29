import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "./index.css";
import React, { useEffect, useRef } from "react";

function Map({setPosition, position, locations }) {
  const icon = new L.Icon({
    className: "marker-icon",
    iconUrl: `data:image/svg+xml;charset=utf-8,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <path fill="red" d="M12 22s-8-6.5-8-13a8 8 0 1 1 16 0c0 6.5-8 13-8 13z"/>
            <circle cx="12" cy="9" r="5" fill="white" />
        </svg>`,
    iconSize: [45, 45],
    iconAnchor: [23, 20],
  });

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(position, 17, {
        duration: 1,
        easeLinearity: 1,
      });
    }
  }, [position]);

  return (
    <MapContainer
      ref={mapRef}
      className="map"
      center={position}
      zoom={17}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((l) => (
        <Marker icon={icon} position={l.position}>
          <Popup>
            <h1 className="marker__title">{l.title}</h1>
            <span className="marker__text">{l.text}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
