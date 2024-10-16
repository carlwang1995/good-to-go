import React, { useContext, useState } from "react";
import {
  DayIndexContext,
  DocIdContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { DB_upadatePlaceInfo } from "@/libs/db/PlansDoc";
import TrafficModeButton from "./TrafficModeButton";
import { getTimeNow } from "@/libs/timeConvertor";
import Button from "../Button";
import { Loading } from "../Loading";

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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
          <div className="mr-2 flex justify-end">
            <Button
              title="返回"
              type="cancel"
              onSmash={() => setIsShowing(false)}
            />
            {isLoading ? (
              <Button
                title={<Loading widthPx={28} heightPx={28} />}
                type="undone"
              />
            ) : (
              <Button
                title="確認"
                type="confirm"
                onSmash={() => {
                  if (currentMode != newMode) {
                    updateMode(planDocId, dayIndex, number);
                  } else {
                    setIsShowing(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficModeSetting;
