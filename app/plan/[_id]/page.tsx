"use client";
import React, { useState } from "react";
import Map from "@/components/Plan/Map";
import PlanContent from "@/components/Plan/PlanContent";
import { MarkerContext } from "@/contexts/ContextProvider";
import { LatLngExpression } from "leaflet";

const Plan = ({ params }: { params: { _id: string } }) => {
  const [markers, setMarkers] = useState<LatLngExpression[]>([]);
  const [placeLatLng, setPlaceLatLng] = useState<{
    number?: number;
    position: Array<number>;
  } | null>(null);

  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <MarkerContext.Provider value={{ setMarkers, setPlaceLatLng }}>
        <PlanContent docId={params._id} />
        <div className="z-0 h-full w-full">
          <Map markers={markers} placeLatLng={placeLatLng} />
        </div>
      </MarkerContext.Provider>
    </main>
  );
};

export default Plan;
