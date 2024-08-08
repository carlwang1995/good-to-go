"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import CreateTripCard from "@/components/CreateTripCard";

const Trips = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [display, setDisplay] = useState<boolean>(false);

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
        <CreateTripCard
          display={display}
          setDialogBoxDisplay={setDialogBoxDisplay}
        />
      </div>
    </main>
  );
};

export default Trips;
