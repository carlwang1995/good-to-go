import React, { useEffect } from "react";
import { addTime } from "@/libs/timeConvertor";

type TripInfoProps = {
  number: number;
  placeId: string;
  trafficTime: string;
  stayTime: string;
  startTime: string;
  name: string;
  address: string;
};
const TripInfo = ({
  number,
  placeId,
  trafficTime,
  stayTime,
  startTime,
  name,
  address,
}: TripInfoProps) => {
  const start = addTime(startTime, trafficTime);
  const end = addTime(start, stayTime);
  return (
    <div className="relative z-10 mb-[40px] flex h-[120px] w-full border-t bg-white p-5 shadow-lg">
      <div className="relative h-20 w-20 bg-slate-400">
        <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center bg-slate-600">
          <p className="text-white">{String(number + 1)}</p>
        </div>
      </div>
      <div className="ml-2 flex flex-col justify-center">
        <div>
          <span className="underline hover:cursor-pointer hover:font-bold">
            {stayTime}
          </span>
          <> | </>
          <span>{`${start} － ${end}`}</span>
        </div>
        <div className="font-bold">{name}</div>
        <div>{address}</div>
      </div>
    </div>
  );
};

export default TripInfo;
