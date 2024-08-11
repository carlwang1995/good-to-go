"use client";
import React, { useEffect, useState } from "react";
import TripInfoBox from "./TripInfoBox";
import { DB_getTripInfo } from "@/libs/db/EditTripPage";
import TrafficTimeBox from "./TrafficTimeBox";

type TripDateCardProps = {
  docId: string;
  index: number;
  dateCount: string;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

type placesType = {
  name: string;
  address: string;
  stayTime: string;
};

const TripInfoCard = ({
  docId,
  index,
  dateCount,
  setIsSearching,
}: TripDateCardProps) => {
  // const [tripInfoThisDate, setTripInfoThisDate] = useState<object>();
  const [startTime, setStartTime] = useState<string>("08:00");
  const [places, setPlaces] = useState<Array<placesType>>();

  useEffect(() => {
    DB_getTripInfo().then((tripInfo) => {
      // console.log(tripInfo.trips[index]);
      // setTripInfoThisDate(tripInfo.trips[index]);
      setStartTime(tripInfo.trips[index].startTime);
      setPlaces(tripInfo.trips[index].places);
    });
  }, [index]);
  return (
    <div className="h-[calc(100%-216px)] overflow-x-hidden overflow-y-scroll">
      <div className="mt-4 flex items-center justify-center bg-slate-300">
        <p>{dateCount}</p>
      </div>
      <div className="p-2">
        <span>出發時間：</span>
        <span className="underline hover:cursor-pointer hover:font-bold">
          {startTime}
        </span>
      </div>
      <>
        {places ? (
          places.map((place, index) => (
            <TripInfoBox
              key={index}
              number={index}
              stayTime={place.stayTime}
              startTime="08:00"
              endTime="09:00"
              name={place.name}
              address={place.address}
            />
          ))
        ) : (
          <></>
        )}
      </>
      <div className="flex items-center justify-center p-10">
        <button
          className="rounded border-[1px] border-solid border-black bg-white p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
          onClick={() => setIsSearching(true)}
        >
          + 搜尋並加入景點
        </button>
      </div>
    </div>
  );
};

export default TripInfoCard;
