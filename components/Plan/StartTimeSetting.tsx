import React, { useContext, useEffect, useState } from "react";
import { DayIndexContext } from "@/contexts/ContextProvider";
import { DB_updateTripStartTime } from "@/libs/db/EditTripPage";

interface TripType {
  startTime: string;
  places: Array<object>;
}

const StartTimeSetting = ({
  planDocId,
  setState,
  setShowStartTimeSetting,
  trip,
}: {
  planDocId: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStartTimeSetting: React.Dispatch<React.SetStateAction<boolean>>;
  trip: TripType | null;
}) => {
  const dayIndex = useContext(DayIndexContext);
  const [period, setPeriod] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    if (trip) {
      let [hour, minute] = trip.startTime.split(":");
      if (Number(hour) > 12) {
        setPeriod("PM");
        setHour(String(Number(hour) - 12).padStart(2, "0"));
        setMinute(minute);
      } else {
        setPeriod("AM");
        setHour(hour);
        setMinute(minute);
      }
    }
  }, [trip]);

  if (!dayIndex) {
    throw new Error("StartTimeSetting.tsx不屬於DayIndexContext的子組件。");
  }
  const updateStartTime = async (docId: string, dayIndex: string) => {
    let hh = hour;
    const mm = minute;
    if (period === "PM") {
      hh = String(Number(hh) + 12);
    }
    const newStartTime = `${hh}:${mm}`;
    const result = await DB_updateTripStartTime(docId, dayIndex, newStartTime);
    if (result) {
      setState((prev) => !prev);
      setShowStartTimeSetting(false);
    }
  };
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
      <div
        onClick={() => setShowStartTimeSetting(false)}
        className="absolute h-full w-full items-center justify-center bg-black/80"
      ></div>
      <div className="z-50 h-fit w-[320px] rounded-lg bg-slate-100">
        <div className="flex h-full w-full flex-col justify-between p-4">
          <div className="text-xl font-bold">出發時間:</div>
          <div className="my-4 flex w-full flex-nowrap items-center justify-between">
            <select
              onChange={(e) => setPeriod(e.target.value)}
              value={period}
              className="m-2 w-1/3 rounded border border-solid border-slate-400 p-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <select
              onChange={(e) => setHour(e.target.value)}
              value={hour}
              className="m-2 w-1/3 rounded border border-solid border-slate-400 p-2"
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
              onChange={(e) => setMinute(e.target.value)}
              value={minute}
              className="m-2 w-1/3 rounded border border-solid border-slate-400 p-2"
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
          <div className="flex justify-end">
            <button
              onClick={() => setShowStartTimeSetting(false)}
              className="mr-4 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
            >
              返回
            </button>
            <button
              onClick={() => updateStartTime(planDocId, dayIndex)}
              className="mr-2 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTimeSetting;
