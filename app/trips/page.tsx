"use server";
import TripsContent from "@/components/Trips/TripsContent";
import { Suspense } from "react";
import Loading from "./loading";

const Trips = () => {
  return (
    <main className="flex h-full w-screen justify-center pt-[60px]">
      <Suspense fallback={<Loading />}>
        <TripsContent />
      </Suspense>
    </main>
  );
};

export default Trips;
