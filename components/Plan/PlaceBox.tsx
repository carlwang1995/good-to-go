import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import {
  DayIndexContext,
  TripContext,
  MarkerContext,
} from "@/contexts/ContextProvider";
import { addTime } from "@/libs/timeConvertor";
import { DB_deleteTripPlanPlace } from "@/libs/db/EditTripPage";
import StayTimeSetting from "./PlaceStayTimeSetting";

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

type PlaceBoxProps = {
  number: number;
  trip: TripType;
  place: PlaceType;
  startTime: string;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaceBoxInfo: React.Dispatch<React.SetStateAction<PlaceType | undefined>>;
};

const PlaceBox = ({
  number,
  trip,
  place,
  startTime,
  setShowPlaceInfo,
  setPlaceBoxInfo,
}: PlaceBoxProps) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);
  const [showStayTimeSetting, setShowStaySetting] = useState<boolean>(false);
  const { id, placeId, stayTime, name, address, location } = place;

  const { setMarkers, setPlaceLatLng } = useContext(MarkerContext);
  const dayIndex = useContext(DayIndexContext);
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("找不到context");
  }
  const planDocId: string = context.planDocId;
  const setState: React.Dispatch<React.SetStateAction<boolean>> =
    context.setState;
  const endTime = addTime(startTime, stayTime);
  // 停留時間轉成XX小時XX分鐘格式
  let [stayTimeHour, stayTimeMinute] = stayTime.split(":");
  if (stayTimeHour[0] === "0") {
    stayTimeHour = stayTimeHour[1];
  }
  const deleteTripInfoBox = async (
    dayIndex: string,
    planDocId: string,
    place: PlaceType,
  ) => {
    try {
      const result = await DB_deleteTripPlanPlace(dayIndex, planDocId, place);
      if (result) {
        setState((prev) => !prev);
      }
    } catch (e) {
      console.error(e);
    }
  };
  // useEffect(() => {
  //   console.log(`PlaceBox-${number}被渲染`);
  // }, []);
  return (
    <>
      <div
        className="relative z-10 mb-[40px] flex h-[120px] w-full border-t bg-white p-5 shadow-lg"
        onMouseEnter={() => setShowDeleteBtn((pre) => !pre)}
        onMouseLeave={() => setShowDeleteBtn((pre) => !pre)}
      >
        <div
          className="w-ful relative flex h-full hover:cursor-pointer"
          onClick={() => {
            setPlaceBoxInfo(place);
            setShowPlaceInfo(true);
            setPlaceLatLng([place.location.latitude, place.location.longitude]);
          }}
        >
          <div className="relative min-h-20 min-w-20 bg-slate-400">
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center bg-slate-600">
              <p className="text-white">{String(number + 1)}</p>
            </div>
          </div>
          <div className="ml-2 flex w-full flex-col justify-center">
            <div>
              <span
                onClick={() => {
                  setShowStaySetting(true);
                }}
                className="underline hover:cursor-pointer hover:bg-slate-200 hover:font-bold"
              >
                {stayTimeMinute === "00"
                  ? stayTimeHour + "小時"
                  : stayTimeHour === "0"
                    ? stayTimeMinute + "分鐘"
                    : stayTimeHour + "時" + stayTimeMinute + "分"}
              </span>
              <> | </>
              <span>{`${startTime} － ${endTime}`}</span>
            </div>
            <div className="max-w-[355px] overflow-hidden text-ellipsis text-nowrap font-bold">
              {name}
            </div>
            <div className="max-w-[355px] overflow-hidden text-ellipsis text-nowrap">
              {address}
            </div>
          </div>
        </div>
        {showDeleteBtn ? (
          <div
            onClick={() => deleteTripInfoBox(dayIndex, planDocId, place)}
            className="absolute right-0 top-0 rounded bg-slate-100 p-1 text-2xl hover:cursor-pointer hover:bg-slate-200 hover:font-bold"
          >
            <Image
              src="/trash-can.png"
              alt="trash"
              width={20}
              height={20}
            ></Image>
          </div>
        ) : (
          <></>
        )}
      </div>
      {showStayTimeSetting ? (
        <StayTimeSetting
          planDocId={planDocId}
          number={number}
          trip={trip}
          place={place}
          setState={setState}
          setShowStaySetting={setShowStaySetting}
        ></StayTimeSetting>
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaceBox;
