import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from 'leaflet';
import "leaflet-geosearch/dist/geosearch.css";
import './index.css'

const locations = [
    { title: 'IRIT-RTF', position: [56.8407612141831,60.650770100687744], text: "RADIOFUCKFUFUCKFCUFUC" },
    { title: 'UrFU', position: [56.84402578520124,60.65402538441558], text: "Главный Учебный Кшарага" },
    { title: 'FTI', position: [56.84272134350719,60.651682882212874], text: "Mesto Obytaniya Daunov" },
    { title: 'SK-11', position: [56.83757683350624,60.656424837172274], text: "Тараканье логово"},
    { title: 'ЧЗХ Тимлид?!', position: [56.83369559643219,60.64982655036045], text: "Когда ТЗ?"}
  ];

function Map( {position}) {

    
    const icon = new L.Icon({
        className:'marker-icon',
        iconUrl: `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path fill="red" d="M12 22s-8-6.5-8-13a8 8 0 1 1 16 0c0 6.5-8 13-8 13z"/>
        <circle cx="12" cy="9" r="5" fill="white" />
      </svg>`,
        iconSize: [45, 45],
        iconAnchor: [23, 20]
    });

    return(
      <MapContainer className="map" center={position} zoom={17} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
        <Marker icon={icon} position={location.position}>
          <Popup>
            <h1 className="marker__title">{location.title}</h1>
            <span className="marker__text">{location.text}</span>
          </Popup>
        </Marker>
        ))}
      </MapContainer>
    )
}

export default Map;