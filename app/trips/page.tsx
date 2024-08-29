"use client";
import React, { useState, useEffect } from "react";
import { DB_getTrips } from "@/libs/db/CreateTripPage";
import { useUser } from "@/contexts/UserAuth";
import { StateContext } from "@/contexts/ContextProvider";
import { useRouter } from "next/navigation";
import TripsContent from "@/components/Trips/TripsContent";

type newTripType = {
  docId: string;
  userId: string;
  tripName: string;
  destination: Array<string>;
  dates: Array<string>;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
  privacy: boolean;
  createTime: string;
};

const Trips = () => {
  const [state, setState] = useState<boolean>(false);
  const [newTrip, setNewTrip] = useState<Array<newTripType>>([]);
  const { isLogin, userName, userId } = useUser();
  const router = useRouter();

  // 驗證登入狀態
  useEffect(() => {
    isLogin
      ? DB_getTrips(userId).then((result: any) => {
          if (result && result.length !== 0) {
            setNewTrip(result);
          } else {
            setNewTrip([]);
          }
        })
      : router.push("/");
  }, [isLogin, userId, state]);

  return (
    <main className="flex h-full w-screen justify-center pt-[60px]">
      <div className="mx-10 w-[1100px] p-4">
        <div className="my-5 text-3xl font-bold">
          Hi, {userName ? userName : "使用者"}
        </div>
        <StateContext.Provider value={setState}>
          <TripsContent newTrip={newTrip} />
        </StateContext.Provider>
      </div>
    </main>
  );
};

export default Trips;
