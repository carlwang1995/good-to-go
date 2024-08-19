import React, { useState, useContext } from "react";
import { DayIndexContext, TripContext } from "@/contexts/ContextProvider";
import { DB_updateTripPlan } from "@/libs/db/EditTripPage";
import Image from "next/image";

type PlaceType = {
  id?: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  stayTime?: string;
};

const PlaceInfoCard = ({
  addDone,
  setAddDone,
  selectedPlace,
  setIsShowSearchResult,
}: {
  addDone: boolean;
  setAddDone: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlace: PlaceType | null;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [hour, setHour] = useState<string>("00");
  const [minute, setMinute] = useState<string>("30");
  const dayIndex = useContext(DayIndexContext); // day1,day2,day3 ...
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("組件不屬於Context的子組件。");
  }

  const planDocId: string = context.planDocId;
  const setState: React.Dispatch<React.SetStateAction<boolean>> =
    context.setState;

  // 新增景點
  const addPlace = async (
    selectedPlace: PlaceType | null,
    planDocId: string,
  ) => {
    const id = new Date().getTime();
    if (selectedPlace) {
      const newPlace: PlaceType = {
        ...selectedPlace,
        stayTime: `${hour}:${minute}`,
        id: id,
      };
      try {
        const result = await DB_updateTripPlan(dayIndex, planDocId, newPlace);
        if (result) {
          setState((prev) => !prev);
          setAddDone(true);
        }
      } catch (e) {
        alert("Error:行程資料更新失敗!");
        console.error(e);
      }
    }
  };

  return (
    <div className="absolute left-[500px] top-0 z-20 flex h-full w-[380px] flex-col overflow-y-auto overflow-x-hidden border-l border-slate-300 bg-white">
      <div className="flex h-16 items-center justify-end">
        <div
          className="m-4 px-1 text-xl hover:cursor-pointer hover:bg-slate-200"
          onClick={() => {
            setIsShowSearchResult(false);
            setAddDone(false);
          }}
        >
          &#10006;
        </div>
      </div>
      <div className="mb-[150px] h-full overflow-y-auto">
        <div className="min-h-64 w-full bg-slate-400"></div>
        <p className="mt-4 px-3 text-2xl font-bold">
          {selectedPlace ? selectedPlace.name : null}
        </p>
        <p className="mt-4 px-3 text-lg">
          {selectedPlace ? selectedPlace.address : null}
        </p>
      </div>
      <div className="absolute bottom-0 min-h-[150px] w-full pb-1 shadow-[0_-2px_10px_2px_rgba(0,0,0,0.1)]">
        <div className="flex w-full items-center justify-center px-3">
          <Image
            className="mr-1 h-[15px]"
            src="/stay-time-icon.png"
            alt="stayTimeIcon"
            width={15}
            height={15}
          ></Image>
          <p>預計停留：</p>
          <div className="my-2 flex flex-nowrap items-center">
            <select
              onChange={(e) => setHour(e.target.value)}
              value={hour}
              className="m-1 h-8 w-1/2 rounded border border-solid border-slate-400"
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
              className="m-1 h-8 w-1/2 rounded border border-solid border-slate-400"
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
        </div>
        <div className="flex items-center justify-center">
          {addDone ? (
            <div className="mt-4 p-2 text-xl text-green-500">加入成功！</div>
          ) : (
            <button
              onClick={() => addPlace(selectedPlace, planDocId)}
              className="mt-2 rounded border border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
            >
              + 加入行程
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoCard;
