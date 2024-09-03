"use server";
import React from "react";
import PlanContent from "@/components/Plan/PlanContent";
import { UseMapContextProvider } from "@/contexts/UseMapMarkers";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Plan/Map"), {
  ssr: false,
});

const Plan = async ({ params }: { params: { _id: string } }) => {
  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <UseMapContextProvider>
        <PlanContent docId={params._id} />
        <div className="z-0 h-full w-full">
          <Map />
        </div>
      </UseMapContextProvider>
    </main>
  );
};

export default Plan;
