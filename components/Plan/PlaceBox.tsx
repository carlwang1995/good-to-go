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
  const { setPlaceInfo, setShowPlaceInfo, setPlaceMarker } = useMapMarkers();
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
            setPlaceMarker({
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
                {/* Stay Time Icon */}
                <svg
                  fill="#000000"
                  viewBox="0 0 24 24"
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15px"
                  height="15px"
                  className="mr-1"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M23,11a1,1,0,0,0-1,1,10.034,10.034,0,1,1-2.9-7.021A.862.862,0,0,1,19,5H16a1,1,0,0,0,0,2h3a3,3,0,0,0,3-3V1a1,1,0,0,0-2,0V3.065A11.994,11.994,0,1,0,24,12,1,1,0,0,0,23,11Z M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z"></path>
                  </g>
                </svg>
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
              setPlaceMarker(null);
              setShowPlaceInfo(false);
            }}
            className={`absolute right-0 top-0 z-10 rounded p-1 hover:cursor-pointer max-sm:hidden ${showDeleteBtn ? "visible" : "invisible"}`}
          >
            {/* Trash Icon */}
            <svg
              viewBox="-3 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="20px"
              height="20px"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>trash</title> <desc>Created with Sketch Beta.</desc>
                <defs> </defs>
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Icon-Set-Filled"
                    transform="translate(-261.000000, -205.000000)"
                    fill="#ff0000"
                  >
                    <path
                      d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z"
                      id="trash"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        )}
        {isEditable && (
          <div
            onClick={async () => {
              await deleteTripInfoBox(dayIndex, planDocId, place);
              setPlaceMarker(null);
              setShowPlaceInfo(false);
            }}
            className="absolute right-1 top-1 z-10 hidden rounded p-1 hover:cursor-pointer max-sm:block"
          >
            {/* Close Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM7.29289 16.7071C6.90237 16.3166 6.90237 15.6834 7.29289 15.2929L10.5858 12L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L12 10.5858L15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L13.4142 12L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L12 13.4142L8.70711 16.7071C8.31658 17.0976 7.68342 17.0976 7.29289 16.7071Z"
                  fill="#ff0000"
                ></path>
              </g>
            </svg>
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
