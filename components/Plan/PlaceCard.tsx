import React from "react";
import { currentOpeningHours } from "@/libs/fakeData";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  stayTime: string;
}

const PlaceCard = ({
  place,
  setShowPlaceInfo,
}: {
  place: PlaceType | undefined;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed bottom-0 left-[500px] z-20 flex h-[calc(100%-60px)] w-[380px] flex-col overflow-hidden bg-white">
      <div className="flex h-16 items-center justify-end">
        <div
          className="m-4 px-1 text-xl hover:cursor-pointer hover:bg-slate-200"
          onClick={() => setShowPlaceInfo(false)}
        >
          &#10006;
        </div>
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden">
        <div className="h-72 w-full bg-slate-400"></div>
        <div className="p-3">
          <p className="text-2xl font-bold">{place ? place.name : null}</p>
          <p className="mt-4 text-lg">{place ? place.address : null}</p>
        </div>
        <>
          <div className="mt-4 flex justify-center px-3">
            <hr className="w-full border-slate-300" />
          </div>
          <div className="mt-4 flex px-3 text-lg">營業時間：</div>
          <div className="felx-col flexr my-4 px-3">
            {currentOpeningHours.weekdayDescriptions.map((weekday, index) => (
              <p key={index} className="mt-1">
                {weekday}
              </p>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default PlaceCard;
