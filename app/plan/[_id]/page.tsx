import React, { useState } from "react";
import Map from "@/components/Plan/Map";
import PlanContent from "@/components/Plan/PlanContent";

const Plan = ({ params }: { params: { _id: string } }) => {
  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <PlanContent docId={params._id} />
      <div className="z-0 h-full w-full">
        <Map />
      </div>
    </main>
  );
};

export default Plan;
