import React, { useContext, useEffect, useState } from "react";
import {
  DayIndexContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { DB_updateTripStartTime } from "@/libs/db/PlansDoc";
import { getTimeNow } from "@/libs/timeConvertor";
import Button from "../Button";
import { Loading } from "../Loading";

const StartTimeSetting = ({
  planDocId,
  dateCount,
  setShowStartTimeSetting,
}: {
  planDocId: string;
  dateCount: string;
  setShowStartTimeSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [period, setPeriod] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dayIndex = useContext(DayIndexContext);
  const { planContent, setPlanContent } = useContext(PlanContentContext);
  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (!planContent || !setPlanContent) {
    throw new Error("Can't access PlanContentContext.");
  }

  useEffect(() => {
    if (planContent?.trips[dayIndex]) {
      const trip = planContent.trips[dayIndex];
      let [hour, minute] = trip.startTime.split(":");
      if (Number(hour) >= 12) {
        setPeriod("PM");
        setHour(String(Number(hour) - 12).padStart(2, "0"));
        setMinute(minute);
      } else {
        setPeriod("AM");
        setHour(hour);
        setMinute(minute);
      }
    }
  }, [planContent]);

  const updateStartTime = async (docId: string, dayIndex: string) => {
    setIsLoading(true);
    let hh = hour;
    const mm = minute;
    if (period === "PM") {
      hh = String(Number(hh) + 12);
    }
    const newStartTime = `${hh}:${mm}`;
    const result = await DB_updateTripStartTime(docId, dayIndex, newStartTime);
    if (result) {
      const newPlanContent = { ...planContent! };
      newPlanContent.trips[dayIndex].startTime = newStartTime;
      newPlanContent.trips[dayIndex].lastEditTime = getTimeNow();
      setPlanContent(newPlanContent);
      setShowStartTimeSetting(false);
    }
  };
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriod(e.target.value);
  };
  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(e.target.value);
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(e.target.value);
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
      <div
        onClick={() => setShowStartTimeSetting(false)}
        className="absolute h-full w-full items-center justify-center bg-black/80"
      ></div>
      <div className="z-50 h-fit w-[320px] rounded-lg bg-zinc-100">
        <div className="flex h-full w-full flex-col justify-between p-4">
          <div className="mx-2 text-xl font-bold text-sky-800">
            出發時間：{dateCount}
          </div>
          <div className="my-4 flex w-full flex-nowrap items-center justify-between">
            <select
              onChange={handlePeriodChange}
              value={period}
              className="m-2 w-1/3 rounded border border-solid border-slate-400 bg-white p-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <select
              onChange={handleHourChange}
              value={hour}
              className="m-2 w-1/3 rounded border border-solid border-slate-400 bg-white p-2"
            >
              <option value="00">12</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
            </select>
            <span>:</span>
            <select
              onChange={handleMinuteChange}
              value={minute}
              className="m-2 w-1/3 rounded border border-solid border-slate-400 bg-white p-2"
            >
              <option value="00">00</option>
              <option value="05">05</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="35">35</option>
              <option value="40">40</option>
              <option value="45">45</option>
              <option value="50">50</option>
              <option value="55">55</option>
            </select>
          </div>
          <div className="mr-2 flex justify-end">
            <Button
              title="關閉"
              type="cancel"
              onSmash={() => setShowStartTimeSetting(false)}
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
                onSmash={() => updateStartTime(planDocId, dayIndex)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTimeSetting;
