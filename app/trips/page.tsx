"use server";
import React from "react";
import { TripsProvider } from "@/components/Trips/TripsProvider";

const Trips = () => {
  return (
    <main className="flex h-full w-screen justify-center pt-[60px]">
      <TripsProvider />
    </main>
  );
};

export default Trips;
