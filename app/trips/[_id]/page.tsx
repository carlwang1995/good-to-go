import TripEdit from "@/components/TripEdit";
import React from "react";

const Plan = ({ params }: any) => {
  return (
    <main className="flex h-screen w-screen pt-[50px]">
      <div className="fixed h-full w-[500px] bg-white">
        <TripEdit />
      </div>
      <div className="flex h-full w-full items-center justify-center bg-gray-400 pl-[500px]">
        <p className="text-2xl">MAP</p>
      </div>
    </main>
  );
};

export default Plan;
