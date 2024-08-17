import React, { useContext, useEffect, useState } from "react";
import { DayIndexContext } from "../PlanContent";
import { TripContext } from "../TripInfoCard";
import { DB_updateTripPlan } from "@/libs/db/EditTripPage";

type PlaceType = {
  id?: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  stayTime?: string;
};

const PlaceInfoCard = ({
  addDone,
  setAddDone,
  selectedPlace,
  setIsShowSearchResult,
}: {
  addDone: boolean;
  setAddDone: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlace: PlaceType | null;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dayIndex = useContext(DayIndexContext); // day1,day2,day3 ...
  const context = useContext(TripContext);

  if (!context) {
    throw new Error("組件不屬於Context的子組件。");
  }

  const planDocId: string = context.planDocId;
  const setState: React.Dispatch<React.SetStateAction<boolean>> =
    context.setState;

  const addPlace = async (
    selectedPlace: PlaceType | null,
    planDocId: string,
  ) => {
    const id = new Date().getTime();
    if (selectedPlace) {
      const newPlace: PlaceType = {
        ...selectedPlace,
        stayTime: "01:00",
        id: id,
      };
      try {
        const result = await DB_updateTripPlan(dayIndex, planDocId, newPlace);
        if (result) {
          setState((prev) => !prev);
          setAddDone(true);
        }
      } catch (e) {
        alert("Error:行程資料更新失敗!");
        console.error(e);
      }
    }
  };

  return (
    <div className="absolute left-[500px] top-0 z-20 h-full w-[380px] overflow-y-auto overflow-x-hidden border-l border-slate-300 bg-white">
      <div className="flex h-16 items-center justify-end">
        <div
          className="m-4 px-1 text-xl hover:cursor-pointer hover:bg-slate-200"
          onClick={() => {
            setIsShowSearchResult(false);
            setAddDone(false);
          }}
        >
          &#10006;
        </div>
      </div>
      <div className="h-72 w-full bg-slate-400"></div>
      <div className="p-3">
        <p className="text-2xl font-bold">
          {selectedPlace ? selectedPlace.name : null}
        </p>
        <p className="mt-4 text-lg">
          {selectedPlace ? selectedPlace.address : null}
        </p>
      </div>
      <div className="flex items-center justify-center">
        {addDone ? (
          <div className="mt-4 p-2 text-xl text-green-500">加入成功！</div>
        ) : (
          <button
            onClick={() => addPlace(selectedPlace, planDocId)}
            className="mt-4 rounded border border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200"
          >
            + 加入行程
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceInfoCard;
