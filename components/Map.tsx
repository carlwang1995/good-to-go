import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useState, useRef } from "react";
import { useMapEvents } from "react-leaflet";

const myIcon = new Icon({
  // iconUrl: require("../public/location2.png"),
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4284/4284108.png",
  iconSize: [50, 50],
});

// function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     click() {
//       map.locate();
//     },
//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position} icon={myIcon}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

function SetViewOnClick({ animateRef }: any) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current,
    });
  });

  return null;
}

const LeafletMap = (props: any) => {
  const animateRef = useRef(true);
  const markers: object[] = [
    { geocode: [25.038345, 121.537754], popUp: "1" },
    { geocode: [25.051663, 121.550023], popUp: "2" },
    { geocode: [25.054308, 121.567306], popUp: "3" },
  ];
  return (
    <MapContainer
      center={[25.051663, 121.550023]}
      zoom={14}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker: any, index: number) => (
        <Marker position={marker.geocode} key={index} icon={myIcon}>
          <Popup>
            <h1 className="text-center font-bold">{marker.popUp}</h1>
          </Popup>
        </Marker>
      ))}
      {/* <LocationMarker /> */}
      <SetViewOnClick animateRef={animateRef} />
    </MapContainer>
  );
};

export default LeafletMap;
