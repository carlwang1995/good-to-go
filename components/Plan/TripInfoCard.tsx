import React, { useContext, useEffect, useState } from "react";
import PlaceBox from "./PlaceBox";
import TrafficBox from "./TrafficBox";
import SearchContent from "../Search/SearchContent";
import OpenSearchBtn from "./OpenSearchBtn";
import PlaceCard from "./PlaceCard";
import StartTimeSetting from "./StartTimeSetting";
import { DB_getPlanByDocId } from "@/libs/db/EditTripPage";
import { addTime } from "@/libs/timeConvertor";
import {
  DayIndexContext,
  MarkerContext,
  ReloadStateContext,
} from "@/contexts/ContextProvider";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: string;
}

interface TripType {
  startTime: string;
  places: Array<PlaceType>;
}

type PlanContentType = {
  docId: string;
  trips: { [key: string]: TripType };
};

type TripInfoProps = {
  docId: string; // 向DB取得PLAN資料
  dateCount: string; // 渲染第幾天
};
const TripInfoCard = ({ docId, dateCount }: TripInfoProps) => {
  const [state, setState] = useState(false); // 觸發資料庫Reuqest
  const [planDocId, setPlanDocId] = useState<string>("");
  const [planContent, setPlanContent] = useState<PlanContentType | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [trip, setTrip] = useState<TripType | null>(null); // 某一天的行程，包含出發時間字串、行程陣列
  const [placeBoxArray, setPlaceBoxArray] = useState<Array<any> | null>(null);
  const [trafficBoxArray, setTrafficBoxArray] = useState<Array<any> | null>(
    null,
  );
  // const [departArray, setDepartArray] = useState<Array<string> | null>(null);
  const [trafficTimeObject, setTrafficTimeObject] = useState<{
    [key: string]: string;
  }>({});
  const [showPlaceInfo, setShowPlaceInfo] = useState<boolean>(false);
  const [placeBoxInfo, setPlaceBoxInfo] = useState<PlaceType>();
  const [showStartTimeSetting, setShowStartTimeSetting] =
    useState<boolean>(false);

  const dayIndex: string = useContext(DayIndexContext);
  const { setMarkers } = useContext(MarkerContext);

  const handleTrafficTime = (
    number: string,
    originId: string,
    destinationId: string,
    duration: string,
  ) => {
    setTrafficTimeObject((pre) => ({
      ...pre,
      [`${number}-${originId}-${destinationId}`]: duration,
    }));
  };

  useEffect(() => {
    DB_getPlanByDocId(docId)
      .then((plan: any) => {
        setPlanDocId(plan.planDocId);
        setPlanContent(plan.planContent);
      })
      .catch((e) => console.error(e));
  }, [docId, state]);

  useEffect(() => {
    if (planContent) {
      setTrip(planContent.trips[dayIndex]);
    }
  }, [planContent, dayIndex]);

  useEffect(() => {
    if (trip && trip.places.length > 0) {
      const newDepartArray: Array<string> = [];
      const newPlaceBoxArray: Array<React.JSX.Element> = [];
      const newTrafficBoxArray: Array<React.JSX.Element> = [];
      const newMarkersArray: Array<number[]> = [];

      // 各景點出發時間資訊裝在陣列中
      for (let i = 0; i < trip.places.length; i++) {
        if (trip && i === 0) {
          newDepartArray.push(trip.startTime); // 起點的出發時間必為該日行程的"StartTime"
        } else if (trip && trip.startTime !== "") {
          const prevTime = newDepartArray[i - 1]; // 前一景點的開始時間
          const prevStayTime = trip.places[i - 1].stayTime; // 前一景點的停留時間
          const trafficTime =
            trafficTimeObject[
              `${i - 1}-${trip.places[i - 1].placeId}-${trip.places[i].placeId}`
            ] || "00:00"; // 前一景點的停留時間到本景點的交通時間，預設為"00:00"
          const placeStartTime = addTime(
            addTime(prevTime, prevStayTime),
            trafficTime,
          );
          newDepartArray.push(placeStartTime); //各景點的出發時間為前一行程的"StartTime+StayTime"
          // setDepartArray(newDepartArray);
        }
      }
      // 景點資訊組件裝在陣列中
      for (let i = 0; i < trip.places.length; i++) {
        newPlaceBoxArray.push(
          <PlaceBox
            key={i}
            number={i}
            trip={trip}
            place={trip.places[i]}
            startTime={newDepartArray[i]}
            setShowPlaceInfo={setShowPlaceInfo}
            setPlaceBoxInfo={setPlaceBoxInfo}
          />,
        );
      }
      // 交通資訊組件裝在陣列中
      for (let i = 0; i < trip.places.length - 1; i++) {
        newTrafficBoxArray.push(
          <TrafficBox
            key={i}
            number={i}
            trip={trip}
            originId={trip.places[i].placeId}
            destinationId={trip.places[i + 1].placeId}
            handleTrafficTime={handleTrafficTime}
            mode={trip.places[i].trafficMode}
          />,
        );
      }
      // 所有景點座標裝在陣列中
      for (let i = 0; i < trip.places.length; i++) {
        newMarkersArray.push([
          trip.places[i].location.latitude,
          trip.places[i].location.longitude,
        ]);
      }
      setPlaceBoxArray(newPlaceBoxArray);
      setTrafficBoxArray(newTrafficBoxArray);
      setMarkers(newMarkersArray);
    } else {
      setPlaceBoxArray(null);
      setTrafficBoxArray(null);
      setMarkers([]);
    }
  }, [trip, trafficTimeObject]);

  return (
    <ReloadStateContext.Provider
      value={planDocId != "" ? { planDocId, setState } : null}
    >
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="mt-2 flex items-center justify-center bg-slate-300">
          <p className="py-1 text-lg font-bold text-slate-600">{dateCount}</p>
        </div>
        <div className="ml-5 py-2">
          <span>出發時間：</span>
          <span
            onClick={() => setShowStartTimeSetting(true)}
            className="font-bold underline hover:cursor-pointer hover:bg-slate-200"
          >
            {trip ? trip.startTime : null}
          </span>
        </div>
        <div className="relative">
          {placeBoxArray}
          {/* {departArray &&
            trip?.places.map((place, index) => (
              <PlaceBox
                key={index}
                number={index}
                trip={trip}
                place={place}
                startTime={departArray[index]}
                setShowPlaceInfo={setShowPlaceInfo}
                setPlaceBoxInfo={setPlaceBoxInfo}
              />
            ))} */}
          <div className="absolute top-0 w-full">{trafficBoxArray}</div>
          <OpenSearchBtn
            setIsSearching={setIsSearching}
            setShowPlaceInfo={setShowPlaceInfo}
          />
        </div>
      </div>
      {isSearching ? <SearchContent setIsSearching={setIsSearching} /> : <></>}
      {showPlaceInfo ? (
        <PlaceCard place={placeBoxInfo} setShowPlaceInfo={setShowPlaceInfo} />
      ) : (
        <></>
      )}
      {showStartTimeSetting ? (
        <StartTimeSetting
          planDocId={planDocId}
          trip={trip}
          setState={setState}
          setShowStartTimeSetting={setShowStartTimeSetting}
        />
      ) : (
        <></>
      )}
    </ReloadStateContext.Provider>
  );
};

export default TripInfoCard;
