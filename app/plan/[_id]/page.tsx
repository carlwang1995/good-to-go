"use server";
import PlanContent from "@/components/Plan/PlanContent";
import { UseMapContextProvider } from "@/contexts/UseMapMarkers";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Plan/Map"), {
  ssr: false,
});

const Plan = async ({ params }: { params: { _id: string } }) => {
  const docId = params._id;
  return (
    <main className="absolute top-[60px] flex h-[calc(100dvh-60px)] w-dvw max-[980px]:top-0 max-[980px]:h-dvh max-[980px]:flex-col-reverse">
      <UseMapContextProvider>
        <PlanContent docId={docId} />
        <div className="z-0 h-full w-full">
          <Map />
        </div>
      </UseMapContextProvider>
    </main>
  );
};

export default Plan;
