import React from "react";
import { useMapMarkers } from "@/contexts/UseMapMarkers";

type PlaceType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openNow: boolean;
  openTime: Array<string>;
  rating: number;
  ratingCount: number;
  photos: Array<{ name: string; heightPx: number; widthPx: number }>;
};

type ResultListBoxProps = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openNow: boolean;
  openTime: Array<string>;
  rating: number;
  ratingCount: number;
  photos: Array<{ name: string; heightPx: number; widthPx: number }>;
  setAddDone: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPlace: React.Dispatch<React.SetStateAction<PlaceType | null>>;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResultListBox = ({
  placeId,
  name,
  address,
  location,
  openNow,
  openTime,
  rating,
  ratingCount,
  photos,
  setAddDone,
  setSelectedPlace,
  setIsShowSearchResult,
}: ResultListBoxProps) => {
  const { setPlaceLatLng } = useMapMarkers();

  if (!openNow) {
    openNow = true;
  }
  if (!openTime) {
    openTime = ["沒有營業時間資料"];
  }
  return (
    <>
      <div
        className="mb-4 mt-4 flex rounded border border-solid bg-white shadow-md transition hover:cursor-pointer hover:shadow-xl"
        onClick={() => {
          setSelectedPlace({
            placeId,
            name,
            address,
            location,
            openNow,
            openTime,
            rating,
            ratingCount,
            photos,
          });
          setPlaceLatLng({ position: [location.latitude, location.longitude] });
          setIsShowSearchResult(true);
          setAddDone(false);
        }}
      >
        <div className="m-2 flex">
          <div className="ml-2 flex h-full flex-col justify-center">
            <p className="max-w-[380px] overflow-hidden text-ellipsis text-nowrap font-bold">
              {name}
            </p>
            <p className="max-w-[380px] overflow-hidden text-ellipsis text-nowrap">
              {address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultListBox;
