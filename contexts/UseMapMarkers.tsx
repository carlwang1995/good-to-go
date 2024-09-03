"use client";
import React, { createContext, useContext, useState } from "react";
import { LatLngExpression } from "leaflet";

type MapContextType = {
  markers: LatLngExpression[];
  placeLatLng: { number?: number; position: Array<number> } | null;
  routes: LatLngExpression[];
  setMarkers: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
  setPlaceLatLng: React.Dispatch<
    React.SetStateAction<{ number?: number; position: Array<number> } | null>
  >;
  setRoutes: React.Dispatch<React.SetStateAction<LatLngExpression[]>>;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

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
  return (
    <MapContext.Provider
      value={{
        markers,
        routes,
        placeLatLng,
        setMarkers,
        setPlaceLatLng,
        setRoutes,
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
