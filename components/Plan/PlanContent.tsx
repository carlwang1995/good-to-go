"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import DateItem from "./DateItem";
import TripInfoCard from "./TripInfoCard";
import { DB_getTripNameByDocId } from "@/libs/db/EditTripPage";
import {
  DayIndexContext,
  DestinationContext,
} from "@/contexts/ContextProvider";

const PlanContent = ({ docId }: { docId: string }) => {
  const [dayIndex, setDayIndex] = useState<string>("day1");
  const [dateCount, setDateCount] = useState<string>("第1天");
  const [tripName, setTripName] = useState<string | undefined>(undefined);
  const [destinationArr, setDestinationArr] = useState<
    Array<string> | undefined
  >();
  const [destinations, setDestinations] = useState<string>("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [dates, setDates] = useState<Array<string>>();
  const dateSectionRef = useRef<HTMLDivElement | null>(null);
  const [tripPhoto, setTripPhoto] = useState<string | undefined>();

  useEffect(() => {
    DB_getTripNameByDocId(docId).then((tripInfo: any) => {
      const { tripName, destination, startDate, endDate, dates, photo } =
        tripInfo;
      setDestinationArr(destination);
      setTripName(tripName);
      setStartDate(startDate);
      setEndDate(endDate);
      setDates(dates);
      setTripPhoto(photo.photoUrl);
    });
  }, [docId]);

  useEffect(() => {
    let destinationName = "";
    if (destinationArr) {
      for (let i = 0; i < destinationArr.length; i++) {
        if (i === destinationArr.length - 1) {
          destinationName += destinationArr[i];
        } else {
          destinationName += `${destinationArr[i]}, `;
        }
      }
    }
    setDestinations(destinationName);
  }, [destinationArr]);

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
      <div className="relative border-b border-solid border-slate-300 shadow-lg">
        {tripPhoto ? (
          <Image
            priority={true}
            fill={true}
            sizes="min-width:500px"
            src={tripPhoto}
            alt="background"
            className="absolute left-0 top-0 z-0 h-40 w-full"
          ></Image>
        ) : (
          <div className="absolute left-0 top-0 z-0 flex h-40 w-full items-center justify-center">
            <Image
              src="/loading.gif"
              alt="loading"
              width={50}
              height={50}
            ></Image>
          </div>
        )}
        <div className="relative z-10 bg-black/30">
          <div className="flex h-16 w-full items-center bg-black/60 p-3">
            <Link href="/trips">
              <span className="mr-3 w-8 text-xl text-white hover:font-bold">
                ←
              </span>
            </Link>
            <span className="text-xl text-white">{tripName}</span>
          </div>
          <div className="flex h-24 w-full flex-col items-center justify-center p-3">
            <div className="w-full">
              <span className="text-white">{startDate}</span>
              <span className="text-white"> - </span>
              <span className="text-white">{endDate}</span>
            </div>
            <div className="mt-1 w-full">
              <p className="text-white">{destinations}</p>
            </div>
          </div>
        </div>

        <div className="relative flex h-14 w-full bg-white">
          <div
            onClick={dateScrollToLeft}
            className="absolute left-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300"
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
                dayIndex={dayIndex}
                setDateCount={setDateCount}
                setDayIndex={setDayIndex}
              />
            ))}
          </div>
          <div
            onClick={dateScrollToRight}
            className="hover: absolute right-0 top-0 z-10 flex h-full items-center justify-center border border-white bg-white px-1 hover:cursor-pointer hover:border-slate-300"
          >
            <div className="text-2xl">&#10095;</div>
          </div>
        </div>
      </div>
      <DayIndexContext.Provider value={dayIndex}>
        <DestinationContext.Provider
          value={destinationArr ? destinationArr : []}
        >
          <TripInfoCard docId={docId} dateCount={dateCount} />
        </DestinationContext.Provider>
      </DayIndexContext.Provider>
    </div>
  );
};

export default PlanContent;
