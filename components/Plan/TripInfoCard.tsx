import React, { useEffect, useState } from "react";
import TripInfoBox from "./TripInfoBox";
import TrafficTimeBox from "./TrafficTimeBox";
import SearchCard from "./Search/SearchCard";
import OpenSearchBtn from "./OpenSearchBtn";
import { DB_getPlanByDocId } from "@/libs/db/EditTripPage";
import { addTime } from "@/libs/timeConvertor";

type TripInfoProps = {
  index: number;
  docId: string;
  dateCount: string;
};
type PlanContentType = {
  docId: string;
  trips: Array<{ startTime: string; places: Array<PlacesType> }>;
};
type PlacesType = {
  placeId: string;
  name: string;
  address: string;
  stayTime: string;
};

const TripInfoCard = ({ index, docId, dateCount }: TripInfoProps) => {
  const [planDocId, setPlanDocId] = useState<string>("");
  const [planContent, setPlanContent] = useState<PlanContentType | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<string>(""); // 某一天的出發時間字串
  const [places, setPlaces] = useState<Array<PlacesType>>(); // 某一天的行程陣列
  const [tripBoxArray, setTripBoxArray] = useState<Array<any> | null>(null);
  const [trafficBoxArray, setTrafficBoxArray] = useState<Array<any> | null>(
    null,
  );
  const [departTimeArray, setDepartTimeArray] = useState<Array<string>>([]);
  const [trafficTimeObject, setTrafficTimeObject] = useState<{
    [key: string]: string;
  }>({});

  const handleTrafficTime = (
    number: string,
    departId: string,
    destinedId: string,
    duration: string,
  ) => {
    setTrafficTimeObject((pre) => ({
      ...pre,
      [`${number}-${departId}-${destinedId}`]: duration,
    }));
  };

  useEffect(() => {
    DB_getPlanByDocId(docId).then((plan: any) => {
      setPlanDocId(plan.planDocId);
      setPlanContent(plan.result);
    });
  }, [docId]);

  useEffect(() => {
    if (planContent) {
      setStartTime(planContent.trips[index].startTime);
      setPlaces(planContent.trips[index].places);
    }
  }, [planContent, index]);

  useEffect(() => {
    if (places && places.length > 0) {
      const departArray: Array<string> = [];
      const trafficBoxArray: Array<React.JSX.Element> = [];
      const tripBoxArray: Array<React.JSX.Element> = [];

      // 各景點出發時間資訊裝在陣列中
      for (let i = 0; i < places.length; i++) {
        if (i === 0) {
          departArray.push(startTime); // 起點的出發時間必為該日行程的"StartTime"
        } else if (startTime !== "") {
          const prevTime = departArray[i - 1]; // 前一景點的開始時間
          const prevStayTime = places[i - 1].stayTime; // 前一景點的停留時間
          const trafficTime =
            trafficTimeObject[
              `${i - 1}-${places[i - 1].placeId}-${places[i].placeId}`
            ] || "00:00"; // 前一景點的停留時間到本景點的交通時間，預設為"00:00"
          const placeStartTime = addTime(
            addTime(prevTime, prevStayTime),
            trafficTime,
          );

          departArray.push(placeStartTime); //各景點的出發時間為前一行程的"StartTime+StayTime"
        }
      }
      // 景點資訊組件裝在陣列中
      for (let i = 0; i < places.length; i++) {
        tripBoxArray.push(
          <TripInfoBox
            key={i}
            number={i}
            placeId={places[i].placeId}
            stayTime={places[i].stayTime}
            trafficTime={i === 0 ? "00:00" : "00:00"} //起點的交通時間必為"00:00"
            startTime={departArray[i]}
            name={places[i].name}
            address={places[i].address}
          />,
        );
      }
      // 交通資訊組件裝在陣列中
      for (let i = 0; i < places.length - 1; i++) {
        trafficBoxArray.push(
          <TrafficTimeBox
            key={i}
            number={i}
            departId={places[i].placeId}
            destinedId={places[i + 1].placeId}
            handleTrafficTime={handleTrafficTime}
          />,
        );
      }
      setDepartTimeArray(departArray);
      setTripBoxArray(tripBoxArray);
      setTrafficBoxArray(trafficBoxArray);
    }
  }, [places, startTime, trafficTimeObject]);

  return (
    <>
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="mt-4 flex items-center justify-center bg-slate-300">
          <p>{dateCount}</p>
        </div>
        <div className="p-2">
          <span>出發時間：</span>
          <span className="underline hover:cursor-pointer hover:font-bold">
            {startTime}
          </span>
        </div>
        <div className="relative">
          {tripBoxArray}
          <div className="absolute top-0 w-full">{trafficBoxArray}</div>
          <OpenSearchBtn setIsSearching={setIsSearching} />
        </div>
      </div>
      {isSearching ? (
        <SearchCard
          index={index}
          planDocId={planDocId}
          setIsSearching={setIsSearching}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default TripInfoCard;
