import React, { useState, useEffect } from "react";
import get_googlePhoto from "@/libs/google/getPhoto";
import PlaceInfoPhotoBox from "./PlaceInfoPhotoBox";
import PlaceInfoBottomBox from "./PlaceInfoBottomBox";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import { Loading } from "../Loading";
import Image from "next/image";

type PlaceType = {
  id?: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  openNow?: boolean;
  rating?: number;
  ratingCount?: number;
  photos?: Array<{ name: string; heightPx: number; widthPx: number }>;
  stayTime?: string;
  trafficMode?: string;
};

const PlaceInfoCard = ({
  addDone,
  setAddDone,
  selectedPlace,
  setIsSearching,
  setIsShowSearchResult,
}: {
  addDone: boolean;
  setAddDone: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlace: PlaceType | null;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [photoUriArr, setPhotoUriArr] = useState<Array<string>>([]);

  const { setPlaceLatLng } = useMapMarkers();

  useEffect(() => {
    setPhotoUriArr([]);
    setIsLoading(true);
    if (selectedPlace && selectedPlace.photos) {
      const photosPromise = selectedPlace.photos
        .slice(0, process.env.NODE_ENV === "development" ? 2 : 4)
        .map((photo) => get_googlePhoto(photo.name, 600, 800));

      Promise.all(photosPromise)
        .then((photosArr) => {
          setPhotoUriArr(photosArr);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [selectedPlace]);

  return (
    <div className="absolute left-[500px] top-0 z-20 flex h-full w-[380px] flex-col overflow-y-auto overflow-x-hidden border-l border-slate-300 bg-white">
      <div className="flex min-h-16 items-center justify-end">
        <Image
          src="/close.png"
          alt="close"
          width={24}
          height={24}
          className="m-4 px-1 hover:cursor-pointer"
          onClick={() => {
            setIsShowSearchResult(false);
            setAddDone(false);
            setPlaceLatLng(null);
          }}
        />
      </div>
      {isLoading ? (
        <div className="my-4 flex justify-center">
          <Loading widthPx={80} heightPx={80}></Loading>
        </div>
      ) : (
        <>
          <div className="mb-[150px] h-full overflow-y-auto overflow-x-hidden">
            <PlaceInfoPhotoBox photos={photoUriArr} />
            <p className="mt-4 px-3 text-2xl font-bold">
              {selectedPlace ? selectedPlace.name : null}
            </p>
            <div className="mt-2 flex px-3">
              <p className="mr-1">評價：</p>
              <p className="mr-1">
                {selectedPlace ? selectedPlace.rating : null}/5.0
              </p>
              <p>
                {selectedPlace && "(" + String(selectedPlace.ratingCount) + ")"}
              </p>
            </div>
            <p className="mt-4 px-3 text-lg">
              {selectedPlace ? selectedPlace.address : null}
            </p>
            <div className="mt-4 flex px-3 text-lg font-semibold">
              營業現況：
              {selectedPlace?.openNow ? (
                <p className="text-green-500">營業中</p>
              ) : (
                <p className="text-red-500">休息中</p>
              )}
            </div>
            <div className="felx-col flexr mb-4 mt-2 px-3">
              {selectedPlace?.openTime.map((weekday, index) => (
                <p key={index} className="mt-1">
                  {weekday}
                </p>
              ))}
            </div>
          </div>
          <PlaceInfoBottomBox
            selectedPlace={selectedPlace}
            photoUriArr={photoUriArr}
            addDone={addDone}
            setAddDone={setAddDone}
            setIsSearching={setIsSearching}
            setIsShowSearchResult={setIsShowSearchResult}
          />
        </>
      )}
    </div>
  );
};

export default PlaceInfoCard;
