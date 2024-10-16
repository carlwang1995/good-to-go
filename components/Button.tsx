"use client";

import React from "react";
import { useUser } from "@/contexts/UserAuth";
import Link from "next/link";

type ButtonProps = {
  title: string | React.JSX.Element;
  type: "confirm" | "cancel" | "close" | "undone";
  onSmash?: () => void;
};

export const Button = ({ title, type, onSmash }: ButtonProps) => {
  let style;
  if (type === "confirm") {
    style = "btn_blue";
  } else if (type === "cancel") {
    style = "btn_white";
  } else if (type === "close") {
    style = "btn_red";
  } else if (type === "undone") {
    style = "btn_undone";
  }
  return (
    <button className={style} onClick={onSmash}>
      {title}
    </button>
  );
};

export const StartupButton = () => {
  const { user } = useUser();
  return (
    <Link href={user ? "/trips" : "/login"}>
      <button className="rounded-lg bg-teal-500 px-4 py-2 text-2xl text-white shadow-lg transition hover:bg-teal-600">
        開始規劃
      </button>
    </Link>
  );
};
