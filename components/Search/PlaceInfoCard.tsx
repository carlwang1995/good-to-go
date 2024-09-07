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
    <div className="absolute left-[500px] top-0 z-[32] flex h-full w-[380px] flex-col overflow-y-auto overflow-x-hidden border border-slate-300 bg-white max-[980px]:left-0 max-[980px]:w-full">
      <div className="flex min-h-16 items-center justify-end max-[980px]:hidden">
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
          <Loading widthPx={50} heightPx={50}></Loading>
        </div>
      ) : (
        <>
          <div className="mb-[130px] h-full overflow-y-auto overflow-x-hidden bg-zinc-100">
            <div className="absolute right-0 top-0 z-10 hidden min-h-12 w-full items-center justify-start bg-black/50 max-[980px]:flex">
              <Image
                src="/left-arrow-white.png"
                alt="close"
                width={24}
                height={24}
                className="ml-3 hover:cursor-pointer"
                onClick={() => {
                  setIsShowSearchResult(false);
                  setAddDone(false);
                  setPlaceLatLng(null);
                }}
              />
              <p className="ml-4 text-lg text-white">
                {selectedPlace && selectedPlace.name}
              </p>
            </div>
            <PlaceInfoPhotoBox photos={photoUriArr} />
            <p className="mt-4 px-3 text-2xl font-bold text-sky-800">
              {selectedPlace && selectedPlace.name}
            </p>
            <p className="mt-2 px-3 text-lg">
              {selectedPlace && selectedPlace.address}
            </p>
            <div className="mt-4 flex items-center px-3">
              <Image src="/star.png" alt="star" width={24} height={24} />
              <p className="ml-2 mr-1">評價：</p>
              <p className="mr-1">
                {selectedPlace && selectedPlace.rating}/5.0
              </p>
              <p>
                {selectedPlace && "(" + String(selectedPlace.ratingCount) + ")"}
              </p>
            </div>
            <div className="mt-4 flex items-center px-3">
              <Image
                src={`/${selectedPlace?.openNow ? "open" : "closed"}.png`}
                alt="open or closed"
                width={24}
                height={24}
              />
              <div className="ml-2 flex">
                <p className="">營業狀況：</p>
                {selectedPlace?.openNow ? (
                  <p className="text-green-500">營業中</p>
                ) : (
                  <p className="text-red-500">休息中</p>
                )}
              </div>
            </div>
            <div className="mb-4 mt-2 flex px-3">
              <Image
                src="/week.png"
                alt="week"
                width={24}
                height={24}
                className="mt-2 h-[24px]"
              />
              <div className="mb-4 ml-2 flex flex-col">
                {selectedPlace?.openTime.map((weekday, index) => (
                  <p key={index} className="mt-2">
                    {weekday}
                  </p>
                ))}
              </div>
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
