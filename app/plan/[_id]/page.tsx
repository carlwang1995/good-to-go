import React from "react";
import PlanContent from "@/components/Plan/PlanContent";
import { UseMapContextProvider } from "@/contexts/UseMapMarkers";
import { DB_getTripNameByDocId } from "@/libs/db/EditTripPage";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Plan/Map"), {
  ssr: false,
});

const getFreshTripData = async (docId: string) => {
  return await DB_getTripNameByDocId(docId);
};

const Plan = async ({ params }: { params: { _id: string } }) => {
  const tripInfo: any = await getFreshTripData(params._id);
  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <UseMapContextProvider>
        <PlanContent docId={params._id} tripInfo={tripInfo} />
        <div className="z-0 h-full w-full">
          <Map />
        </div>
      </UseMapContextProvider>
    </main>
  );
};

export default Plan;
