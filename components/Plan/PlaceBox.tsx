import React, { useState, useContext } from "react";
import Image from "next/image";
import {
  DayIndexContext,
  StateContext,
  DocIdContext,
  EditableContext,
} from "@/contexts/ContextProvider";
import { addTime } from "@/libs/timeConvertor";
import { DB_deleteTripPlanPlace } from "@/libs/db/EditTripPage";
import StayTimeSetting from "./PlaceStayTimeSetting";
import { useMapMarkers } from "@/contexts/UseMapMarkers";

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
}

type PlaceBoxProps = {
  number: number;
  trip: TripType;
  place: PlaceType;
  startTime: string;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaceInfo: React.Dispatch<React.SetStateAction<PlaceType | undefined>>;
};

const PlaceBox = ({
  number,
  trip,
  place,
  startTime,
  setShowPlaceInfo,
  setPlaceInfo,
}: PlaceBoxProps) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);
  const [showStayTimeSetting, setShowStaySetting] = useState<boolean>(false);
  const { stayTime, name, address, location, photos } = place;

  const { setPlaceLatLng } = useMapMarkers();
  const dayIndex = useContext(DayIndexContext);
  const setState = useContext(StateContext);
  const planDocId = useContext(DocIdContext);
  const isEditable = useContext(EditableContext);

  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (!setState) {
    throw new Error("Can't access StateContext.");
  }
  if (!planDocId) {
    throw new Error("Can't access DocIdContext.");
  }

  if (isEditable === undefined) {
    throw new Error("Can't access MarkerContext.");
  }

  const endTime = addTime(startTime, stayTime);
  // 停留時間轉成XX小時XX分鐘格式
  let [stayTimeHour, stayTimeMinute] = stayTime.split(":");
  if (stayTimeHour[0] === "0") {
    stayTimeHour = stayTimeHour[1];
  }
  // 刪除景點
  const deleteTripInfoBox = async (
    dayIndex: string,
    planDocId: string,
    place: PlaceType,
  ) => {
    if (!isEditable) {
      return;
    }
    try {
      const result = await DB_deleteTripPlanPlace(dayIndex, planDocId, place);
      if (result) {
        setState((prev) => !prev);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="relative z-10 mb-[40px] flex h-[120px] w-full border-t border-solid border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg"
        onMouseEnter={() => setShowDeleteBtn((pre) => !pre)}
        onMouseLeave={() => setShowDeleteBtn((pre) => !pre)}
      >
        <div
          onClick={() => {
            setPlaceInfo(place);
            setShowPlaceInfo(true);
            setPlaceLatLng({
              number: number + 1,
              position: [location.latitude, location.longitude],
            });
          }}
          className="absolute left-0 top-0 z-10 h-full w-full hover:cursor-pointer"
        ></div>
        <div className="w-ful relative flex h-full">
          <div className="relative min-h-20 min-w-20 bg-slate-400">
            <Image
              src={photos.length > 0 ? photos[0] : "/picture.png"}
              alt="place's image"
              fill={true}
              sizes="(min-width:80px)"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center bg-blue-500/60">
              <p className="font-semibold text-white">{String(number + 1)}</p>
            </div>
          </div>
          <div className="ml-2 flex w-full flex-col justify-center">
            <div className="flex items-center">
              <Image
                className="mr-1 h-[15px]"
                src="/stay-time-icon.png"
                alt="stayTimeIcon"
                width={15}
                height={15}
              />
              {isEditable ? (
                <span
                  onClick={() => {
                    setShowStaySetting(true);
                  }}
                  className="relative z-30 underline hover:cursor-pointer hover:font-bold"
                >
                  {stayTimeMinute === "00"
                    ? stayTimeHour + "小時"
                    : stayTimeHour === "0"
                      ? stayTimeMinute + "分鐘"
                      : stayTimeHour + "時" + stayTimeMinute + "分"}
                </span>
              ) : (
                <span className="relative z-30">
                  {stayTimeMinute === "00"
                    ? stayTimeHour + "小時"
                    : stayTimeHour === "0"
                      ? stayTimeMinute + "分鐘"
                      : stayTimeHour + "時" + stayTimeMinute + "分"}
                </span>
              )}

              <span className="mx-1">|</span>
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
        {showDeleteBtn && isEditable ? (
          <div
            onClick={async () => {
              await deleteTripInfoBox(dayIndex, planDocId, place);
              setPlaceLatLng(null);
              setShowPlaceInfo(false);
            }}
            className="absolute right-0 top-0 z-30 rounded p-1 hover:cursor-pointer"
          >
            <Image src="/delete.png" alt="delete" width={20} height={20} />
          </div>
        ) : (
          <></>
        )}
      </div>
      {showStayTimeSetting && isEditable ? (
        <StayTimeSetting
          planDocId={planDocId}
          number={number}
          trip={trip}
          place={place}
          setState={setState}
          setShowStaySetting={setShowStaySetting}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default PlaceBox;
