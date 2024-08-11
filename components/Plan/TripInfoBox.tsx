import React from "react";

type TripInfoProps = {
  number: number;
  stayTime: string;
  startTime: string;
  endTime: string;
  name: string;
  address: string;
};
const TripInfo = ({
  number,
  stayTime,
  startTime,
  endTime,
  name,
  address,
}: TripInfoProps) => {
  return (
    <div className="flex border-t bg-white p-5 shadow-lg">
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
          <span>
            {startTime} - {endTime}
          </span>
        </div>
        <div className="font-bold">{name}</div>
        <div>{address}</div>
      </div>
    </div>
  );
};

export default TripInfo;
