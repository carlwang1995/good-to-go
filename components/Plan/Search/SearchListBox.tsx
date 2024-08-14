import React, { useContext } from "react";
import SearchResultCard from "./SearchResultCard";

type PlaceResultType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
};

type SearchListBoxProps = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  setSelectedPlace: React.Dispatch<
    React.SetStateAction<PlaceResultType | null>
  >;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchListBox: React.FC<SearchListBoxProps> = ({
  placeId,
  name,
  address,
  location,
  setSelectedPlace,
  setIsShowSearchResult,
}: SearchListBoxProps) => {
  return (
    <>
      <div
        className="mb-4 mt-4 flex rounded border border-solid bg-white shadow-lg hover:cursor-pointer"
        onClick={() => {
          setSelectedPlace({ placeId, name, address, location });
          setIsShowSearchResult(true);
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

export default SearchListBox;
