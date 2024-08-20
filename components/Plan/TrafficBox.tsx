import React, { useEffect, useState } from "react";
import get_directions from "@/libs/google/directions";
import { convertTimeString } from "@/libs/timeConvertor";
import Image from "next/image";
import TrafficModeSetting from "./TrafficModeSetting";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  stayTime: string;
  trafficMode: string;
}

interface TripType {
  startTime: string;
  places: Array<PlaceType>;
}

type TrafficBoxProps = {
  number: number;
  trip: TripType;
  originId: string;
  destinationId: string;
  mode: string;
  handleTrafficTime: (
    number: string,
    originId: string,
    destinationId: string,
    duration: string,
  ) => void;
};

const TrafficBox = ({
  number,
  trip,
  originId,
  destinationId,
  mode,
  handleTrafficTime,
}: TrafficBoxProps) => {
  const [durationTime, setDurationTime] = useState<string>("00:00");
  const [durationText, setDurationText] = useState<string>("--分鐘");
  const [distance, setDistance] = useState<string>("--公里");
  const [isShowModeSetting, setIsShowModeSetting] = useState<boolean>(false);

  useEffect(() => {
    handleTrafficTime(String(number), originId, destinationId, durationTime);
  }, [originId, destinationId, durationTime]);

  // useEffect(() => {
  //   console.log(`TrafficBox-${number}被渲染`);
  // }, []);

  // const fakeDirections = {
  //   distance: {
  //     text: "4.8 公里",
  //     value: 4802,
  //   },
  //   duration: {
  //     text: "19 分鐘",
  //     value: 929,
  //   },
  // };

  // 真實資料，會計費
  useEffect(() => {
    get_directions(originId, destinationId, mode).then((direction) => {
      if (direction) {
        const { distance, duration } = direction;
        setDistance(distance.text);
        setDurationText(duration.text);
        const formattedTime = convertTimeString(duration.text);
        setDurationTime(formattedTime);
      }
    });
  }, [mode, destinationId]);

  // 假的資料
  // useEffect(() => {
  //   const { distance, duration } = fakeDirections;
  //   setDistance(distance.text);
  //   setDurationText(duration.text);
  //   const formattedTime = convertTimeString(duration.text);
  //   setDurationTime(formattedTime);
  // }, []);

  return (
    <>
      <div
        onClick={() => {
          setIsShowModeSetting(true);
        }}
        className="mt-[120px] flex h-[40px] w-full items-center justify-between hover:cursor-pointer hover:bg-slate-200"
      >
        <div className="flex h-full items-center">
          <div className="ml-14 h-full border-l-4 border-dotted border-slate-400"></div>

          <div className="ml-[40px] pl-2 pr-2">
            {mode === "driving" ? (
              <Image src="/car.png" alt="car" width={24} height={24}></Image>
            ) : mode === "transit" ? (
              <Image
                src="/bus.png"
                alt="transit"
                width={24}
                height={24}
              ></Image>
            ) : mode === "walking" ? (
              <Image
                src="/walking.png"
                alt="walking"
                width={24}
                height={24}
              ></Image>
            ) : (
              <Image src="/bike.png" alt="bike" width={24} height={24}></Image>
            )}
          </div>
          <div className="pl-2 pr-2">{distance},</div>
          <div className="pl-2 pr-2">約 {durationText}</div>
        </div>
        <div className="mr-5">&#10095;</div>
      </div>
      {isShowModeSetting ? (
        <TrafficModeSetting
          setIsShowing={setIsShowModeSetting}
          number={number}
          currentMode={mode}
          trip={trip}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default TrafficBox;
