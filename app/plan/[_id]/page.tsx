import React from "react";
import Map from "@/components/Plan/Map";
import PlanProvider from "@/components/Plan/PlanProvider";
import { UseMapContextProvider } from "@/contexts/UseMapMarkers";

const Plan = ({ params }: { params: { _id: string } }) => {
  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <UseMapContextProvider>
        <PlanProvider docId={params._id} />
        <div className="z-0 h-full w-full">
          <Map />
        </div>
      </UseMapContextProvider>
    </main>
  );
};

export default Plan;
