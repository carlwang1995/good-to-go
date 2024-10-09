import React from "react";
import PlaceInfoPhotoBox from "./PlaceInfoPhotoBox";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import Image from "next/image";

const PlaceInfoCard = () => {
  const { mapState, setPlaceMarker, setShowPlaceInfo } = useMapMarkers();

  return (
    <div className="absolute bottom-0 left-[500px] z-[31] flex h-full w-[380px] flex-col overflow-hidden bg-white max-[980px]:left-0 max-[980px]:w-full">
      <div className="flex min-h-16 items-center justify-end max-[980px]:hidden">
        <Image
          src="/close.png"
          alt="close"
          width={24}
          height={24}
          className="m-4 px-1 hover:cursor-pointer"
          onClick={() => {
            setShowPlaceInfo(false);
            setPlaceMarker(null);
          }}
        />
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden bg-zinc-100">
        <div className="absolute right-0 top-0 z-10 hidden min-h-12 w-full items-center justify-start bg-black/50 max-[980px]:flex">
          <Image
            src="/left-arrow-white.png"
            alt="close"
            width={24}
            height={24}
            className="ml-3 hover:cursor-pointer"
            onClick={() => {
              setShowPlaceInfo(false);
              setPlaceMarker(null);
            }}
          />
          <p className="ml-4 text-lg text-white">
            {mapState.placeInfo && mapState.placeInfo.name}
          </p>
        </div>
        <PlaceInfoPhotoBox
          key={mapState.placeInfo?.id}
          photos={mapState.placeInfo?.photos}
        />
        <div className="p-3">
          <p className="text-2xl font-bold text-sky-800">
            {mapState.placeInfo && mapState.placeInfo.name}
          </p>
          <p className="mt-2 text-lg">
            {mapState.placeInfo && mapState.placeInfo.address}
          </p>
        </div>
        <div className="mt-4 flex items-center px-3">
          <Image src="/clock.png" alt="clcok" width={24} height={24} />
          <div className="ml-2 text-lg font-bold text-sky-800">營業時間</div>
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
            {mapState.placeInfo?.openTime.map((weekday, index) => (
              <p key={index} className="mt-2">
                {weekday}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceInfoCard;
