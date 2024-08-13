"use client";
import React, { useState, createContext } from "react";
import Map from "@/components/Plan/Map";
import SearchResultCard from "@/components/Plan/Search/SearchResultCard";
import TripContent from "@/components/Plan/TripContent";
import { ShowSearchResultContext } from "@/contexts/ShowSearchResultContext";

const Plan = ({ params }: { params: { _id: string } }) => {
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  return (
    <main className="absolute top-[60px] flex h-[calc(100%-60px)] w-full">
      <ShowSearchResultContext.Provider value={setIsShowSearchResult}>
        <TripContent docId={params._id} />
      </ShowSearchResultContext.Provider>
      {isShowSearchResult ? (
        <SearchResultCard setIsShowSearchResult={setIsShowSearchResult} />
      ) : null}
      <div className="z-0 h-full w-full">
        <Map />
      </div>
    </main>
  );
};

export default Plan;
