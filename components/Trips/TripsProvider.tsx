"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";
import TripsContent from "@/components/Trips/TripsContent";

export const TripsProvider = () => {
  const { isLogin, userName, userId } = useUser();
  const router = useRouter();

  // 驗證登入狀態
  useEffect(() => {
    isLogin ? null : router.push("/");
  }, [isLogin]);

  return (
    <div className="mx-10 w-[1100px] p-4">
      <div className="my-5 text-3xl font-bold">
        Hi, {userName ? userName : ""}
      </div>
      <TripsContent userId={userId} />
    </div>
  );
};
