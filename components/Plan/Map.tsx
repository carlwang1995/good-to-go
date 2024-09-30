"use client";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DivIcon, LatLngExpression } from "leaflet";
import { useState, useEffect } from "react";
import { useMapMarkers } from "@/contexts/UseMapMarkers";

// 預設畫面圖層：依座標自動縮放到合適大小及位置
const FitMapToBounds = ({ bounds }: { bounds: any }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, bounds]);
  return null;
};

// 景點位置圖層：繪製圖示，並依景點座標移動位置
const SetPlaceView = ({
  latlng,
}: {
  latlng: {
    number?: number;
    position: any;
  } | null;
}) => {
  const selectIcon = new DivIcon({
    iconAnchor: [25, 50],
    iconSize: [50, 50],
    html: `<img src='/pin2.png' style='width:100%;height:100%;position:relative;'><div style='position:absolute;width:100%;height:100%;top:0;right:0;display:flex;justify-content:center;'><p style='font-size:14px; font-weight:700;color:#FFFFFF;margin-top:8px'>${latlng?.number ? latlng.number : ""}</p></div></img>`,
    className: "my-div-icon",
  });
  const map = useMap();
  useEffect(() => {
    if (map && latlng) {
      map.setView(latlng.position, 16);
    }
  }, [latlng, map]);
  return (
    <>
      {latlng && (
        <Marker
          position={latlng.position}
          icon={selectIcon}
          zIndexOffset={10}
        />
      )}
    </>
  );
};

const LeafletMap = () => {
  const { mapState, setPlaceMarker, setPlaceInfo, setShowPlaceInfo } =
    useMapMarkers();
  const [icons, setIcons] = useState<Array<DivIcon>>([]);

  const markerHandler = (index: number, latlng: any) => {
    setPlaceMarker({ number: index + 1, position: latlng });
    setShowPlaceInfo(true);
    setPlaceInfo(mapState.places![index]);
  };

  const mapMarkers = mapState.markers.map((location: any) => {
    return {
      geocode: [location[0], location[1]],
    };
  });
  useEffect(() => {
    setIcons([]);
    if (mapState.markers.length > 0) {
      let myIcons = [];
      for (let i = 1; i <= mapState.markers.length; i++) {
        myIcons.push(
          new DivIcon({
            iconAnchor: [22.5, 45],
            iconSize: [45, 45],
            html: `<img src='/pin1.png' style='width:100%;height:100%;position:relative;'><div style='position:absolute;width:100%;height:100%;top:0;right:0;display:flex;justify-content:center;'><p style='font-weight:700;color:#FFFFFF;margin-top:8px'>${i}</p></div></img>`,
            className: "my-div-icon",
          }),
        );
      }
      setIcons(myIcons);
    }
  }, [mapState.markers]);

  const colorOptions = {
    blue: { color: "rgb(0,110,255,0.8)", weight: 8 },
    lightBlue: { color: "rgb(0,110,255,0.3)", weight: 4 },
  };
  return (
    <MapContainer
      center={[25.051663, 121.550023]}
      zoom={14}
      scrollWheelZoom={true}
      className="h-full w-full"
      zoomControl={false}
      maxZoom={16}
      minZoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {icons.length > 0 &&
        mapMarkers.map(
          (marker: any, index: number) =>
            icons[index] && (
              <Marker
                position={marker.geocode}
                key={index}
                icon={icons[index]}
                eventHandlers={{
                  click: () => markerHandler(index, marker.geocode),
                }}
              />
            ),
        )}
      <ZoomControl position="bottomright" />
      <FitMapToBounds bounds={mapState.markers} />
      <SetPlaceView latlng={mapState.placeMarker} />
      <Polyline
        pathOptions={
          process.env.NODE_ENV == "production"
            ? colorOptions.blue
            : colorOptions.lightBlue
        }
        positions={
          process.env.NODE_ENV == "production"
            ? mapState.routes
            : mapState.markers
        }
      />
    </MapContainer>
  );
};

export default LeafletMap;
