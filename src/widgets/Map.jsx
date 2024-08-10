import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-geosearch/dist/geosearch.css';

import { useEffect, useRef, useState } from 'react';
import { Menu } from './Menu';
import {
  RouteContoler,
  MenuToggle,
  LocationMarker,
  Markers,
  InstituteNavigation,
  CloseButton,
} from '../components';

export function Map({ locations }) {
  const routeApiKey = process.env.REACT_APP_ROUTE_API_KEY;
  const mapApiKey = process.env.REACT_APP_MAP_API_KEY;

  const [userPosition, setUserPosition] = useState([0, 0]);

  const [position, setPosition] = useState([
    56.84384143906293, 60.65234332360141,
  ]);
  const [menuOpen, setMenuOpen] = useState(false);

  const bounds = new LatLngBounds(
    [56.87154542458642 + 0.05, 60.520703299803316 - 0.17],
    [56.814346593446686 - 0.05, 60.714337333006426 + 0.17]
  );
  const mapRef = useRef(null);
  //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
  //     "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
  //     "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
  //     "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const streetMap =
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
  const [start, setStart] = useState(true);
  const [markers, setMarkers] = useState([]);

  const [instituteMap, setInstituteMap] = useState('');
  const [institute, setInstitute] = useState([]);

  const [index, setIndex] = useState(0);
  const [floorNumber, setFloorNumber] = useState(1);
  const [limitFloors, setLimitFloors] = useState([0, 0]);

  const [prevPosition, setPrevPosition] = useState(position);

  const [minZoom, setMinZoom] = useState(14);

  const [maxZoom, setMaxZoom] = useState(18);
  const [zoom, setZoom] = useState(18);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

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
        animate: true,
      });
      console.log(position);

      setPosition([newCenter.lat, newCenter.lng]);
    } else setPosition([center.lat, center.lng]);
  }

  function handleButtonClick(ins) {
    if (ins.length > index) {
      setMarkers([]);

      setInstituteMap(ins[index]);

      setInstitute(ins);
      zoomToPosition(0.2, 12);
      setMaxZoom(14);
      setZoom(12);
      setMinZoom(11);
    }
  }

  function handleButtonClickBack() {
    if (instituteMap) {
      setMarkers(locations);
      setInstituteMap('');
      setInstitute([]);

      setMaxZoom(18);
      setZoom(18);
      setMinZoom(14);

      setIndex(0);
      setFloorNumber(1);

      setPosition(prevPosition);
    }
  }

  function AppOrDownClick(offset) {
    if (offset === 1 && index < institute.length - 1) {
      setIndex((prevId) => prevId + offset);
      setFloorNumber(() => floorNumber + 1);
    } else if (offset === -1 && index > 0) {
      setIndex((prevId) => prevId + offset);
      setFloorNumber(() => floorNumber - 1);
    }
  }

  useEffect(() => {
    setMarkers(locations);
  }, [locations]);

  useEffect(() => {
    zoomToPosition(0.4, 18);
  }, [position]);

  useEffect(() => {
    setInstituteMap(institute[index]);
  }, [index, institute]);

  const [isFootRouter, setIsFootRouter] = useState(true);
  const [routeControl, setRouteControl] = useState(null);
  const [routeAim, setRouteAim] = useState([0, 0]);

  function createCarRoute(aim) {
    setRouteAim(aim);
    const map = mapRef.current;
    deleteRoute();

    const router = L.Routing.control({
      waypoints: [L.latLng(userPosition), L.latLng(aim)],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'red', opacity: 0.7, weight: 8 }],
      },
      createMarker: function () {
        return null;
      },
      addWaypoints: false,
      profile: 'foot',
    }).addTo(map);

    router.on('routesfound', function (e) {
      const routes = e.routes;
      console.log('Маршруты найдены:', routes);
    });

    setRouteControl(router);
    return router;
  }

  function createFootRoute(aim) {
    setRouteAim(aim);
    const map = mapRef.current;
    deleteRoute();

    const start = `${userPosition[1]},${userPosition[0]}`;
    const end = `${aim[1]},${aim[0]}`;
    const url = `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${routeApiKey}&start=${start}&end=${end}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.features[0].geometry.coordinates;
        const latLngs = coordinates.map((coordinate) =>
          L.latLng(coordinate[1], coordinate[0])
        );

        const route = L.polyline(latLngs, {
          color: 'blue',
          opacity: 0.7,
          weight: 8,
        }).addTo(map);

        setRouteControl(route);
      })
      .catch((error) => {
        console.error('Ошибка при получении маршрута:', error);
      });
  }

  function deleteRoute() {
    if (routeControl) {
      routeControl.remove();
      setRouteControl(null);
    }
  }

  function clickVisit(l, prevPos = position) {
    deleteRoute();

    setTimeout(() => {
      if (l.institute.length > 0) {
        if (l.groundFloor) setIndex(1);
        setLimitFloors([
          1 - (l.groundFloor ? 1 : 0),
          l.institute.length - (l.groundFloor ? 1 : 0),
        ]);
        setPrevPosition(prevPos);
        setPosition(l.door);
        handleButtonClick(l.institute);
      }
    }, 1);
  }

  return (
    <>
      {!instituteMap && (
        <RouteContoler
          createCarRoute={createCarRoute}
          createFootRoute={createFootRoute}
          routeAim={routeAim}
          routeControl={routeControl}
          isFootRouter={isFootRouter}
          setIsFootRouter={setIsFootRouter}
        />
      )}

      <MenuToggle toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <Menu
        instituteMap={instituteMap}
        clickVisit={clickVisit}
        createRoute={isFootRouter ? createFootRoute : createCarRoute}
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
        {routeControl && <CloseButton deleteRoute={deleteRoute} />}

        {!instituteMap && (
          <TileLayer
            accessToken={mapApiKey}
            id="mapbox/streets-v12"
            tileSize={512}
            zoomOffset={-1}
            url={streetMap}
          />
        )}

        {!instituteMap && (
          <LocationMarker
            setStart={setStart}
            start={start}
            setPosition={setPosition}
            userPosition={userPosition}
            setUserPosition={setUserPosition}
          />
        )}

        {instituteMap && (
          <>
            <ImageOverlay className="map" bounds={bounds} url={instituteMap} />
            <InstituteNavigation
              floorNumber={floorNumber}
              AppOrDownClick={AppOrDownClick}
              handleButtonClickBack={handleButtonClickBack}
              limitFloors={limitFloors}
            />
          </>
        )}

        <Markers
          deleteRoute={deleteRoute}
          clickVisit={clickVisit}
          createRoute={isFootRouter ? createFootRoute : createCarRoute}
          setPosition={setPosition}
          locations={markers}
        />
      </MapContainer>
    </>
  );
}
