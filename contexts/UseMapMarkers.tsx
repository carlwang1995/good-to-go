"use client";
import React, { createContext, useContext, useState } from "react";
import { LatLngExpression } from "leaflet";

type MapContextType = {
  markers: LatLngExpression[];
  routes: LatLngExpression[];
  placeLatLng: { number?: number; position: Array<number> } | null;
  places: Array<PlaceType> | undefined;
  placeInfo: PlaceType | undefined;
  showPlaceInfo: boolean;
  setMarkers: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
  setRoutes: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
  setPlaceLatLng: React.Dispatch<
    React.SetStateAction<{ number?: number; position: Array<number> } | null>
  >;
  setPlaces: React.Dispatch<React.SetStateAction<Array<PlaceType> | undefined>>;
  setPlaceInfo: React.Dispatch<React.SetStateAction<PlaceType | undefined>>;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: Array<string>;
}

export const UseMapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);
  const [routes, setRoutes] = useState<LatLngExpression[]>([]);
  const [placeLatLng, setPlaceLatLng] = useState<{
    number?: number;
    position: Array<number>;
  } | null>(null);
  const [places, setPlaces] = useState<Array<PlaceType>>();
  const [placeInfo, setPlaceInfo] = useState<PlaceType>();
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);
  return (
    <MapContext.Provider
      value={{
        markers,
        routes,
        placeLatLng,
        places,
        placeInfo,
        showPlaceInfo,
        setMarkers,
        setPlaceLatLng,
        setRoutes,
        setPlaces,
        setPlaceInfo,
        setShowPlaceInfo,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapMarkers = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("Can't access MapContext.");
  }
  return context;
};
