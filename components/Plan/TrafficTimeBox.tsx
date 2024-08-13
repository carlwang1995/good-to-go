import React, { useEffect, useState } from "react";

type TrafficTimeBoxProps = {
  number: number;
  departId: string;
  destinedId: string;
  handleTrafficTime: (
    number: string,
    departId: string,
    destinedId: string,
    duration: string,
  ) => void;
};

const TrafficTimeBox = ({
  number,
  departId,
  destinedId,
  handleTrafficTime,
}: TrafficTimeBoxProps) => {
  const [mode, setMode] = useState<string>("開車");
  const [duration, setDuration] = useState<string>("00:20");

  useEffect(() => {
    handleTrafficTime(String(number), departId, destinedId, duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departId, destinedId, duration]);

  return (
    <div
      onClick={() => setDuration("00:40")}
      className="mt-[120px] flex h-[40px] w-full items-center justify-between hover:cursor-pointer hover:bg-slate-200"
    >
      <div className="flex items-center">
        <div className="w-10"></div>
        <div className="pl-2 pr-2 text-4xl text-slate-500">&#10551;</div>
        <div className="pl-2 pr-2">{mode}</div>
        <div className="pl-2 pr-2">{duration}</div>
        <div className="pl-2 pr-2">
          {departId}→{destinedId}
        </div>
      </div>
      <div className="mr-5">&#10095;</div>
    </div>
  );
};

export default TrafficTimeBox;
