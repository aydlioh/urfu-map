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

function Markers( {setPosition, locations }) {

    
    function handleMarkerClick(e) {
    const marker = e.target;
    const result = marker.getLatLng();
    setPosition([result.lat, result.lng]);
    }

    // function handleButtonClick(e) {
    //     e.preventDefault();
    //     const newTileLayer = "https://psv4.userapi.com/c237031/u237062606/docs/d38/6c88f7b8d22b/imgonline-com-ua-Replace-color-kJmp92c9gM3Q.png?extra=h7xc8JvG9k74Z1am4SOY54lnOwxomgpV65g6r-vp9ZG5psXgPb21FrhuXSPABfe6EMPHjsECmObSf0MWULpgeX6FpvCno78PyR47sDaIIAGQdC8ll625hAW2Vv0Y8XafvjQ9VXEk3mld1E3AvoKIFg";        setTileLayer(newTileLayer);
    // }

    return (
        <>
        {locations.map((l) => (
            <Marker
                key={l.id}
                icon={getIcon(l.color)}
                position={l.position}
                eventHandlers={{ click: handleMarkerClick }}
                >
                <Popup>
                    <h1 className="marker__title">{l.title}</h1>
                    <div className="marker__text">{l.text}</div>
                    <a className="marker__btn" href="#"  style={{ backgroundColor: l.color }}>Посетить</a>
                </Popup>
            </Marker>
        ))}
        </>
    );
}

export default Markers;