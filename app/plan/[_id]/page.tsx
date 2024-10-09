"use server";
import PlanContent from "@/components/Plan/PlanContent";
import { UseMapContextProvider } from "@/contexts/UseMapMarkers";
import { DB_getTripNameByDocId } from "@/libs/db/TripsDoc";
import { DB_getPlanByTripsDocId } from "@/libs/db/PlansDoc";
import dynamic from "next/dynamic";
import Loading from "./loading";
import { Suspense } from "react";

const Map = dynamic(() => import("@/components/Plan/Map"), {
  ssr: false,
});

const Plan = async ({ params }: { params: { _id: string } }) => {
  const docId = params._id;

  const [tripInfo, planContent] = await Promise.all([
    DB_getTripNameByDocId(docId),
    DB_getPlanByTripsDocId(docId),
  ]);

  return (
    <main className="absolute top-[60px] flex h-[calc(100dvh-60px)] w-dvw max-[980px]:top-0 max-[980px]:h-dvh max-[980px]:flex-col-reverse">
      <Suspense fallback={<Loading />}>
        <UseMapContextProvider>
          <PlanContent
            docId={docId}
            tripData={tripInfo}
            planDocId={planContent?.planDocId}
            planData={planContent?.planContent}
          />
          <div className="z-0 h-full w-full">
            <Map />
          </div>
        </UseMapContextProvider>
      </Suspense>
    </main>
  );
};

export default Plan;
