import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import PlaceBox from "./PlaceBox";
import TrafficBox from "./TrafficBox";
import SearchContent from "../Search/SearchContent";
import OpenSearchBtn from "./OpenSearchBtn";
import PlaceInfoCard from "./PlaceInfoCard";
import StartTimeSetting from "./StartTimeSetting";
import { DB_getPlanByDocId, DB_upadatePlaceInfo } from "@/libs/db/EditTripPage";
import { addTime } from "@/libs/timeConvertor";
import {
  DayIndexContext,
  DocIdContext,
  MarkerContext,
  StateContext,
  EditableContext,
} from "@/contexts/ContextProvider";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

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

type PlanCardProps = {
  docId: string; // 向DB取得PLAN資料
  dateCount: string; // 渲染第幾天
};
const PlanCard = ({ docId, dateCount }: PlanCardProps) => {
  const [state, setState] = useState(false); // 觸發資料庫Reuqest
  const [planDocId, setPlanDocId] = useState<string>("");
  const [planContent, setPlanContent] = useState<PlanContentType | null>(null);
  const [trip, setTrip] = useState<TripType | null>(null); // 某一天的行程，包含出發時間字串、行程陣列
  const [placeInfo, setPlaceInfo] = useState<PlaceType>();
  const [placeBoxArray, setPlaceBoxArray] =
    useState<Array<React.ReactElement> | null>(null);
  const [trafficBoxArray, setTrafficBoxArray] =
    useState<Array<React.ReactElement> | null>(null);
  const [trafficTimeObject, setTrafficTimeObject] = useState<{
    [key: string]: string;
  }>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showPlaceInfo, setShowPlaceInfo] = useState<boolean>(false);
  const [showStartTimeSetting, setShowStartTimeSetting] =
    useState<boolean>(false);

  const dayIndex: string = useContext(DayIndexContext);
  const { setMarkers, setPlaceLatLng } = useContext(MarkerContext);
  const isEditable = useContext(EditableContext);

  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (!setMarkers || !setPlaceLatLng) {
    throw new Error("Can't access MarkerContext.");
  }
  if (isEditable === undefined) {
    throw new Error("Can't access EditableContext.");
  }

  // 將景點間的交通時間處理為[{number-id-id : duraction},{number-id-id : duraction},{number-id-id : duraction}...]
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
  // 拖曳結束後執行函式
  const handleOnDragEnd = (event: any) => {
    if (!isEditable) {
      return;
    }
    const { source, destination } = event;
    if (!destination) {
      return;
    }
    if (source.index != destination.index) {
      // 先處理PlaceBox畫面呈現
      const newPlaceBoxArray = [...placeBoxArray!];
      const [removePlaceBox] = newPlaceBoxArray.splice(source.index, 1);
      newPlaceBoxArray.splice(destination.index, 0, removePlaceBox);
      setPlaceBoxArray(newPlaceBoxArray);
      // 實際處理Places順序，並儲存至資料庫、刷新狀態重新渲染
      const newTripPlaces = trip!.places;
      const [removePlace] = newTripPlaces.splice(source.index, 1);
      newTripPlaces.splice(destination.index, 0, removePlace);
      if (planDocId && dayIndex) {
        DB_upadatePlaceInfo(planDocId, dayIndex, newTripPlaces)
          .then((result) => {
            if (result) {
              setState((prev) => !prev);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
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
    setPlaceLatLng(null);
    setShowPlaceInfo(false);
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
            setPlaceInfo={setPlaceInfo}
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
    <StateContext.Provider value={setState}>
      <DocIdContext.Provider value={planDocId}>
        <div className="h-full overflow-x-hidden overflow-y-scroll">
          <div className="mt-2 flex items-center justify-center bg-slate-300">
            <p className="py-1 text-lg font-bold text-slate-600">{dateCount}</p>
          </div>
          <div className="ml-5 py-2">
            <span>出發時間：</span>
            {isEditable ? (
              <span
                onClick={() => setShowStartTimeSetting(true)}
                className="underline hover:cursor-pointer hover:font-bold"
              >
                {trip ? trip.startTime : null}
              </span>
            ) : (
              <span>{trip ? trip.startTime : null}</span>
            )}
          </div>
          <div className="relative">
            {/* 景點資訊區塊 */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="droppable-1">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {isEditable
                      ? placeBoxArray?.map((placeBox, index) => (
                          <Draggable
                            key={placeBox.key} // 每一個ReactElement 都會有 key 屬性
                            draggableId={String(placeBox.key!)} // 加 "!"，告訴TypeScript確定此變數為真，不需檢查
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="relative"
                              >
                                <Image
                                  {...provided.dragHandleProps}
                                  src="/two-direction-arrows.png"
                                  alt="arrow"
                                  width={30}
                                  height={30}
                                  className="absolute bottom-10 right-0 z-20 hover:cursor-move"
                                ></Image>
                                <div>{placeBox}</div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      : placeBoxArray?.map((placeBox) => placeBox)}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* 交通資訊區塊 */}
            <div className="absolute top-0 w-full">{trafficBoxArray}</div>
            {/* 開啟搜尋視窗按鈕 */}
            {isEditable ? (
              <OpenSearchBtn
                setIsSearching={setIsSearching}
                setShowPlaceInfo={setShowPlaceInfo}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {isSearching && isEditable ? (
          <SearchContent setIsSearching={setIsSearching} />
        ) : (
          <></>
        )}
        {showPlaceInfo ? (
          <PlaceInfoCard
            placeInfo={placeInfo}
            setShowPlaceInfo={setShowPlaceInfo}
          />
        ) : (
          <></>
        )}
        {showStartTimeSetting && isEditable ? (
          <StartTimeSetting
            planDocId={planDocId}
            trip={trip}
            setState={setState}
            setShowStartTimeSetting={setShowStartTimeSetting}
          />
        ) : (
          <></>
        )}
      </DocIdContext.Provider>
    </StateContext.Provider>
  );
};

export default PlanCard;
