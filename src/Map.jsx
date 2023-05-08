import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import React, { useEffect, useRef, useState } from "react";
import Markers from "./components/Markers";
import InstituteNavigation from './components/InstituteNavigation'

export default function Map({setPosition, position, locations }) {
    //#region Fields
    const bounds = new LatLngBounds([56.87154542458642,60.520703299803316], [56.814346593446686,60.714337333006426])
    const mapRef = useRef(null);
    // const [streetMap, setStreetMap] = useState(
    //     // "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
    //     "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    //     // "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
    //     // "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    // );
    
    const streetMap = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    const [markers, setMarkers] = useState(locations);
    const [instituteMap, setInstituteMap] = useState("")
    const [institute, setInstitute] = useState([])

    const [index, setIndex] = useState(0)
    const [floorNumber, setFloorNumber] = useState(1);

    const [prevPosition, setPrevPosition] = useState(position)

    const [minZoom, setMinZoom] = useState(14); 

    const [maxZoom, setMaxZoom] = useState(18); 
    const [zoom, setZoom] = useState(17); 
    //#endregion

    //#region Function
    function zoomToPosition(duration, zoomLevel) {
        if (mapRef.current) {
          mapRef.current.flyTo(position, zoomLevel, {
            duration: duration,
            easeLinearity: 1,
          });
        }
    }

    function handleMapMove() {
        const center = mapRef.current.getCenter();
        if (!bounds.contains(center)) {
          const newCenter = bounds.getCenter();
          mapRef.current.setView(newCenter, mapRef.current.getZoom(), {
            animate: true
          });
          setPosition([newCenter.lat, newCenter.lng]);
        } else setPosition([center.lat, center.lng]);
    }

    function handleButtonClick(ins) {
        if (ins.length > index){
            setMarkers([])
            setInstituteMap(ins[index])
            setInstitute(ins)
            
            zoomToPosition(0.2, 13)
            setMaxZoom(15);
            setZoom(13);
            setMinZoom(12)
        }
    }

    function handleButtonClickBack(e) {
        e.preventDefault();

        setMarkers(locations)
        setInstituteMap("")
        setInstitute([])

        setMaxZoom(17);
        setZoom(17);
        setMinZoom(14)

        setIndex(0)
        setFloorNumber(1)

        setPosition(prevPosition)
    }

    function AppOrDownClick(offset){
        if (offset === 1 && index < institute.length - 1){
            setIndex(prevId => prevId + offset);
            setFloorNumber(() => floorNumber + 1)
        }
        else if (offset === -1 && index > 0){
            setIndex(prevId => prevId + offset);
            setFloorNumber(() => floorNumber - 1)
        }
    }
    //#endregion

    //#region UseEffect
    useEffect(() => {
        zoomToPosition(0.4, 18)
    }, [position]);

    useEffect(() => {
        setInstituteMap(institute[index]);
    }, [index, institute]);
    //#endregion

    return (
        <>
            <MapContainer
                key={maxZoom}
                ref={mapRef}
                className="map"
                center={position}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
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
                    <InstituteNavigation floorNumber={floorNumber} AppOrDownClick={AppOrDownClick} handleButtonClickBack={handleButtonClickBack} />
                </>
            }
            
            <Markers position={position} setPrevPosition={setPrevPosition} setIndex={setIndex} setInstitute={setInstitute} setPosition={setPosition} locations={markers} handleButtonClick={handleButtonClick} />
            </MapContainer>
        </>
  );
}

