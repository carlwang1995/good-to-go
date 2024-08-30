import React, { useContext, useState } from "react";
import {
  DayIndexContext,
  DocIdContext,
  StateContext,
} from "@/contexts/ContextProvider";
import { DB_upadatePlaceInfo } from "@/libs/db/EditTripPage";
import TrafficModeButton from "./TrafficModeButton";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
}

interface TripType {
  startTime: string;
  places: Array<PlaceType>;
}

type TrafficModeSettingProps = {
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  number: number;
  currentMode: string;
  trip: TripType;
};

const TrafficModeSetting = ({
  setIsShowing,
  number,
  currentMode,
  trip,
}: TrafficModeSettingProps) => {
  const [newMode, setNewMode] = useState<string>(currentMode);

  const dayIndex = useContext(DayIndexContext);
  const setState = useContext(StateContext);
  const planDocId = useContext(DocIdContext);

  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (!setState) {
    throw new Error("Can't access StateContext.");
  }
  if (!planDocId) {
    throw new Error("Can't access DocIdContext.");
  }

  const updateMode = async (
    docId: string,
    dayIndex: string,
    number: number,
  ) => {
    const mode = newMode;
    const newPlaces = [...trip.places];
    newPlaces[number].trafficMode = mode;
    const result = await DB_upadatePlaceInfo(docId, dayIndex, newPlaces);
    if (result) {
      setState((prev) => !prev);
    } else {
      console.error("Update failed!");
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        onClick={() => setIsShowing(false)}
        className="absolute h-full w-full items-center justify-center"
      ></div>
      <div className="z-50 h-fit min-w-[320px] rounded-lg bg-white">
        <div className="flex h-full w-full flex-col p-4">
          <div className="flex justify-center"></div>
          <div className="ml-2 text-lg font-bold">
            交通方式：
            {newMode == "driving"
              ? "開車"
              : newMode == "transit"
                ? "大眾運輸"
                : newMode == "walking"
                  ? "步行"
                  : "自行車"}
          </div>
          <TrafficModeButton mode={newMode} setMode={setNewMode} />
          <div className="flex justify-end">
            <button
              onClick={() => setIsShowing(false)}
              className="mr-4 rounded px-2 py-1 text-lg text-blue-500 transition hover:bg-blue-50"
            >
              返回
            </button>
            <button
              onClick={() => {
                if (currentMode != newMode) {
                  updateMode(planDocId, dayIndex, number);
                }
                setIsShowing(false);
              }}
              className="mr-2 rounded border border-solid border-blue-700 bg-blue-500 px-2 py-1 text-lg text-white transition hover:bg-blue-700"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficModeSetting;
