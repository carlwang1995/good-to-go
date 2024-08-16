"use client";
import React, { useState, useEffect, useRef, createContext } from "react";
import Link from "next/link";
import DateItem from "./DateItem";
import TripInfoCard from "./TripInfoCard";
import { DB_getTripNameByDocId } from "@/libs/db/EditTripPage";

export const DayIndexContext = createContext<string>("");
export const DestinationContext = createContext<string>("");

const PlanContent = ({ docId }: { docId: string }) => {
  const [dayIndex, setDayIndex] = useState<string>("day1");
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [tripName, setTripName] = useState<string | undefined>(undefined);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [dates, setDates] = useState<Array<string>>();
  const dateSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    DB_getTripNameByDocId(docId).then((tripInfo: any) => {
      const { tripName, destination, startDate, endDate, dates } = tripInfo;
      setTripName(tripName);
      setDestination(destination);
      setStartDate(startDate);
      setEndDate(endDate);
      setDates(dates);
    });
  }, [docId]);

  const scrollRange = 300;
  const dateScrollToLeft = () => {
    if (dateSectionRef.current) {
      dateSectionRef.current.scrollLeft -= scrollRange;
    }
  };
  const dateScrollToRight = () => {
    if (dateSectionRef.current) {
      dateSectionRef.current.scrollLeft += scrollRange;
    }
  };

  return (
    <div className="flex h-full min-w-[500px] max-w-[500px] flex-col border-r border-slate-200 bg-slate-50">
      <div className="border-b border-solid border-slate-300 shadow-lg">
        <div className="flex h-16 w-full items-center bg-black/50 p-3">
          <Link href="/trips">
            <span className="mr-3 w-8 text-xl text-white hover:font-bold">
              ←
            </span>
          </Link>
          <span className="text-xl text-white">{tripName}</span>
        </div>
        <div className="flex h-24 w-full flex-col items-center justify-center bg-slate-500 p-3">
          <div className="w-full">
            <span className="text-white">{startDate}</span>
            <span className="text-white"> - </span>
            <span className="text-white">{endDate}</span>
          </div>
          <div className="w-full">
            <p className="text-white">{destination}</p>
          </div>
        </div>
        <div className="relative flex h-14 w-full bg-white">
          <div
            onClick={dateScrollToLeft}
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-500"
          >
            <div className="text-2xl">&#10094;</div>
          </div>
          <div
            className="flex h-full w-full overflow-x-hidden scroll-smooth whitespace-nowrap px-7"
            ref={dateSectionRef}
          >
            {dates?.map((date, index) => (
              <DateItem
                key={index}
                date={date}
                dateNumber={index}
                setDateCount={setDateCount}
                setDayIndex={setDayIndex}
              />
            ))}
          </div>
          <div
            onClick={dateScrollToRight}
            className="hover: absolute right-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-500"
          >
            <div className="text-2xl">&#10095;</div>
          </div>
        </div>
      </div>
      <DayIndexContext.Provider value={dayIndex}>
        <DestinationContext.Provider value={destination ? destination : ""}>
          <TripInfoCard docId={docId} dateCount={dateCount} />
        </DestinationContext.Provider>
      </DayIndexContext.Provider>
    </div>
  );
};

export default PlanContent;
