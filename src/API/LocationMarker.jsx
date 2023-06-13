import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

function getUserIcon() {
    return new L.Icon({
      className: "marker-icon",
      iconUrl: require('./user.png'),
      iconSize: [60, 60],
      iconAnchor: [35, 50],
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

            setUserPosition([56.853753250726545,60.64967251241913]); // ТУТ НАДА ИЗМЕНИТЬ
            
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