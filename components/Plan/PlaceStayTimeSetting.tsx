import React, { useContext, useEffect, useState } from "react";
import { DayIndexContext } from "@/contexts/ContextProvider";
import { DB_upadateTripStayTime } from "@/libs/db/EditTripPage";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  stayTime: string;
}

interface TripType {
  startTime: string;
  places: Array<PlaceType>;
}

const PlaceStayTimeSetting = ({
  planDocId,
  number,
  trip,
  place,
  setState,
  setShowStaySetting,
}: {
  planDocId: string;
  number: number;
  trip: TripType;
  place: PlaceType;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStaySetting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dayIndex = useContext(DayIndexContext);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    if (place) {
      const [hour, minute] = place.stayTime.split(":");
      setHour(hour);
      setMinute(minute);
    }
  }, [place]);

  if (!dayIndex) {
    throw new Error("StayTimeSetting.tsx不屬於DayIndexContext的子組件。");
  }
  const updateStaytTime = async (
    docId: string,
    dayIndex: string,
    number: number,
  ) => {
    const hh = hour;
    const mm = minute;
    const newStayTime = `${hh}:${mm}`;
    const newPlaces = [...trip.places];
    newPlaces[number].stayTime = newStayTime;
    // console.log(newPlaces);
    const result = await DB_upadateTripStayTime(docId, dayIndex, newPlaces);
    if (result) {
      setState((prev) => !prev);
      setShowStaySetting(false);
    }
  };
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
      <div
        onClick={() => setShowStaySetting(false)}
        className="absolute h-full w-full items-center justify-center"
      ></div>
      <div className="z-50 h-fit w-[320px] rounded-lg bg-slate-100">
        <div className="flex h-full w-full flex-col justify-between p-4">
          <div className="flex justify-center">
            <div className="mb-2 text-center text-xl font-bold">
              {place.name}
            </div>
          </div>

          <div className="ml-2 text-lg">停留時間:</div>
          <div className="my-2 flex w-full flex-nowrap items-center justify-between">
            <select
              onChange={(e) => setHour(e.target.value)}
              value={hour}
              className="m-2 w-1/2 rounded border border-solid border-slate-400 p-2"
            >
              <option value="00">0 小時</option>
              <option value="01">1 小時</option>
              <option value="02">2 小時</option>
              <option value="03">3 小時</option>
              <option value="04">4 小時</option>
              <option value="05">5 小時</option>
              <option value="06">6 小時</option>
              <option value="07">7 小時</option>
              <option value="08">8 小時</option>
              <option value="09">9 小時</option>
              <option value="10">10 小時</option>
              <option value="11">11 小時</option>
              <option value="12">12 小時</option>
              <option value="13">13 小時</option>
              <option value="14">14 小時</option>
              <option value="15">15 小時</option>
              <option value="16">16 小時</option>
              <option value="17">17 小時</option>
              <option value="18">18 小時</option>
              <option value="19">19 小時</option>
              <option value="20">20 小時</option>
              <option value="21">21 小時</option>
              <option value="22">22 小時</option>
              <option value="23">23 小時</option>
            </select>
            <select
              onChange={(e) => setMinute(e.target.value)}
              value={minute}
              className="m-2 w-1/2 rounded border border-solid border-slate-400 p-2"
            >
              <option value="00">0 分鐘</option>
              <option value="05">5 分鐘</option>
              <option value="10">10 分鐘</option>
              <option value="15">15 分鐘</option>
              <option value="20">20 分鐘</option>
              <option value="25">25 分鐘</option>
              <option value="30">30 分鐘</option>
              <option value="35">35 分鐘</option>
              <option value="40">40 分鐘</option>
              <option value="45">45 分鐘</option>
              <option value="50">50 分鐘</option>
              <option value="55">55 分鐘</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setShowStaySetting(false)}
              className="mr-4 rounded border-[1px] border-solid border-black px-2 py-1 text-lg hover:cursor-pointer hover:bg-slate-200"
            >
              返回
            </button>
            <button
              onClick={() => updateStaytTime(planDocId, dayIndex, number)}
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

export default PlaceStayTimeSetting;