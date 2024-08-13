"use client";
import React, { useState, useEffect, createContext } from "react";
import CreateTripCard from "@/components/Trips/CreateTripCard";
import EmptyContent from "@/components/Trips/Empty/EmptyContent";
import ListContent from "@/components/Trips/List/ListContent";
import { DB_getTrips } from "@/libs/db/CreateTripPage";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";
import { DB_deleteTrip, DB_deletePlanByDocId } from "@/libs/db/CreateTripPage";

export const pageContext = createContext<any>(null);

type newTripType = {
  docId: string;
  tripName: string;
  startDate: string;
  endDate: string;
};
const Trips = () => {
  const { isLogin, userName, userId } = useUser();
  const [display, setDisplay] = useState<boolean>(false);
  const [newTrip, setNewTrip] = useState<Array<newTripType> | undefined>(
    undefined,
  );
  const [state, setState] = useState<boolean>(false);
  const router = useRouter();

  const deleteTrip = async (docId: string): Promise<void> => {
    try {
      let result = await DB_deleteTrip(docId);
      if (result) {
        DB_deletePlanByDocId(docId);
        setState((pre) => !pre);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    isLogin
      ? DB_getTrips(userId).then((result: any) => {
          if (result.length !== 0) {
            setNewTrip(result);
          } else {
            setNewTrip(undefined);
          }
        })
      : router.push("/");
  }, [isLogin, userId, state]);

  const setDialogBoxDisplay = (): void => {
    setDisplay(!display);
  };

  return (
    <main className="flex h-full w-screen justify-center pt-[60px]">
      <div className="mx-10 w-[1100px] p-4">
        <div className="my-5 text-3xl font-bold">Hi, {userName}</div>
        <div className="mb-5 text-xl">您已規劃的行程如下</div>
        <hr className="border-slate-400" />
        {newTrip === undefined ? (
          <EmptyContent setDialogBoxDisplay={setDialogBoxDisplay} />
        ) : (
          <pageContext.Provider value={deleteTrip}>
            <ListContent
              setDialogBoxDisplay={setDialogBoxDisplay}
              newTrip={newTrip}
            />
          </pageContext.Provider>
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
