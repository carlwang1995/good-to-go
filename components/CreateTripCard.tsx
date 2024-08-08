import React, { useState } from "react";
import Link from "next/link";

type CreateTripCardProps = {
  display: boolean;
  setDialogBoxDisplay: () => void;
};

const CreateTripCard = ({
  display,
  setDialogBoxDisplay,
}: CreateTripCardProps) => {
  const [startDate, setStartDate] = useState<string>("YYYY:MM:DD");
  const [endDate, setEndDate] = useState<string>("YYYY:MM:DD");
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
      style={display ? { display: "flex" } : { display: "none" }}
    >
      <div className="w-[500px] rounded-lg bg-white p-10">
        <h2 className="text-xl font-bold">建立行程</h2>
        <br />
        <h3>旅遊日期</h3>
        <div className="flex w-full rounded border-[1px] border-solid border-black p-2 hover:cursor-pointer">
          <div className="ml-2 flex-auto">{startDate}</div>
          <div>→</div>
          <div className="ml-2 flex-auto">{endDate}</div>
        </div>
        <br />
        <h3>目的地</h3>
        <input
          className="flex w-full rounded border-[1px] border-solid border-black p-2"
          placeholder="請輸入目的地名稱"
        ></input>
        <br />
        <h3>旅程名稱</h3>
        <input
          className="roubded flex w-full border-[1px] border-solid border-black p-2"
          placeholder="請輸入旅程名稱"
        ></input>
        <br />
        <div className="flex justify-end">
          <button
            onClick={setDialogBoxDisplay}
            className="mr-3 mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
          >
            返回
          </button>
          <Link href="/trips/66ac9fee9d031371f0d9d976">
            <button className="mt-5 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200">
              完成
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateTripCard;
