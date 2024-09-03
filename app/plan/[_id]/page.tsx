import React from "react";
import PlanContent from "@/components/Plan/PlanContent";
import { UseMapContextProvider } from "@/contexts/UseMapMarkers";
import { DB_getTripNameByDocId } from "@/libs/db/TripsDoc";
import { unstable_noStore as noStore } from "next/cache";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Plan/Map"), {
  ssr: false,
});

const Plan = async ({ params }: { params: { _id: string } }) => {
  noStore();
  const tripInfo: any = await DB_getTripNameByDocId(params._id);
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
