import React from "react";

type PlaceResultType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
};

const SearchResultCard = ({
  index,
  planDocId,
  selectedPlace,
  setIsShowSearchResult,
}: {
  index: number;
  planDocId: string;
  selectedPlace: PlaceResultType | null;
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-[500px] top-0 z-20 h-full w-[380px] overflow-y-auto overflow-x-hidden bg-white">
      <div className="flex h-16 items-center justify-end">
        <div
          className="mr-2 p-3 hover:cursor-pointer hover:bg-slate-200"
          onClick={() => setIsShowSearchResult(false)}
        >
          關閉視窗
        </div>
      </div>
      <div className="h-72 w-full bg-slate-400"></div>
      <div className="p-3">
        <p className="text-2xl font-bold">
          {selectedPlace ? selectedPlace.name : null}
        </p>
        <p className="mt-4 text-lg">
          {selectedPlace ? selectedPlace.address : null}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button className="mt-4 rounded border-[1px] border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200">
          + 加入行程
        </button>
      </div>
    </div>
  );
};

export default SearchResultCard;
