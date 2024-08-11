"use client";
import React, { useState, createContext } from "react";
import Map from "@/components/Plan/Map";
import SearchResult from "@/components/Plan/Search/SearchResult";
import TripContent from "@/components/Plan/TripContent";

type ContextContent = {
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ShowSearchResultContext = createContext<React.Dispatch<
  React.SetStateAction<boolean>
> | null>(null);

const Plan = ({ params }: { params: { _id: string } }) => {
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <ShowSearchResultContext.Provider value={setIsShowSearchResult}>
        <TripContent docId={params._id} />
      </ShowSearchResultContext.Provider>
      {isShowSearchResult ? (
        <SearchResult setIsShowSearchResult={setIsShowSearchResult} />
      ) : null}
      <div className="z-0 h-full w-full">
        <Map />
      </div>
    </main>
  );
};

export default Plan;
