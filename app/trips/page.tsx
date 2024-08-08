"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateTripCard from "@/components/CreateTripCard";
import Link from "next/link";

const Trips = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [newTrip, setNewTrip] = useState<Array<object> | null>(null);

  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(String(user.displayName));
        // console.log(user);
      } else {
        router.push("/");
      }
    });
  }, [router]);

  const setDialogBoxDisplay = () => {
    setDisplay(!display);
  };

  return (
    <main className="flex h-screen w-screen justify-center pt-[60px]">
      <div className="mx-10 w-[1100px] p-4">
        <div className="mb-5 text-3xl font-bold">HI! {userName}</div>
        <div className="mb-5 text-2xl">您已規劃的行程如下：</div>
        <hr />
        {newTrip === null ? (
          <div className="m-8 w-full">
            <div className="flex flex-col items-center">
              <div className="text-xl">
                <p>立即規劃行程，為旅遊輕鬆做準備</p>
              </div>
              <button
                onClick={setDialogBoxDisplay}
                className="mt-5 rounded border-[1px] border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
              >
                開始規劃
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 flex w-full justify-end">
              <button
                onClick={setDialogBoxDisplay}
                className="rounded border-[1px] border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
              >
                新增行程
              </button>
            </div>
            <div className="flex w-full flex-wrap">
              {newTrip.map((trip: any, index) => (
                <div
                  key={index}
                  className="m-5 w-[300px] rounded-lg border border-solid border-black bg-white"
                >
                  <Link href="/trips/66ac9fee9d031371f0d9d976">
                    <div className="hover:shadow-xl">
                      <div className="h-[130px] w-full rounded-tl-lg rounded-tr-lg bg-slate-500"></div>
                      <div className="px-2 py-5 text-xl font-bold">
                        {trip.tripName}
                      </div>
                      <div className="flex px-2 pb-5">
                        <div>{trip.startDate}</div>
                        <div className="mx-2">~</div>
                        <div>{trip.endDate}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
        <CreateTripCard
          display={display}
          setDialogBoxDisplay={setDialogBoxDisplay}
          newTrip={newTrip}
          setNewTrip={setNewTrip}
        />
      </div>
    </main>
  );
};

export default Trips;
