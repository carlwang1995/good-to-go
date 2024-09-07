"use client";
import { useUser } from "@/contexts/UserAuth";
import Link from "next/link";
import React from "react";

const StartupButton = () => {
  const { user } = useUser();
  return (
    <Link href={user ? "/trips" : "/login"}>
      <button className="rounded-lg bg-sky-600 px-4 py-2 text-2xl text-white shadow-lg transition hover:bg-sky-700">
        開始規劃
      </button>
    </Link>
  );
};

export default StartupButton;
