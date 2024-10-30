import React from "react";
import PlaceInfoPhotoBox from "./PlaceInfoPhotoBox";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import Image from "next/image";

const PlaceInfoCard = () => {
  const { mapState, setPlaceMarker, setShowPlaceInfo } = useMapMarkers();

  return (
    <div
      style={{ boxShadow: "0px 0px 15px gray" }}
      className="absolute bottom-0 left-[500px] z-[31] flex h-full w-[380px] flex-col overflow-hidden bg-white max-[980px]:left-0 max-[980px]:w-full"
    >
      <div className="flex min-h-16 items-center justify-end max-[980px]:hidden">
        {/* Close Btn */}
        <span
          className="m-4 hover:cursor-pointer"
          onClick={() => {
            setShowPlaceInfo(false);
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
      <div className="h-full overflow-y-auto overflow-x-hidden bg-white">
        <div className="absolute right-0 top-0 z-10 hidden min-h-12 w-full items-center justify-start bg-black/50 max-[980px]:flex">
          {/* Close Arrow Btn */}
          <span
            className="ml-3 hover:cursor-pointer"
            onClick={() => {
              setShowPlaceInfo(false);
              setPlaceMarker(null);
            }}
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
