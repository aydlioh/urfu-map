import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function getIcon(color) {
    return new L.Icon({
      className: "marker-icon",
      iconUrl: `data:image/svg+xml;charset=utf-8,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <path fill="${color}" d="M12 22s-8-6.5-8-13a8 8 0 1 1 16 0c0 6.5-8 13-8 13z"/>
          <circle cx="12" cy="9" r="5" fill="white" />
        </svg>`,
      iconSize: [45, 45],
      iconAnchor: [23, 20],
    });
}

export default function Markers( {deleteRoute, clickVisit, createRoute, setPosition, locations }) {
    
    function clickMarker(e) {
        const marker = e.target;
        const result = marker.getLatLng();
        setPosition([result.lat, result.lng]);
    }

    function clickCreateRoute(pos){
        createRoute(pos);
    }

    return (
        <>
        {locations.map((l) => (
            <Marker
                key={l.id}
                icon={getIcon(l.color)}
                position={l.position}
                eventHandlers={{ click: clickMarker }}
                >
                <Popup>
                    <h1 className="marker__title">{l.title}</h1>
                    <div className="marker__text">{l.text}</div>
                    <div className="marker__btns">
                        <a onClick={() => clickVisit(l)} className="marker__btn" href="#" style={{ backgroundColor: l.color }}>Посетить</a>
                        <a onClick={() => clickCreateRoute(l.position)} className="marker__btn" href="#"  style={{ backgroundColor: l.color }}>Маршрут</a>
                    </div>
                </Popup>
            </Marker>
        ))}
        </>
    );
}
