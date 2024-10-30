import React, { useState, useEffect } from "react";
import get_googlePhoto from "@/libs/google/getPhoto";
import PlaceInfoPhotoBox from "./PlaceInfoPhotoBox";
import PlaceInfoBottomBox from "./PlaceInfoBottomBox";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import { Loading } from "../../Loading";
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

  const { setPlaceMarker } = useMapMarkers();

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
    <div
      style={{ boxShadow: "0px 0px 15px gray" }}
      className="absolute left-[500px] top-0 z-[32] flex h-full w-[380px] flex-col overflow-y-auto overflow-x-hidden bg-white max-[980px]:left-0 max-[980px]:w-full"
    >
      <div className="flex min-h-16 items-center justify-end max-[980px]:hidden">
        {/* Close Btn */}
        <span
          className="m-4 hover:cursor-pointer"
          onClick={() => {
            setIsShowSearchResult(false);
            setAddDone(false);
            setPlaceMarker(null);
          }}
        >
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width={24}
            height={24}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
              ></path>
            </g>
          </svg>
        </span>
      </div>
      {isLoading ? (
        <div className="my-4 flex justify-center">
          <Loading widthPx={50} heightPx={50}></Loading>
        </div>
      ) : (
        <>
          <div className="mb-[130px] h-full overflow-y-auto overflow-x-hidden bg-white">
            <div className="absolute right-0 top-0 z-10 hidden min-h-12 w-full items-center justify-start bg-black/50 max-[980px]:flex">
              <span
                onClick={() => {
                  setIsShowSearchResult(false);
                  setAddDone(false);
                  setPlaceMarker(null);
                }}
                className="ml-3 hover:cursor-pointer"
              >
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width={24}
                  height={24}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 10H2m0 0l7-7m-7 7l7 7"
                    ></path>
                  </g>
                </svg>
              </span>
              <p className="ml-4 text-lg text-white">
                {selectedPlace && selectedPlace.name}
              </p>
            </div>
            <PlaceInfoPhotoBox
              photos={photoUriArr}
              key={selectedPlace?.placeId}
            />
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
