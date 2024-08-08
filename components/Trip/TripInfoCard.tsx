import React from "react";
import TripInfo from "./TripInfo";

type TripDateCardProps = {
  dateCount: string;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const TripDateCard = ({ dateCount, setIsSearching }: TripDateCardProps) => {
  return (
    <div>
      <div className="mt-4 flex items-center justify-center bg-slate-300">
        <p>{dateCount}</p>
      </div>
      <div className="p-2">
        <span>出發時間：</span>
        <span className="underline hover:cursor-pointer hover:font-bold">
          08:00
        </span>
      </div>
      <TripInfo
        stayTime="1小時"
        startTime="08:00"
        endTime="09:00"
        name="台北101"
        address="台灣 11049 信義區 信義路五段7號"
      />
      <div className="flex items-center hover:cursor-pointer hover:bg-slate-200">
        <div className="w-10"></div>
        <div className="text-4xl">｜</div>
        <div className="pl-2 pr-2">開車</div>
        <div className="pl-2 pr-2">約 10 分</div>
      </div>
      <TripInfo
        stayTime="1小時"
        startTime="09:10"
        endTime="10:10"
        name="臺北松山機場"
        address="台灣 10512 台北 台北市 敦化北路340-10號"
      />
      <div className="flex items-center justify-center p-10">
        <button
          className="rounded border-[1px] border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
          onClick={() => setIsSearching(true)}
        >
          + 搜尋並加入景點
        </button>
      </div>
    </div>
  );
};

export default TripDateCard;
