"use client";
import React, { useState, useEffect, useContext } from "react";
import TargetItem from "../TargetItem";
import Image from "next/image";
import { DB_updateTripInfoByDocId } from "@/libs/db/CreateTripPage";
import { StateContext } from "@/contexts/ContextProvider";
import CalendarCard from "../Calendar";
import { getDateBetween } from "@/libs/getDatesBetween";
import { DB_updateTrips } from "@/libs/db/EditTripPage";
import { getNewDateRangeTrips } from "@/libs/getNewDateRangeTrips";

type EditingCardProps = {
  docId: string;
  currentTripName: string;
  currentDates: string[];
  currentStartDate: string;
  currentEndDate: string;
  currentDestination: Array<string>;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditingCard = ({
  docId,
  currentTripName,
  currentDates,
  currentStartDate,
  currentEndDate,
  currentDestination,
  setShowEdit,
}: EditingCardProps) => {
  const [inputDestination, setInputDestination] = useState<string>("");
  const [destinaitonArray, setDestinaitonArray] = useState<Array<string>>([]);
  const [inputTripName, setInputTripName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(currentStartDate);
  const [endDate, setEndDate] = useState<string>(currentEndDate);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false);

  const setState = useContext(StateContext);
  if (!setState) {
    throw new Error("Can't access StateContext from EditingCard.tsx.");
  }

  useEffect(() => {
    if (currentTripName && currentDestination.length > 0) {
      setInputTripName(currentTripName);
      setDestinaitonArray(currentDestination);
    }
  }, [currentDestination]);
  // 關閉
  const cancelEdit = (): void => {
    setDestinaitonArray(currentDestination);
    setInputTripName(currentTripName);
    setShowEdit(false);
  };

  const updateHandler = async (docId: string, value: object) => {
    setIsCreating(true);
    const newTrips = await getNewDateRangeTrips(
      docId,
      currentDates,
      startDate,
      endDate,
    );
    try {
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
        setShowEdit(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
        <div className="min-w-[500px] rounded-lg bg-white p-4">
          <div className="mx-2 flex items-center">
            <Image
              src="/edit.png"
              alt="edit"
              width={30}
              height={30}
              style={{ width: "20px", height: "20px", marginRight: "4px" }}
            />
            <p className="text-xl font-bold">編輯行程</p>
          </div>
          <div className="mx-2 mt-4">
            <h3>旅遊日期</h3>
            <div
              className="flex w-full rounded border-[1px] border-solid border-black p-2 hover:cursor-pointer"
              onClick={() => setIsOpenCalendar(true)}
            >
              <div className="flex-auto">{startDate}</div>
              <div className="mx-2">→</div>
              <div className="flex-auto">{endDate}</div>
            </div>
          </div>
          <div className="mx-2 mt-4">
            <h3>目的地</h3>
            <div className="flex w-full flex-col rounded border border-solid border-black p-2">
              <div className="flex h-fit flex-wrap">
                {destinaitonArray.length > 0 ? (
                  destinaitonArray.map((target, index) => (
                    <TargetItem
                      key={index}
                      number={index}
                      target={target}
                      destinaitonArray={destinaitonArray}
                      setDestinaitonArray={setDestinaitonArray}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="relative flex w-full">
                <input
                  autoFocus
                  className="w-full outline-none placeholder:text-[#8e8e8e]"
                  value={inputDestination}
                  onChange={(e: any) => {
                    setInputDestination(e.target.value);
                  }}
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter" && inputDestination) {
                      setDestinaitonArray((prev) => [
                        ...prev,
                        inputDestination,
                      ]);
                      setInputDestination("");
                    }
                  }}
                ></input>
                {inputDestination ? (
                  <Image
                    onClick={() => {
                      if (inputDestination) {
                        setDestinaitonArray((prev) => [
                          ...prev,
                          inputDestination,
                        ]);
                        setInputDestination("");
                      }
                    }}
                    src="/insert.png"
                    alt="insert"
                    width={50}
                    height={50}
                    className="h-6 w-6 hover:cursor-pointer"
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="mx-2 mt-2">
            <h3>旅程名稱</h3>
            <div className="flex w-full rounded border border-solid border-black p-2">
              <input
                className="w-full outline-none placeholder:text-[#8e8e8e]"
                placeholder={currentTripName}
                onChange={(e) => setInputTripName(e.target.value)}
                value={inputTripName}
              ></input>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={cancelEdit}
              className="mr-3 w-14 rounded px-2 py-1 text-lg text-blue-500 transition hover:bg-blue-50"
            >
              關閉
            </button>
            {destinaitonArray.length === 0 ||
            !inputTripName ||
            (startDate === currentStartDate &&
              endDate === currentEndDate &&
              destinaitonArray === currentDestination &&
              currentTripName === inputTripName) ? (
              <button className="mr-2 rounded border border-gray-200 bg-gray-200 px-2 py-1 text-lg text-gray-400 hover:cursor-default">
                儲存
              </button>
            ) : isCreating ? (
              <button className="flex w-14 items-center justify-center rounded border border-solid border-black px-2 py-1 text-lg hover:cursor-default">
                <Image
                  src="/loading.gif"
                  width={20}
                  height={20}
                  alt="loading"
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  const value = {
                    dates: getDateBetween(startDate, endDate),
                    startDate: startDate,
                    endDate: endDate,
                    tripName: inputTripName,
                    destination: destinaitonArray,
                  };
                  updateHandler(docId, value);
                }}
                className="mr-2 rounded border border-blue-700 bg-blue-500 px-2 py-1 text-lg text-white transition hover:bg-blue-700"
              >
                儲存
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpenCalendar ? (
        <div className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center">
          <CalendarCard
            currentStartDate={startDate}
            currentEndDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setIsOpenCalendar={setIsOpenCalendar}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditingCard;
