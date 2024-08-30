"use client";
import React, { createContext, useContext, useState } from "react";
import { LatLngExpression } from "leaflet";

type MapContextType = {
  markers: LatLngExpression[];
  placeLatLng: { number?: number; position: Array<number> } | null;
  setMarkers: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
  setPlaceLatLng: React.Dispatch<
    React.SetStateAction<{ number?: number; position: Array<number> } | null>
  >;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const UseMapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);
  const [placeLatLng, setPlaceLatLng] = useState<{
    number?: number;
    position: Array<number>;
  } | null>(null);
  return (
    <MapContext.Provider
      value={{ markers, placeLatLng, setMarkers, setPlaceLatLng }}
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
