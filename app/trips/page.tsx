"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateTripCard from "@/components/CreateTrip/CreateTripCard";
import EmptyContent from "@/components/CreateTrip/Empty/EmptyContent";
import ListContent from "@/components/CreateTrip/List/ListContent";

const Trips = () => {
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);
  const [newTrip, setNewTrip] = useState<Array<object> | null>(null);

  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(String(user.displayName));
        setUserId(String(user.uid));
        // console.log(user.uid);
      } else {
        router.push("/");
      }
    });
  }, [router]);

  const setDialogBoxDisplay = (): void => {
    setDisplay(!display);
  };

  return (
    <main className="flex h-screen w-screen justify-center bg-slate-100 pt-[60px]">
      <div className="mx-10 w-[1100px] p-4">
        <div className="my-5 text-3xl font-bold">Hi, {userName}</div>
        <div className="mb-5 text-xl">您已規劃的行程如下：</div>
        <hr />
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
