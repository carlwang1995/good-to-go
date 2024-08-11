"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TripDate from "./TripDate";
import TripInfoCard from "./TripInfoCard";
import SearchCard from "./Search/SearchCard";
import { DB_getTripInfoByDocId } from "@/libs/db/EditTripPage";

// type tripInfoType = {
//   userId: string | undefined;
//   tripName: string | undefined;
//   destination: string | undefined;
//   startDate: string | undefined;
//   endDate: string | undefined;
// };

const TripCard = ({ docId }: { docId: string }) => {
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [tripName, setTripName] = useState<string | undefined>(undefined);
  const [destination, setDestination] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [dates, setDates] = useState<Array<string>>();
  const dateSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    DB_getTripInfoByDocId(docId).then((tripInfo: any) => {
      // console.log(tripInfo);
      const { tripName, destination, startDate, endDate, dates } = tripInfo;
      setTripName(tripName);
      setDestination(destination);
      setStartDate(startDate);
      setEndDate(endDate);
      setDates(dates);
    });
  }, []);

  const scrollRange = 300;
  const dateScrollToLeft = () => {
    dateSectionRef.current.scrollLeft -= scrollRange;
  };
  const dateScrollToRight = () => {
    dateSectionRef.current.scrollLeft += scrollRange;
  };

  return (
    <div className="h-full bg-slate-50">
      {isSearching ? (
        <SearchCard setIsSearching={setIsSearching} />
      ) : (
        <>
          <div className="h-fit w-[500px] shadow-lg">
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
                className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-slate-500 bg-white px-1 hover:cursor-pointer hover:border-2 hover:font-bold"
              >
                <div>＜</div>
              </div>
              <div
                className="flex h-full w-full overflow-x-hidden scroll-smooth whitespace-nowrap px-7"
                ref={dateSectionRef}
              >
                {dates?.map((date, index) => (
                  <TripDate
                    key={index}
                    date={date}
                    dateCount={index}
                    setDateCount={setDateCount}
                  />
                ))}
              </div>
              <div
                onClick={dateScrollToRight}
                className="absolute right-0 top-0 z-10 flex h-full items-center justify-center border border-slate-500 bg-white px-1 hover:cursor-pointer hover:border-2 hover:font-bold"
              >
                <div>＞</div>
              </div>
            </div>
          </div>
          <TripInfoCard dateCount={dateCount} setIsSearching={setIsSearching} />
        </>
      )}
    </div>
  );
};

export default TripCard;
