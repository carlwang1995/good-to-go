import React from "react";

type PlaceType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
};

type ResultListBoxProps = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  setAddDone: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPlace: React.Dispatch<React.SetStateAction<PlaceType | null>>;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResultListBox: React.FC<ResultListBoxProps> = ({
  placeId,
  name,
  address,
  location,
  setAddDone,
  setSelectedPlace,
  setIsShowSearchResult,
}: ResultListBoxProps) => {
  return (
    <>
      <div
        className="mb-4 mt-4 flex rounded border border-solid bg-white shadow-lg hover:cursor-pointer"
        onClick={() => {
          setSelectedPlace({ placeId, name, address, location });
          setIsShowSearchResult(true);
          setAddDone(false);
        }}
      >
        <div className="m-2 flex">
          <div className="bg-slaborder h-14 w-14 rounded bg-slate-300"></div>
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
