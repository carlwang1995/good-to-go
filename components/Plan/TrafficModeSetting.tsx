import React, { useContext, useState } from "react";
import {
  DayIndexContext,
  DocIdContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { DB_upadatePlaceInfo } from "@/libs/db/PlansDoc";
import TrafficModeButton from "./TrafficModeButton";
import { getTimeNow } from "@/libs/timeConvertor";

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
  number: number;
  trip: TripType;
  currentMode: string;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrafficModeSetting = ({
  number,
  trip,
  currentMode,
  setIsShowing,
}: TrafficModeSettingProps) => {
  const [newMode, setNewMode] = useState<string>(currentMode);
  const dayIndex = useContext(DayIndexContext);
  const planDocId = useContext(DocIdContext);
  const { planContent, setPlanContent } = useContext(PlanContentContext);

  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (!planDocId) {
    throw new Error("Can't access DocIdContext.");
  }
  if (!planContent || !setPlanContent) {
    throw new Error("Can't access PlanContentContext.");
  }

  const updateMode = async (
    docId: string,
    dayIndex: string,
    number: number,
  ) => {
    const mode = newMode;
    const newPlaces = [...trip.places];
    newPlaces[number].trafficMode = mode;
    try {
      const result = await DB_upadatePlaceInfo(docId, dayIndex, newPlaces);
      if (result) {
        const newPlanContent = { ...planContent! };
        newPlanContent.trips[dayIndex].places[number].trafficMode = mode;
        newPlanContent.trips[dayIndex].lastEditTime = getTimeNow();
        setPlanContent!(newPlanContent);
        setIsShowing(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        onClick={() => setIsShowing(false)}
        className="absolute h-full w-full items-center justify-center"
      ></div>
      <div className="z-50 h-fit min-w-[320px] rounded-lg bg-zinc-100">
        <div className="flex h-full w-full flex-col p-4">
          <div className="flex justify-center"></div>
          <div className="ml-2 text-lg font-bold text-sky-800">
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
