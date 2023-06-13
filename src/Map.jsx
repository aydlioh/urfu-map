import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import { LatLngBounds } from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import React, { useEffect, useRef, useState } from "react";
import Markers from "./components/Markers";
import Menu from './Menu';
import MenuToggle from './components/MenuToggle';
import InstituteNavigation from './components/InstituteNavigation'
import { LocationMarker } from "./API/LocationMarker";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import CloseButton from "./components/CloseButton";


export default function Map({ locations }) {
    //#region Fields
    const [userPosition, setUserPosition] = useState([0, 0]);
    const [routeControl, setRouteControl] = useState(null);

    const [position, setPosition] = useState([56.84384143906293,60.65234332360141]);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const bounds = new LatLngBounds([56.87154542458642,60.520703299803316], [56.814346593446686,60.714337333006426])
    const mapRef = useRef(null);
    //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
    //     "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    //     "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
    //     "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    
    const streetMap = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
    const [markers, setMarkers] = useState(locations);
    const [instituteMap, setInstituteMap] = useState("")
    const [institute, setInstitute] = useState([])

    const [index, setIndex] = useState(0)
    const [floorNumber, setFloorNumber] = useState(1);
    const [limitFloors, setLimitFloors] = useState([0, 0]);

    const [prevPosition, setPrevPosition] = useState(position)

    const [minZoom, setMinZoom] = useState(14); 

    const [maxZoom, setMaxZoom] = useState(18); 
    const [zoom, setZoom] = useState(18); 
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
            console.log(position)

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

    function handleButtonClickBack() {
        if (instituteMap){
            setMarkers(locations)
            setInstituteMap("")
            setInstitute([])
    
            setMaxZoom(18);
            setZoom(18);
            setMinZoom(14)
    
            setIndex(0)
            setFloorNumber(1)
    
            setPosition(prevPosition)
        }
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
    
    //#region Router
    function createRoute(aim) {
        const map = mapRef.current;
        deleteRoute();
    
        // Создание объекта маршрутизации
        const router = L.Routing.control({
          waypoints: [
            L.latLng(userPosition),
            L.latLng(aim) 
          ],
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: "red", opacity: 0.7, weight: 8 }]
          },
          createMarker: function() { return null; },
          addWaypoints: false,
        }).addTo(map);

        // Обработчик события изменения маршрута
        router.on("routesfound", function(e) {
            const routes = e.routes;
            console.log("Маршруты найдены:", routes);
        });

        setRouteControl(router);
        return router;
    }

    function deleteRoute(){
        if (routeControl) {
            routeControl.remove();
            setRouteControl(null);
        }
    }
    //#endregion

    //#region Visit University
    function clickVisit(l){
        deleteRoute();

        if (l.institute.length > 0){
            if (l.groundFloor)
                setIndex(1)
            setLimitFloors([1 - (l.groundFloor ? 1 : 0),  l.institute.length - (l.groundFloor ? 1 : 0)])
            setPrevPosition(position)
            setPosition(l.door)
            handleButtonClick(l.institute)
        }
    }
    //#endregion

    return (
        <>
            <MenuToggle
                toggleMenu={toggleMenu}
                menuOpen={menuOpen}
            />
            <Menu
                instituteMap={instituteMap}
                clickVisit={clickVisit}
                createRoute={createRoute}
                handleButtonClickBack={handleButtonClickBack}
                toggleMenu={toggleMenu}
                className={`menu ${menuOpen ? 'open' : ''}`}
                setPosition={setPosition}
                locations={locations}
            />
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
                {routeControl &&
                    <CloseButton deleteRoute={deleteRoute} />
                }

                {!instituteMap && 
                <TileLayer
                    accessToken="pk.eyJ1IjoiYXlkbGlvaDA0IiwiYSI6ImNsZzNzaXp3NTA3dXAzam0yZDVpNTUyMHUifQ.TL5S9kqlo1pnh_j5LNjCEA"
                    id="mapbox/streets-v12"
                    tileSize={512}
                    zoomOffset={-1}
                    url={streetMap}
                />}
                
                {instituteMap && 
                <>
                    <ImageOverlay
                        className="map"
                        bounds={bounds}
                        url={instituteMap}
                    />
                    <InstituteNavigation
                        floorNumber={floorNumber}
                        AppOrDownClick={AppOrDownClick}
                        handleButtonClickBack={handleButtonClickBack}
                        limitFloors={limitFloors}
                    />
                </>}
                
                <LocationMarker
                    userPosition={userPosition}
                    setUserPosition={setUserPosition}
                /> 

                <Markers
                    deleteRoute={deleteRoute}
                    clickVisit={clickVisit}
                    createRoute={createRoute}
                    setPosition={setPosition}
                    locations={markers}
                />

            </MapContainer>
        </>
  );
}

