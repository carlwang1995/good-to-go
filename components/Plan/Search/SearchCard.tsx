"use client";
import React, { useState, useContext } from "react";
import { ShowSearchResultContext } from "@/app/trips/[_id]/page";
import SearchListBox from "./SearchListBox";

const SearchCard = ({
  setIsSearching,
}: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<string>("");
  const setIsShowSearchResult: any = useContext(ShowSearchResultContext);
  return (
    <>
      <div className="flex h-16 w-[500px] items-center bg-black/50 p-3">
        <span
          className="mr-3 w-8 text-xl text-white hover:cursor-pointer hover:font-bold"
          onClick={() => {
            setIsSearching(false);
            setIsShowSearchResult(false);
          }}
        >
          ←
        </span>
      </div>
      <div className="flex h-16 w-full items-center bg-slate-400 p-3">
        <input
          type="text"
          className="h-full w-full rounded-l bg-white p-4"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="h-full text-nowrap rounded-r border-l bg-white p-2 text-center"
          onClick={() => console.log(input)}
        >
          開始搜尋
        </button>
      </div>
      <div className="h-[calc(100%-128px)] w-full items-center overflow-scroll overflow-x-hidden bg-scroll pl-3 pr-3">
        <SearchListBox
          name="台北小巨蛋"
          address="台北市南京東路111號"
          // setIsOpenResult={setIsOpenResult}
        />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北101" address="台北市信義區101號" />
        <SearchListBox name="台北小巨蛋" address="台北市南京東路111號" />
      </div>
    </>
  );
};

export default SearchCard;
