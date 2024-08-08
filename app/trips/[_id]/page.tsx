"use client";
import React, { useState, createContext } from "react";
import Map from "@/components/Map";
import SearchResult from "@/components/Trip/Search/SearchResult";
import TripCard from "@/components/Trip/TripCard";

const Plan = ({ params }: any) => {
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  return (
    <main className="flex h-dvh w-screen pt-[60px]">
      <ShowSearchResultContext.Provider value={setIsShowSearchResult}>
        <TripCard />
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

export const ShowSearchResultContext = createContext<boolean>(false);

export default Plan;
