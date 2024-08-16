import React, { useEffect, useState } from "react";
import get_directions from "@/libs/google/directions";
import { convertTimeString } from "@/libs/timeConvertor";

type TrafficBoxProps = {
  number: number;
  originId: string;
  destinationId: string;
  handleTrafficTime: (
    number: string,
    originId: string,
    destinationId: string,
    duration: string,
  ) => void;
};

const TrafficBox = ({
  number,
  originId,
  destinationId,
  handleTrafficTime,
}: TrafficBoxProps) => {
  const [mode, setMode] = useState<string>("driving");
  const [durationTime, setDurationTime] = useState<string>("00:00");
  const [durationText, setDurationText] = useState<string>("null分鐘");
  const [distance, setDistance] = useState<string>("null公里");

  useEffect(() => {
    handleTrafficTime(String(number), originId, destinationId, durationTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originId, destinationId, durationTime]);

  useEffect(() => {
    console.log(`TrafficBox-${number}被渲染`);
  }, []);

  const fakeDirections = {
    distance: {
      text: "4.8 公里",
      value: 4802,
    },
    duration: {
      text: "19 分鐘",
      value: 929,
    },
  };

  useEffect(() => {
    // get_directions(originId, destinationId, mode).then((direction) => {
    //   if (direction) {
    //     const { distance, duration } = direction;
    //     setDistance(distance.text);
    //     setDurationText(duration.text);
    //     const formattedTime = convertTimeString(duration.text);
    //     setDurationTime(formattedTime);
    //   }
    // });
    const { distance, duration } = fakeDirections;
    setDistance(distance.text);
    setDurationText(duration.text);
    const formattedTime = convertTimeString(duration.text);
    setDurationTime(formattedTime);
  }, [mode, destinationId]);

  return (
    <div
      // onClick={() => setDuration("00:40")}
      className="mt-[120px] flex h-[40px] w-full items-center justify-between hover:cursor-pointer hover:bg-slate-200"
    >
      <div className="flex h-full items-center">
        <div className="ml-14 h-full border-l-4 border-dotted border-slate-400"></div>

        <div className="ml-[40px] pl-2 pr-2">
          {mode === "driving" ? "開車" : "其它"}
        </div>
        <div className="pl-2 pr-2">{distance},</div>
        <div className="pl-2 pr-2">約 {durationText}</div>
      </div>
      <div className="mr-5">&#10095;</div>
    </div>
  );
};

export default TrafficBox;
