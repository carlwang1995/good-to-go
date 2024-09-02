"use client";
import React, { useEffect } from "react";
import { useUser } from "@/contexts/UserAuth";
import { useRouter } from "next/navigation";
import TripsContent from "@/components/Trips/TripsContent";

export const TripsProvider = () => {
  const { user, userName, userId } = useUser();
  const router = useRouter();

  // 驗證登入狀態
  useEffect(() => {
    if (user !== undefined) {
      user ? null : router.push("/");
    }
  }, [user]);

  return (
    <div className="mx-10 w-[1100px] p-4">
      <div className="my-5 text-3xl font-bold">
        Hi, {userName ? userName : ""}
      </div>
      <TripsContent userId={userId} />
    </div>
  );
};
