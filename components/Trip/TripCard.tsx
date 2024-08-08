"use client";
import React, { useState } from "react";
import Link from "next/link";
import TripDate from "./TripDate";
import TripInfoCard from "./TripInfoCard";
import SearchCard from "./Search/SearchCard";
import SearchResult from "./Search/SearchResult";
const TripEdit = () => {
  const [dateCount, setDateCount] = useState<string>("第一天");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isOpenResult, setIsOpenResult] = useState<boolean>(false);
  return (
    <div className="h-full bg-slate-50">
      {isSearching ? (
        <SearchCard setIsSearching={setIsSearching} />
      ) : (
        <>
          <div className="h-56 shadow-lg">
            <div className="flex h-16 w-[500px] items-center bg-black/50 p-3">
              <Link href="/trips">
                <span className="mr-3 w-8 text-xl text-white hover:font-bold">
                  ←
                </span>
              </Link>
              <span className="text-xl text-white">台北一日遊</span>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center bg-slate-500 p-3">
              <div className="w-full">
                <span className="text-white">2024/08/05</span>
                <span className="text-white"> - </span>
                <span className="text-white">2024/08/07</span>
              </div>
              <div className="w-full">
                <p className="text-white">台北市</p>
              </div>
            </div>
            <div className="flex h-16 w-full bg-white">
              <TripDate
                date="8月5日"
                dateCount="第一天"
                setDateCount={setDateCount}
              />
              <TripDate
                date="8月6日"
                dateCount="第二天"
                setDateCount={setDateCount}
              />
              <TripDate
                date="8月7日"
                dateCount="第三天"
                setDateCount={setDateCount}
              />
            </div>
          </div>
          <TripInfoCard dateCount={dateCount} setIsSearching={setIsSearching} />
        </>
      )}
    </div>
  );
};

export default TripEdit;
