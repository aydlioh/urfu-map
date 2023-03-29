import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import React, { useEffect, useRef } from "react";
import Markers from "./components/Markers";

function Map({ position, locations }) {

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
    <>
        <MapContainer
        ref={mapRef}
        className="map"
        center={position}
        zoom={17}
        scrollWheelZoom={false}
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers locations={locations}/>
        </MapContainer>
    </>
    
  );
}

export default Map;
