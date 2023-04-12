import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import React, { useEffect, useRef } from "react";
import Markers from "./components/Markers";

function Map({setPosition, position, locations }) {

    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
        mapRef.current.flyTo(position, 18, {
            duration: 0.4,
            easeLinearity: 1,
        });
        }
    }, [position]);

    function handleMapMove() {
        const center = mapRef.current.getCenter();
        setPosition([center.lat, center.lng]);
    }

    return (
        <>
            <MapContainer
            ref={mapRef}
            className="map"
            center={position}
            zoom={17}
            scrollWheelZoom={true}
            minZoom={0}
            onmoveend={handleMapMove}
            >
            <TileLayer
                url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                accessToken="pk.eyJ1IjoiYXlkbGlvaDA0IiwiYSI6ImNsZzNzaXp3NTA3dXAzam0yZDVpNTUyMHUifQ.TL5S9kqlo1pnh_j5LNjCEA"
                id="aydlioh04/clg8cqnvc009x01mmaiymoxyv"
                tileSize={512}
                zoomOffset={-1}
            />
            <Markers setPosition={setPosition} locations={locations}/>
            </MapContainer>
        </>
    
  );
}


export default Map;
