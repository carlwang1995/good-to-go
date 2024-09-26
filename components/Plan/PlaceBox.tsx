import React, { useState, useContext } from "react";
import Image from "next/image";
import {
  DayIndexContext,
  DocIdContext,
  EditableContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { addTime, getTimeNow } from "@/libs/timeConvertor";
import { DB_deleteTripPlanPlace } from "@/libs/db/PlansDoc";
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
  lastEditTime: string;
}

type PlaceBoxProps = {
  number: number;
  trip: TripType;
  place: PlaceType;
  startTime: string;
};

const PlaceBox = ({ number, trip, place, startTime }: PlaceBoxProps) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);
  const [showStayTimeSetting, setShowStaySetting] = useState<boolean>(false);
  const { setPlaceLatLng, setPlaceInfo, setShowPlaceInfo } = useMapMarkers();
  const { stayTime, name, address, location, photos } = place;

  const dayIndex = useContext(DayIndexContext);
  const planDocId = useContext(DocIdContext);
  const isEditable = useContext(EditableContext);
  const { planContent, setPlanContent } = useContext(PlanContentContext);

  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (!planDocId) {
    throw new Error("Can't access DocIdContext.");
  }
  if (isEditable === undefined) {
    throw new Error("Can't access MarkerContext.");
  }
  if (!planContent || !setPlanContent) {
    throw new Error("Can't access PlanContentContext.");
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
        const newPlanContent = { ...planContent };
        newPlanContent.trips[dayIndex].places.splice(number, 1);
        newPlanContent.trips[dayIndex].lastEditTime = getTimeNow();
        setPlanContent(newPlanContent);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        className="relative mb-[40px] flex h-[120px] w-full border-t border-solid border-gray-200 bg-white p-5 shadow-md transition hover:shadow-lg max-sm:h-fit max-sm:p-2"
        onMouseEnter={() => setShowDeleteBtn(true)}
        onMouseLeave={() => setShowDeleteBtn(false)}
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
          <div className="relative min-h-20 min-w-20 bg-blue-300 max-sm:hidden">
            <Image
              src={photos.length > 0 ? photos[0] : "/picture.png"}
              alt="place's image"
              fill={true}
              sizes="(min-width:80px)"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center bg-blue-700/80">
              <p className="font-semibold text-white">{String(number + 1)}</p>
            </div>
          </div>
          <div
            className={`flex items-center ${isEditable ? "max-sm:ml-12" : "max-sm:ml-4"}`}
          >
            <div className="hidden min-h-7 min-w-7 items-center justify-center bg-blue-700/80 max-sm:flex">
              <p className="font-semibold text-white">{String(number + 1)}</p>
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
                <span
                  onClick={() => {
                    if (!isEditable) {
                      return;
                    }
                    setShowStaySetting(true);
                  }}
                  className={` ${isEditable ? "text0 relative z-10 underline hover:cursor-pointer hover:font-bold" : "relative z-30"} `}
                >
                  {stayTimeMinute === "00"
                    ? stayTimeHour + "小時"
                    : stayTimeHour === "0"
                      ? stayTimeMinute + "分鐘"
                      : stayTimeHour + "時" + stayTimeMinute + "分"}
                </span>
                <span className="mx-1">|</span>
                <span>{`${startTime} － ${endTime}`}</span>
              </div>
              <div className="max-w-[355px] overflow-hidden text-ellipsis text-nowrap text-lg font-bold max-sm:text-base">
                {name}
              </div>
              <div className="max-w-[355px] overflow-hidden text-ellipsis text-nowrap text-gray-500 max-sm:text-sm">
                {address}
              </div>
            </div>
          </div>
        </div>
        {isEditable && (
          <div
            onClick={async () => {
              await deleteTripInfoBox(dayIndex, planDocId, place);
              setPlaceLatLng(null);
              setShowPlaceInfo(false);
            }}
            className={`absolute right-0 top-0 z-10 rounded p-1 hover:cursor-pointer max-sm:hidden ${showDeleteBtn ? "visible" : "invisible"}`}
          >
            <Image src="/delete.png" alt="delete" width={20} height={20} />
          </div>
        )}
        {isEditable && (
          <div
            onClick={async () => {
              await deleteTripInfoBox(dayIndex, planDocId, place);
              setPlaceLatLng(null);
              setShowPlaceInfo(false);
            }}
            className="absolute right-1 top-1 z-10 hidden rounded p-1 hover:cursor-pointer max-sm:block"
          >
            <Image src="/close-red.png" alt="delete" width={15} height={15} />
          </div>
        )}
      </div>
      {showStayTimeSetting && isEditable && (
        <StayTimeSetting
          planDocId={planDocId}
          number={number}
          trip={trip}
          place={place}
          setShowStaySetting={setShowStaySetting}
        />
      )}
    </>
  );
};

export default PlaceBox;
