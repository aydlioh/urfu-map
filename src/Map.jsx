import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import React, { useEffect, useRef, useState } from "react";
import Markers from "./components/Markers";
import InstituteNavigation from './components/InstituteNavigation'

function Map({setPosition, position, locations }) {
    const bounds = new LatLngBounds([56.87154542458642,60.520703299803316], [56.814346593446686,60.714337333006426])
    const mapRef = useRef(null);
    const [streetMap, setStreetMap] = useState(
        // "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        // "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        // "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );

    const [markers, setMarkers] = useState(locations);

    function zoomToPosition(duration, zoomLevel) {
        if (mapRef.current) {
          mapRef.current.flyTo(position, zoomLevel, {
            duration: duration,
            easeLinearity: 1,
          });
        }
    }

    useEffect(() => {
        zoomToPosition(0.4, 18)
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


      const [instituteMap, setInstituteMap] = useState("")
      const [institute, setInstitute] = useState([])
      const [id, setId] = useState(0)


    function handleButtonClick(ins) {
        if (ins.length > id){
    
            setMarkers([])
            setInstituteMap(ins[id])
            setInstitute(ins)

            zoomToPosition(0.2, 14)
        }
    }

    function handleButtonClickBack(e) {
        e.preventDefault();

        setId(0)
        setMarkers(locations)
        setInstituteMap("")
        setInstitute([])
    }

    function AppOrDownClick(offset){

        if (offset === 1 && id < institute.length - 1) {
            setId(prevId => prevId + offset);
        } else if (offset === -1 && id > 0) {
            setId(prevId => prevId + offset);
        }
    }

    useEffect(() => {
        setInstituteMap(institute[id]);
    }, [id, institute]);



    return (
        <>

            <MapContainer
                ref={mapRef}
                className="map"
                center={position}
                zoom={17}
                scrollWheelZoom={true}
                minZoom={14}
                onmoveend={handleMapMove}
                maxBounds={bounds}
                maxBoundsViscosity={1}
            >
            {!instituteMap && 
            <TileLayer
                // accessToken="pk.eyJ1IjoiYXlkbGlvaDA0IiwiYSI6ImNsZzNzaXp3NTA3dXAzam0yZDVpNTUyMHUifQ.TL5S9kqlo1pnh_j5LNjCEA"
                // id="mapbox/streets-v11"
                // tileSize={512}
                // zoomOffset={-1}

                url={streetMap}
            />}
            
            {instituteMap && 
                <>
                    <ImageOverlay
                        className="map"
                        bounds={bounds}
                        url={instituteMap}
                    />
                    <InstituteNavigation AppOrDownClick={AppOrDownClick} handleButtonClickBack={handleButtonClickBack} />
                </>
            }
            
            <Markers setInstitute={setInstitute} setPosition={setPosition} locations={markers} handleButtonClick={handleButtonClick} />
            </MapContainer>
        </>
  );
}


export default Map;