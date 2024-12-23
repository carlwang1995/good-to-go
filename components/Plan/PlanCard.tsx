import React, { useContext, useEffect, useState } from "react";
import PlaceBox from "./PlaceBox";
import TrafficBox from "./TrafficBox";
import SearchContent from "./Search/SearchContent";
import OpenSearchBtn from "./OpenSearchBtn";
import PlaceInfoCard from "./PlaceInfoCard";
import StartTimeSetting from "./StartTimeSetting";
import { LatLngExpression } from "leaflet";
import { DB_upadatePlaceInfo } from "@/libs/db/PlansDoc";
import { addTime } from "@/libs/timeConvertor";
import {
  DayIndexContext,
  DocIdContext,
  EditableContext,
  DestinationContext,
  PlanContentContext,
} from "@/contexts/ContextProvider";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import { getTimeNow } from "@/libs/timeConvertor";

type PlanCardProps = {
  planDocId: string | undefined;
  dateCount: string; // 渲染第X天
};
const PlanCard = ({ planDocId, dateCount }: PlanCardProps) => {
  const dayIndex: string = useContext(DayIndexContext);
  const isEditable = useContext(EditableContext);
  const destinationArr = useContext(DestinationContext);
  const { planContent, setPlanContent } = useContext(PlanContentContext);
  if (!dayIndex) {
    throw new Error("Can't access DayIndexContext.");
  }
  if (isEditable === undefined) {
    throw new Error("Can't access EditableContext.");
  }
  if (!destinationArr) {
    throw new Error("Can't access DestinationContext.");
  }
  if (!planContent || !setPlanContent) {
    throw new Error("Can't access PlanContentContext.");
  }

  const [lastEditTime, setLastEditTime] = useState<string | undefined>("");
  const [placeBoxArray, setPlaceBoxArray] =
    useState<Array<React.ReactElement> | null>(null);
  const [trafficBoxArray, setTrafficBoxArray] =
    useState<Array<React.ReactElement> | null>(null);
  const [trafficTimeObject, setTrafficTimeObject] = useState<{
    [key: string]: string;
  }>({});
  const [routesObject, setRoutesObject] = useState<{
    [key: string]: Array<[]>;
  }>({});
  const [destinationList, setDestinationList] = useState(destinationArr[0]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showStartTimeSetting, setShowStartTimeSetting] =
    useState<boolean>(false);

  const {
    mapState,
    setMarkers,
    setPlaceMarker,
    setRoutes,
    setPlaces,
    setShowPlaceInfo,
  } = useMapMarkers();

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
  const handleTrafficRoute = (
    number: string,
    originId: string,
    destinationId: string,
    routeArray: Array<[]>,
  ) => {
    setRoutesObject((pre) => ({
      ...pre,
      [`${number}-${originId}-${destinationId}`]: routeArray,
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
    if (source.index != destination.index && planContent) {
      // 先處理PlaceBox畫面呈現
      const newPlaceBoxArray = [...placeBoxArray!];
      const [removedPlaceBox] = newPlaceBoxArray.splice(source.index, 1);
      newPlaceBoxArray.splice(destination.index, 0, removedPlaceBox);
      setPlaceBoxArray(newPlaceBoxArray);
      // 實際處理Places順序，並儲存至資料庫、刷新狀態重新渲染
      const newTripPlaces = planContent?.trips[dayIndex].places;
      const [removedPlace] = newTripPlaces.splice(source.index, 1);
      newTripPlaces.splice(destination.index, 0, removedPlace);
      if (planDocId && dayIndex) {
        DB_upadatePlaceInfo(planDocId, dayIndex, newTripPlaces)
          .then((result) => {
            if (result) {
              const newPlanContent = { ...planContent! };
              newPlanContent.trips[dayIndex].places = newTripPlaces;
              newPlanContent.trips[dayIndex].lastEditTime = getTimeNow();
              setPlanContent!(newPlanContent);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  };

  // Handle Traffic route
  useEffect(() => {
    if (planContent && trafficBoxArray) {
      const routesArr: any[] = [];
      for (let i = 0; i < trafficBoxArray.length; i++) {
        const places = planContent.trips[dayIndex].places;
        const newRoutes =
          routesObject[`${i}-${places[i].placeId}-${places[i + 1].placeId}`];
        if (newRoutes !== undefined) {
          routesArr.push(newRoutes);
        }
      }
      setRoutes(routesArr);
    }
  }, [trafficBoxArray]);

  useEffect(() => {
    setRoutes([]);
    setPlaceMarker(null);
    setShowPlaceInfo(false);
    if (!planContent || !dayIndex) {
      return;
    }
    setLastEditTime(planContent.trips[dayIndex].lastEditTime);
    const trip = planContent.trips[dayIndex];
    if (trip && trip.places.length > 0) {
      setPlaces(trip.places);
      const newDepartArray: Array<string> = [];
      const newPlaceBoxArray: Array<React.JSX.Element> = [];
      const newTrafficBoxArray: Array<React.JSX.Element> = [];
      const newMarkersArray: LatLngExpression[] = [];

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
            key={trip.places[i].id + trip.places[i].placeId}
            number={i}
            trip={trip}
            place={trip.places[i]}
            startTime={newDepartArray[i]}
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
            mode={trip.places[i].trafficMode}
            originId={trip.places[i].placeId}
            destinationId={trip.places[i + 1].placeId}
            handleTrafficTime={handleTrafficTime}
            handleTrafficRoute={handleTrafficRoute}
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
  }, [planContent, dayIndex, trafficTimeObject]);
  return (
    <>
      <div className="h-full overflow-y-auto overflow-x-hidden bg-zinc-100 hover:pr-0">
        <div className="flex w-full">
          <div className="ml-5 mt-2 flex min-w-[120px] items-center justify-center rounded bg-sky-200 px-4 py-1 max-sm:min-w-[110px]">
            <p className="text-lg font-bold text-sky-700 max-sm:text-base">
              {dateCount}
            </p>
          </div>
          <div className="mr-5 flex w-full items-end justify-end">
            <p className="text-sm italic text-gray-400 max-sm:text-xs">
              最後編輯於:
            </p>
            <p className="ml-1 text-sm italic text-gray-400 max-sm:text-xs">
              {lastEditTime}
            </p>
          </div>
        </div>
        <div className="ml-5 py-2">
          <span className="text-gray-500 max-sm:text-sm">出發時間：</span>
          <span
            onClick={() => {
              if (!isEditable) {
                return;
              }
              setShowStartTimeSetting(true);
            }}
            className={`${isEditable && "font-bold underline hover:cursor-pointer"}`}
          >
            {planContent && planContent.trips[dayIndex].startTime}
          </span>
        </div>
        <DocIdContext.Provider value={planDocId!}>
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
                                <span
                                  {...provided.dragHandleProps}
                                  className="absolute bottom-11 right-0 z-[15] h-8 w-8 p-1 hover:cursor-move max-sm:bottom-7 max-sm:left-4"
                                >
                                  {/* Drag Icon */}
                                  <svg
                                    fill="#075985"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      strokeWidth="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      <path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z"></path>
                                    </g>
                                  </svg>
                                </span>
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
            {isEditable && (
              <OpenSearchBtn
                setIsSearching={setIsSearching}
                setShowPlaceInfo={setShowPlaceInfo}
              />
            )}
          </div>
        </DocIdContext.Provider>
      </div>
      <DocIdContext.Provider value={planDocId!}>
        {isSearching && isEditable && (
          <SearchContent
            setIsSearching={setIsSearching}
            destinationList={destinationList}
            setDestinationList={setDestinationList}
          />
        )}
        {mapState.showPlaceInfo && <PlaceInfoCard />}
        {showStartTimeSetting && isEditable && (
          <StartTimeSetting
            planDocId={planDocId!}
            dateCount={dateCount}
            setShowStartTimeSetting={setShowStartTimeSetting}
          />
        )}
      </DocIdContext.Provider>
    </>
  );
};

export default PlanCard;
