"use client";
import React, { createContext, useContext, useReducer } from "react";
import { LatLngExpression } from "leaflet";

type MapContextType = {
  mapState: MapState;
  setMarkers: (markers: LatLngExpression[]) => void;
  setRoutes: (routes: LatLngExpression[]) => void;
  setPlaceMarker: (
    placeMarker: { number?: number; position: Array<number> } | null,
  ) => void;
  setPlaces: (places: PlaceType[] | null) => void;
  setPlaceInfo: (placeInfo: PlaceType | null) => void;
  setShowPlaceInfo: (showPlaceInfo: boolean) => void;
};

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

type MapState = {
  markers: LatLngExpression[];
  routes: LatLngExpression[];
  placeMarker: {
    number?: number;
    position: number[];
  } | null;
  places: PlaceType[] | null;
  placeInfo: PlaceType | null;
  showPlaceInfo: boolean;
};

type MapAction =
  | {
      type: "set_markers";
      newMarkers: LatLngExpression[];
    }
  | {
      type: "set_routes";
      newRoutes: LatLngExpression[];
    }
  | {
      type: "set_place_marker";
      newPlaceMarker: {
        number?: number;
        position: number[];
      } | null;
    }
  | {
      type: "set_places";
      newPlaces: PlaceType[] | null;
    }
  | {
      type: "set_place_info";
      newPlaceInfo: PlaceType | null;
    }
  | {
      type: "show_place_info";
      showPlaceInfo: boolean;
    };

const MapContext = createContext<MapContextType | null>(null);

const initialState = {
  markers: [],
  routes: [],
  placeMarker: null,
  places: null,
  placeInfo: null,
  showPlaceInfo: false,
};

export const UseMapContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mapState, dispatch] = useReducer(mapReducer, initialState);

  const setMarkers = (markers: LatLngExpression[]) => {
    dispatch({ type: "set_markers", newMarkers: markers });
  };

  const setRoutes = (routes: LatLngExpression[]) => {
    dispatch({ type: "set_routes", newRoutes: routes });
  };

  const setPlaces = (places: PlaceType[] | null) => {
    dispatch({ type: "set_places", newPlaces: places });
  };

  const setPlaceInfo = (place: PlaceType | null) => {
    dispatch({ type: "set_place_info", newPlaceInfo: place });
  };

  const setPlaceMarker = (
    placeMarker: {
      number?: number;
      position: number[];
    } | null,
  ) => {
    dispatch({ type: "set_place_marker", newPlaceMarker: placeMarker });
  };
  const setShowPlaceInfo = (boolean: boolean) => {
    dispatch({ type: "show_place_info", showPlaceInfo: boolean });
  };

  return (
    <MapContext.Provider
      value={{
        mapState,
        setMarkers,
        setRoutes,
        setPlaces,
        setPlaceInfo,
        setPlaceMarker,
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

function mapReducer(state: MapState, action: MapAction) {
  switch (action.type) {
    case "set_markers":
      return { ...state, markers: action.newMarkers };
    case "set_routes":
      return { ...state, routes: action.newRoutes };
    case "set_place_marker":
      return { ...state, placeMarker: action.newPlaceMarker };
    case "set_places":
      return { ...state, places: action.newPlaces };
    case "set_place_info":
      return { ...state, placeInfo: action.newPlaceInfo };
    case "show_place_info":
      return { ...state, showPlaceInfo: action.showPlaceInfo };
    default:
      throw new Error("Unknown action.");
  }
}
