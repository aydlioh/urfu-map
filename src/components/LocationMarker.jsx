import { useMapEvents, Marker, Popup } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

function getUserIcon() {
  return new L.Icon({
    className: 'marker-icon',
    iconUrl: require('../assets/images/user.png'),
    iconSize: [60, 60],
    iconAnchor: [35, 50],
  });
}

export function LocationMarker({
  start,
  setStart,
  userPosition,
  setUserPosition,
  setPosition,
}) {
  useMapEvents({
    locationfound(e) {
      const { lat, lng } = e.latlng;
      console.log('Координаты пользователя:', lat, lng);
    },
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const bounds = [
            [56.87154542458642 + 0.05, 60.520703299803316 - 0.17],
            [56.814346593446686 - 0.05, 60.714337333006426 + 0.17],
          ];
          console.log('Coordinates received', [latitude, longitude]);
          if (
            userPosition[0] === 0 &&
            bounds[1][0] < latitude &&
            latitude < bounds[0][0] &&
            bounds[0][1] < longitude &&
            longitude < bounds[1][1]
          ) {
            if (start) {
              setStart(false);
              setPosition([latitude, longitude]);
            }
          }
          setUserPosition([latitude, longitude]);
          return null;

          // setUserPosition([56.833753250726545,60.64967251241913]);
          // if (start) {
          //     setStart(false);
          //     setPosition([56.833753250726545,60.64967251241913]);
          // }
          // return null;
        },
        (error) => {
          console.error('Ошибка при получении координат пользователя:', error);
        }
      );
    } else {
      console.warn('Geolocation не поддерживается в данном браузере');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            setUserPosition([latitude, longitude]);
            // setUserPosition([56.833753250726545,60.64967251241913]);
            console.log('Coordinates update', userPosition);
          },
          (error) => {
            console.error(
              'Ошибка при получении координат пользователя:',
              error
            );
          }
        );
      } else {
        console.warn('Geolocation не поддерживается в данном браузере');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userPosition]);

  return (
    <Marker key={777} icon={getUserIcon()} position={userPosition}>
      <Popup>
        <h1 className="marker__title">Ваше местоположение</h1>
      </Popup>
    </Marker>
  );
}
