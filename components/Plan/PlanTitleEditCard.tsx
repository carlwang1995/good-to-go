import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import TargetItem from "./TargetItem";
import CalendarCard from "./Calendar";
import { getNewDateRangeTrips } from "@/libs/getNewDateRangeTrips";
import { getDateBetween } from "@/libs/getDatesBetween";
import { DB_updateTrips } from "@/libs/db/PlansDoc";
import { DB_updateTripInfoByDocId } from "@/libs/db/TripsDoc";
import { Loading } from "../Loading";

type TripType = {
  userId: string;
  tripName: string;
  destination: Array<string>;
  dates: Array<string>;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
  privacy: boolean;
  createTime: string;
};

const PlanTitleEditCard = ({
  docId,
  tripInfo,
  setShowEditInput,
  setState,
}: {
  docId: string;
  tripInfo: TripType | undefined;
  setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputDestination, setInputDestination] = useState<string>("");
  const [destinaitonArray, setDestinaitonArray] = useState<
    Array<string> | undefined
  >(tripInfo && tripInfo.destination);
  const [inputTripName, setInputTripName] = useState<string | undefined>(
    tripInfo && tripInfo.tripName,
  );
  const [startDate, setStartDate] = useState<string | undefined>(
    tripInfo && tripInfo.startDate,
  );
  const [endDate, setEndDate] = useState<string | undefined>(
    tripInfo && tripInfo.endDate,
  );
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const updateHandler = async (docId: string, value: object) => {
    try {
      if (!tripInfo) {
        return;
      }
      setIsCreating(true);
      if (
        destinaitonArray?.length === 0 ||
        !inputTripName ||
        (startDate === tripInfo?.startDate &&
          endDate === tripInfo?.endDate &&
          destinaitonArray === tripInfo?.destination &&
          inputTripName === tripInfo?.tripName)
      ) {
        return;
      }
      const newTrips = await getNewDateRangeTrips(
        docId,
        tripInfo.dates,
        startDate!,
        endDate!,
      );
      if (newTrips) {
        const dateRangeResult = await DB_updateTrips(
          newTrips.planDocId,
          newTrips.trips,
        );
        if (dateRangeResult.error) {
          throw new Error(dateRangeResult.message);
        }
      }
      const result = await DB_updateTripInfoByDocId(docId, value);
      if (result.ok) {
        setState((prev) => !prev);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setShowEditInput(false);
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className="relative z-10 bg-black/30">
        <div className="relative flex h-16 w-full items-center bg-black/60 p-3">
          <div className="mr-3 min-w-7">
            <Image
              src="/left-arrow-white.png"
              width={24}
              height={24}
              alt="left arrow"
              className="hover:cursor-pointer"
              onClick={() => {
                setShowEditInput(false);
              }}
            />
          </div>
          {tripInfo && (
            <input
              autoFocus
              onChange={(e) => setInputTripName(e.target.value)}
              value={inputTripName}
              className="w-full border-b-2 border-white bg-transparent text-xl text-white outline-none"
              placeholder={tripInfo.tripName}
            ></input>
          )}
          <button
            onClick={() => {
              if (isCreating) {
                return;
              }
              const value = {
                dates: getDateBetween(startDate!, endDate!),
                startDate: startDate,
                endDate: endDate,
                tripName: inputTripName,
                destination: destinaitonArray,
              };
              updateHandler(docId, value);
            }}
            className="ml-3 flex min-h-9 min-w-12 items-center justify-center text-nowrap border border-white p-1 text-white transition hover:bg-white/30"
          >
            {isCreating ? <Loading widthPx={20} heightPx={20} /> : "完成"}
          </button>
        </div>
        <div className="flex min-h-24 w-full flex-col justify-center p-3">
          <div
            onClick={() => setIsOpenCalendar(true)}
            className="mt-[10px] w-fit transition hover:cursor-pointer hover:bg-white/30"
          >
            <span className="text-white">{startDate}</span>
            <span className="text-white"> - </span>
            <span className="text-white">{endDate}</span>
          </div>
          <div className="mt-2 flex h-fit w-full flex-col">
            <div className="flex h-fit flex-wrap p-1">
              {destinaitonArray &&
                destinaitonArray.length > 0 &&
                destinaitonArray.map((target, index) => (
                  <TargetItem
                    key={index}
                    number={index}
                    target={target}
                    destinaitonArray={destinaitonArray}
                    setDestinaitonArray={setDestinaitonArray}
                  />
                ))}
            </div>
            <div className="relative flex w-full">
              <input
                className="w-full border-b-2 border-solid border-white bg-transparent p-1 text-sm text-white outline-none placeholder:text-white"
                placeholder="輸入後按下「Enter」，加入多個城市"
                value={inputDestination}
                onChange={(e: any) => {
                  setInputDestination(e.target.value);
                }}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" && inputDestination) {
                    setDestinaitonArray((prev) => [...prev!, inputDestination]);
                    setInputDestination("");
                  }
                }}
              ></input>
              <Image
                onClick={() => {
                  if (inputDestination) {
                    setDestinaitonArray((prev) => [...prev!, inputDestination]);
                    setInputDestination("");
                  }
                }}
                src="/insert-white.png"
                alt="insert"
                width={50}
                height={50}
                className="h-6 w-6 hover:cursor-pointer"
                style={{ display: inputDestination ? "block" : "none" }}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpenCalendar && (
        <CalendarCard
          currentStartDate={startDate}
          currentEndDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setIsOpenCalendar={setIsOpenCalendar}
        />
      )}
    </>
  );
};

export default PlanTitleEditCard;
