import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

function getUserIcon(color) {
    return new L.Icon({
      className: "marker-icon",
      iconUrl: `data:image/svg+xml;charset=utf-8,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(255, 50, 50)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <path fill="rgb(255, 50, 50)" d="M12 22s-8-6.5-8-13a8 8 0 1 1 16 0c0 6.5-8 13-8 13z"/>
          <circle cx="12" cy="9" r="5" fill="white" />
        </svg>`,
      iconSize: [56, 56],
      iconAnchor: [23, 20],
    });
}

export function LocationMarker({userPosition, setUserPosition}) {
    useMapEvents({
      locationfound(e) {
        const { lat, lng } = e.latlng;
        console.log("Координаты пользователя:", lat, lng);
      },
    });
  
    useEffect(() => {
      // Проверяем доступность Geolocation API в браузере
      if ("geolocation" in navigator) {
        // Запрашиваем разрешение на определение местоположения
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            setUserPosition([latitude, longitude]);
            
            console.log("Разрешение получено");
            console.log("Координаты пользователя:", latitude, longitude);
          },
          (error) => {
            console.error("Ошибка при получении координат пользователя:", error);
          }
        );
      } else {
        console.warn("Geolocation не поддерживается в данном браузере");
      }
    }, [setUserPosition]);
  
    
    return(
        <Marker
            key={777}
            icon={getUserIcon()}
            position={userPosition}
            >
            <Popup>
                <h1 className="marker__title">Ваше местоположение</h1>
                {/*                 
                <div className="marker__text">Широта ({userPosition[0]})</div>
                <div className="marker__text">Долгота ({userPosition[1]})</div>
                */}
            </Popup>
        </Marker>
    )
}