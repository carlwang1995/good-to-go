import React, { useEffect, useState, useContext } from "react";
import get_directions from "@/libs/google/directions";
import { convertTimeString } from "@/libs/timeConvertor";
import Image from "next/image";
import TrafficModeSetting from "./TrafficModeSetting";
import { EditableContext } from "@/contexts/ContextProvider";
import { directionsData } from "@/libs/fakeData";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: Array<string>;
}

interface TripType {
  startTime: string;
  places: Array<PlaceType>;
  lastEditTime: string;
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
  handleTrafficRoute: (
    number: string,
    originId: string,
    destinationId: string,
    routeArr: Array<[]>,
  ) => void;
};

const TrafficBox = ({
  number,
  trip,
  originId,
  destinationId,
  mode,
  handleTrafficTime,
  handleTrafficRoute,
}: TrafficBoxProps) => {
  const [durationText, setDurationText] = useState<string>("--分鐘");
  const [distance, setDistance] = useState<string>("--公里");
  const [isShowModeSetting, setIsShowModeSetting] = useState<boolean>(false);
  const isEditable = useContext(EditableContext);
  if (isEditable === undefined) {
    throw new Error("Can't access MarkerContext.");
  }

  // 真實資料
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && mode) {
      get_directions(originId, destinationId, mode)
        .then((direction) => {
          if (direction) {
            const { distance, duration, steps } = direction;
            const formattedTime = convertTimeString(duration.text);
            const routeArr = steps.map((step: any) => [
              [step.start_location.lat, step.start_location.lng],
              [step.end_location.lat, step.end_location.lng],
            ]);
            handleTrafficTime(
              String(number),
              originId,
              destinationId,
              formattedTime,
            );
            handleTrafficRoute(
              String(number),
              originId,
              destinationId,
              routeArr,
            );
            setDistance(distance.text);
            setDurationText(duration.text);
          } else {
            console.error("所在地無此交通方式!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [mode, destinationId, originId]);

  // 假的資料
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const { distance, duration } = directionsData;
      setDistance(distance.text);
      setDurationText(duration.text);
      const formattedTime = convertTimeString(duration.text);
      handleTrafficTime(String(number), originId, destinationId, formattedTime);
    }
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setIsShowModeSetting(true);
        }}
        className={`mt-[120px] flex h-[40px] w-full items-center justify-between transition ${isEditable ? "hover:cursor-pointer" : null} ${isEditable ? "hover:bg-blue-200" : null} `}
      >
        <div className="flex h-full items-center">
          <div className="ml-14 h-full border-l-4 border-dotted border-blue-500"></div>

          <div className="ml-[40px] pl-2 pr-2">
            <Image
              src={`/trafficIcon/${mode == "driving" ? "car" : mode == "transit" ? "bus" : mode == "walking" ? "walking" : "bike"}.png`}
              alt={
                mode === "driving"
                  ? "car icon"
                  : mode === "transit"
                    ? "bus icon"
                    : mode === "walking"
                      ? "walking icon"
                      : "bike icon"
              }
              width={24}
              height={24}
            />
          </div>
          <div className="pl-2 pr-2">{distance},</div>
          <div className="pl-2 pr-2">約 {durationText}</div>
        </div>
        {isEditable ? <div className="mr-5">&#10095;</div> : <></>}
      </div>
      {isShowModeSetting && isEditable && (
        <TrafficModeSetting
          number={number}
          trip={trip}
          currentMode={mode}
          setIsShowing={setIsShowModeSetting}
        />
      )}
    </>
  );
};

export default TrafficBox;
