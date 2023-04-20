import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import React, { useEffect, useRef, useState } from "react";
import Markers from "./components/Markers";

function Map({setPosition, position, locations }) {
    const bounds = new LatLngBounds([56.87154542458642,60.520703299803316], [56.814346593446686,60.714337333006426])

    const mapRef = useRef(null);

    const [tileLayer, setTileLayer] = useState(
        // "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        // "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );

    const [markers, setMarkers] = useState(locations);

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
        if (!bounds.contains(center)) {
          const newCenter = bounds.getCenter();
          mapRef.current.setView(newCenter, mapRef.current.getZoom(), {
            animate: true
          });
          setPosition([newCenter.lat, newCenter.lng]);
        } else {
          setPosition([center.lat, center.lng]);
        }
      }

    return (
        <>
            <MapContainer
            ref={mapRef}
            className="map"
            center={position}
            zoom={17}
            scrollWheelZoom={true}
            minZoom={15}
            onmoveend={handleMapMove}
            
            maxBounds={bounds}
            maxBoundsViscosity={1}
            >
            <TileLayer
                // url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                // accessToken="pk.eyJ1IjoiYXlkbGlvaDA0IiwiYSI6ImNsZzNzaXp3NTA3dXAzam0yZDVpNTUyMHUifQ.TL5S9kqlo1pnh_j5LNjCEA"
                // id="mapbox/streets-v11"
                // tileSize={512}
                // zoomOffset={-1}

                url={tileLayer}
            />
            <Markers setPosition={setPosition} locations={markers} />
            </MapContainer>
        </>
    
  );
}


export default Map;