"use client";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvent,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";
import { useState, useRef, useEffect } from "react";

const myIcon = new Icon({
  iconUrl: "/placeholder.png",
  iconSize: [35, 35],
});

const selectIcon = new Icon({
  iconUrl: "/placeholder2.png",
  iconSize: [60, 60],
});

function SetViewOnClick({ animateRef }: any) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current,
    });
  });
  return null;
}

function SetPlaceView({ latlng }: { latlng: any | null }) {
  const map = useMap();
  useEffect(() => {
    if (latlng) {
      map.setView(latlng, map.getZoom());
    }
  }, [latlng, map]);
  return (
    <>
      {latlng ? (
        <Marker position={latlng} icon={selectIcon} zIndexOffset={10}></Marker>
      ) : null}
    </>
  );
}

const RecenterMap = ({ center }: { center: any }) => {
  const map = useMap();
  useEffect(() => {
    if (center && !isNaN(center[0]) && !isNaN(center[1])) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

type LeafletMapProps = {
  markers: LatLngExpression[];
  placeLatLng: number[] | null;
};
const LeafletMap = ({ markers, placeLatLng }: LeafletMapProps) => {
  const animateRef = useRef(true);
  const [center, setCenter] = useState<number[] | null>(null);

  const mapMarkers = markers.map((location: any) => {
    return {
      geocode: [location[0], location[1]],
    };
  });

  // 計算中心點
  useEffect(() => {
    let newCenter = [0, 0];
    if (markers.length > 0) {
      markers.forEach((location: any) => {
        newCenter[0] += location[0];
        newCenter[1] += location[1];
      });
    }
    newCenter[0] = newCenter[0] / markers.length;
    newCenter[1] = newCenter[1] / markers.length;
    setCenter(newCenter);
  }, [markers]);

  // const markers: object[] = [
  //   { geocode: [25.038345, 121.537754], popUp: "1" },
  //   { geocode: [25.051663, 121.550023], popUp: "2" },
  //   { geocode: [25.054308, 121.567306], popUp: "3" },
  // ];
  const blueOptions = { color: "rgb(0,110,255,0.4)", weight: 6 };
  return (
    <MapContainer
      center={[25.051663, 121.550023]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapMarkers.map((marker: any, index: number) => (
        <Marker position={marker.geocode} key={index} icon={myIcon}>
          {/* <Popup>
            <h1 className="text-center font-bold">{marker.popUp}</h1>
          </Popup> */}
        </Marker>
      ))}
      <SetViewOnClick animateRef={animateRef} />
      <RecenterMap center={center} />
      <SetPlaceView latlng={placeLatLng} />
      <Polyline pathOptions={blueOptions} positions={markers} />
    </MapContainer>
  );
};

export default LeafletMap;
