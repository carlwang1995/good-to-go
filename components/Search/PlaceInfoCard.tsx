import React, { useState, useContext, useEffect } from "react";
import { DB_updateTripPlan } from "@/libs/db/EditTripPage";
import get_googlePhoto from "@/libs/google/getPhoto";
import PlaceInfoPhotoBox from "./PlaceInfoPhotoBox";
import PlaceInfoBottomBox from "./PlaceInfoBottomBox";
import { MarkerContext } from "@/contexts/ContextProvider";

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
  const [photoUriArr, setPhotoUriArr] = useState<Array<string>>([]);

  const { setPlaceLatLng } = useContext(MarkerContext);
  if (!setPlaceLatLng) {
    throw new Error("Can't access MarkerContext.");
  }

  useEffect(() => {
    setPhotoUriArr([]);
    if (selectedPlace && selectedPlace.photos) {
      for (let i = 0; i < selectedPlace.photos.length; i++) {
        if (process.env.NODE_ENV == "development" && i === 2) {
          break;
        }
        if (process.env.NODE_ENV == "production" && i === 4) {
          break;
        }
        get_googlePhoto(selectedPlace.photos[i].name, 600, 800)
          .then((uri) => {
            setPhotoUriArr((prev) => [...prev, uri]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [selectedPlace]);

  return (
    <div className="absolute left-[500px] top-0 z-20 flex h-full w-[380px] flex-col overflow-y-auto overflow-x-hidden border-l border-slate-300 bg-white">
      <div className="flex h-16 items-center justify-end">
        <div
          className="m-4 px-1 text-xl hover:cursor-pointer hover:font-bold"
          onClick={() => {
            setIsShowSearchResult(false);
            setAddDone(false);
            setPlaceLatLng(null);
          }}
        >
          &#10006;
        </div>
      </div>
      <div className="mb-[150px] h-full overflow-y-auto overflow-x-hidden">
        <PlaceInfoPhotoBox photos={photoUriArr} />
        <p className="mt-4 px-3 text-2xl font-bold">
          {selectedPlace ? selectedPlace.name : null}
        </p>
        <div className="mt-2 flex px-3">
          <p className="mr-1">評價：</p>
          <p className="mr-1">{selectedPlace ? selectedPlace.rating : null}</p>
          <p>
            {selectedPlace
              ? "(" + String(selectedPlace.ratingCount) + ")"
              : null}
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
    </div>
  );
};

export default PlaceInfoCard;
