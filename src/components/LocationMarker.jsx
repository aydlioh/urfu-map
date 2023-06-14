import { useMapEvents, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

function getUserIcon() {
    return new L.Icon({
      className: "marker-icon",
      iconUrl: require('../images/user.png'),
      iconSize: [60, 60],
      iconAnchor: [35, 50],
    });
}

export function LocationMarker({userPosition, setUserPosition, setPosition}) {
    useMapEvents({
      locationfound(e) {
        const { lat, lng } = e.latlng;
        console.log("Координаты пользователя:", lat, lng);
      },
    });
  
    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            // ТУТ НАДА ИЗМЕНИТЬ
            //setUserPosition([latitude, longitude]);
            // if (userPosition[0] === 0){
            //     setPosition([latitude, longitude]);
            // }
            
            setUserPosition([56.833753250726545,60.64967251241913]); 
            if (userPosition[0] === 0){
                setPosition([56.833753250726545,60.64967251241913]);
            }
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
            </Popup>
        </Marker>
    )
}