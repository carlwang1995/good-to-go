import { DB_updateTripPlan } from "@/libs/db/PlansDoc";
import React, { useState, useContext } from "react";
import {
  DayIndexContext,
  DocIdContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import { getTimeNow } from "@/libs/timeConvertor";
import Button from "@/components/Button";

type PlaceType = {
  id?: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  openNow?: boolean;
  rating?: number;
  ratingCount?: number;
  photos?: Array<{ name: string; heightPx: number; widthPx: number }>;
  stayTime?: string;
  trafficMode?: string;
};

type PlaceInfoBottomBoxProps = {
  selectedPlace: PlaceType | null;
  photoUriArr: Array<string>;
  addDone: boolean;
  setAddDone: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlaceInfoBottomBox = ({
  selectedPlace,
  photoUriArr,
  addDone,
  setAddDone,
  setIsSearching,
  setIsShowSearchResult,
}: PlaceInfoBottomBoxProps) => {
  const [hour, setHour] = useState<string>("00");
  const [minute, setMinute] = useState<string>("30");

  const dayIndex = useContext(DayIndexContext); // day1,day2,day3 ...
  const planDocId = useContext(DocIdContext);
  const { planContent, setPlanContent } = useContext(PlanContentContext);
  const { setPlaceMarker } = useMapMarkers();

  if (!dayIndex || !planDocId) {
    throw new Error("Can't access context.");
  }
  if (!planContent || !setPlanContent) {
    throw new Error("Can't access PlanContentContext.");
  }

  const addPlace = async (
    selectedPlace: PlaceType | null,
    planDocId: string,
  ) => {
    const id = new Date().getTime();
    if (selectedPlace) {
      const newPlace = {
        placeId: selectedPlace.placeId,
        name: selectedPlace.name,
        address: selectedPlace.address,
        location: selectedPlace.location,
        openTime: selectedPlace.openTime,
        stayTime: `${hour}:${minute}`,
        id: id,
        trafficMode: "driving",
        photos: photoUriArr,
      };
      try {
        const result = await DB_updateTripPlan(dayIndex, planDocId, newPlace);
        if (result) {
          setAddDone(true);
          const newPlanContent = { ...planContent };
          newPlanContent.trips[dayIndex].places.push(newPlace);
          newPlanContent.trips[dayIndex].lastEditTime = getTimeNow();
          setPlanContent(newPlanContent);
        }
      } catch (e) {
        console.error("Error:行程資料更新失敗!");
        console.error(e);
      }
    }
  };
  return (
    <div className="absolute bottom-0 flex h-[130px] min-h-[130px] w-full flex-col justify-center bg-white pb-1 shadow-[0_-2px_10px_2px_rgba(0,0,0,0.1)]">
      {addDone ? (
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="p-2 text-xl text-green-500">加入成功！</div>
            <Button
              title="結束搜尋"
              type="close"
              onSmash={() => {
                setIsSearching(false);
                setIsShowSearchResult(false);
                setPlaceMarker(null);
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex w-full items-center justify-center">
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
            <p>預計停留：</p>
            <div className="flex flex-nowrap items-center">
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
            <Button
              title="+ 加入行程"
              type="confirm"
              onSmash={() => {
                addPlace(selectedPlace, planDocId);
                setPlaceMarker(null);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceInfoBottomBox;
