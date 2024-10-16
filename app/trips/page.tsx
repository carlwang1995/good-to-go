"use server";
import TripsContent from "@/components/Trips/TripsContent";
import TripsContentSkeleton from "@/components/Trips/TripsContentSkeleton";
import { Suspense } from "react";

const Trips = () => {
  return (
    <main className="flex h-full w-screen justify-center pt-[60px]">
      <Suspense fallback={<TripsContentSkeleton />}>
        <TripsContent />
      </Suspense>
    </main>
  );
};

export default Trips;
