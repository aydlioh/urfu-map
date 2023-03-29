import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function Markers( {locations}) {

    const icon = new L.Icon({
        className: "marker-icon",
        iconUrl: `data:image/svg+xml;charset=utf-8,
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path fill="red" d="M12 22s-8-6.5-8-13a8 8 0 1 1 16 0c0 6.5-8 13-8 13z"/>
                <circle cx="12" cy="9" r="5" fill="white" />
            </svg>`,
        iconSize: [45, 45],
        iconAnchor: [23, 20],
      });

    return (
        <>
        {locations.map((l) => (
            <Marker key={l.id} icon={icon} position={l.position}>
                <Popup>
                    <h1 className="marker__title">{l.title}</h1>
                    <span className="marker__text">{l.text}</span>
                </Popup>
            </Marker>
        ))}
        </>
    );
}

export default Markers;