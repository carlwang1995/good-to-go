"use client";
import React, { useState, useEffect } from "react";
import CreateTripCard from "@/components/Trips/CreateTripCard";
import EmptyContent from "@/components/Trips/Empty/EmptyContent";
import ListContent from "@/components/Trips/List/ListContent";
import { DB_getTrips } from "@/libs/db/CreateTripPage";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";

const Trips = () => {
  const { isLogin, userName, userId } = useUser();
  const [display, setDisplay] = useState<boolean>(false);
  const [newTrip, setNewTrip] = useState<Array<object> | null>(null);
  const router = useRouter();
  useEffect(() => {
    isLogin
      ? DB_getTrips(userId).then((result) => {
          if (result.length !== 0) {
            setNewTrip(result);
          }
        })
      : router.push("/");
  }, [isLogin, userId, router]);

  const setDialogBoxDisplay = (): void => {
    setDisplay(!display);
  };

  return (
    <main className="flex h-full w-screen justify-center pt-[60px]">
      <div className="mx-10 w-[1100px] p-4">
        <div className="my-5 text-3xl font-bold">Hi, {userName}</div>
        <div className="mb-5 text-xl">您已規劃的行程如下</div>
        <hr className="border-slate-400" />
        {newTrip === null ? (
          <EmptyContent setDialogBoxDisplay={setDialogBoxDisplay} />
        ) : (
          <ListContent
            setDialogBoxDisplay={setDialogBoxDisplay}
            newTrip={newTrip}
          />
        )}

        <CreateTripCard
          userId={userId}
          display={display}
          setDialogBoxDisplay={setDialogBoxDisplay}
        />
      </div>
    </main>
  );
};

export default Trips;
