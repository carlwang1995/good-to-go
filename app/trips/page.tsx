"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

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
    <main className="flex h-screen w-screen justify-center pt-[50px]">
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
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
          style={display ? { display: "flex" } : { display: "none" }}
        >
          <div className="w-[500px] rounded-lg bg-white p-10">
            <h2>建立行程</h2>
            <br />
            <h3>旅遊日期</h3>
            <div className="mx-2 flex w-full border-[1px] border-solid border-black p-2">
              <div className="ml-2 flex-auto">2024/08/05</div>
              <div>→</div>
              <div className="ml-2 flex-auto">2024/08/07</div>
            </div>
            <br />
            <h3>目的地</h3>
            <div className="mx-2 flex w-full border-[1px] border-solid border-black p-2">
              <span>台北市</span>
            </div>
            <br />
            <h3>旅程名稱</h3>
            <div className="mx-2 flex w-full border-[1px] border-solid border-black p-2">
              <span>台北一日遊</span>
            </div>
            <br />
            <div className="flex justify-end">
              <button
                onClick={setDialogBoxDisplay}
                className="mr-3 mt-5 rounded border-[1px] border-solid border-black p-1 text-lg hover:cursor-pointer hover:bg-slate-200"
              >
                返回
              </button>
              <Link href="/trips/66ac9fee9d031371f0d9d976">
                <button className="mt-5 rounded border-[1px] border-solid border-black p-1 text-lg hover:cursor-pointer hover:bg-slate-200">
                  完成
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Trips;
