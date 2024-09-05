import React from "react";
import PlaceInfoPhotoBox from "./PlaceInfoPhotoBox";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import Image from "next/image";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: Array<string>;
}

const PlaceInfoCard = ({
  placeInfo,
  setShowPlaceInfo,
}: {
  placeInfo: PlaceType | undefined;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setPlaceLatLng } = useMapMarkers();

  return (
    <div className="fixed bottom-0 left-[500px] z-20 flex h-[calc(100%-60px)] w-[380px] flex-col overflow-hidden bg-white">
      <div className="flex min-h-16 items-center justify-end">
        <Image
          src="/close.png"
          alt="close"
          width={24}
          height={24}
          className="m-4 px-1 hover:cursor-pointer"
          onClick={() => {
            setShowPlaceInfo(false);
            setPlaceLatLng(null);
          }}
        />
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden bg-zinc-100">
        <PlaceInfoPhotoBox photos={placeInfo?.photos} />
        <div className="p-3">
          <p className="text-2xl font-bold text-sky-800">
            {placeInfo ? placeInfo.name : null}
          </p>
          <p className="mt-4 text-lg">{placeInfo ? placeInfo.address : null}</p>
        </div>
        <div className="mt-4 flex px-3 text-lg font-semibold">營業時間：</div>
        <div className="felx-col flexr mb-4 mt-2 px-3">
          {placeInfo?.openTime.map((weekday, index) => (
            <p key={index} className="mt-1">
              {weekday}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoCard;
