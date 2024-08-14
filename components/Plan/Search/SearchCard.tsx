import React, { useState, useEffect } from "react";
import SearchListBox from "./SearchListBox";
import SearchResultCard from "./SearchResultCard";
import Image from "next/image";
import textSearch from "@/libs/google/textSearch";

type SearchResultType = {
  id: string;
  displayName: { text: string; languageCode: string };
  formattedAddress: string;
  location: { latitude: number; longitude: number };
};

type PlaceResultType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
};

const SearchCard = ({
  index,
  planDocId,
  setIsSearching,
}: {
  index: number;
  planDocId: string;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<Array<SearchResultType>>([]);
  const [searchListBoxArr, setSearchListBoxArr] =
    useState<Array<React.JSX.Element> | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResultType | null>(
    null,
  );
  const searchPlaces = async (input: string) => {
    if (input) {
      let result = await textSearch(input);
      setResults(result.places);
    } else {
      alert("請輸入查詢資料");
    }
  };

  useEffect(() => {
    const newArr = [];
    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        newArr.push(
          <SearchListBox
            key={i}
            placeId={results[i].id}
            name={results[i].displayName.text}
            address={results[i].formattedAddress}
            location={results[i].location}
            setSelectedPlace={setSelectedPlace}
            setIsShowSearchResult={setIsShowSearchResult}
          />,
        );
      }
    }
    setSearchListBoxArr(newArr);
  }, [results]);
  return (
    <>
      <div className="absolute left-0 top-0 z-10 flex h-full flex-col bg-white">
        <div className="flex max-h-16 min-h-16 w-[500px] items-center bg-black/50 p-3">
          <span
            className="mr-3 w-8 text-xl text-white hover:cursor-pointer hover:font-bold"
            onClick={() => {
              setIsSearching(false);
              setIsShowSearchResult(false);
              setResults([]);
            }}
          >
            ←
          </span>
        </div>
        <div className="flex max-h-16 min-h-16 w-full items-center bg-slate-400 p-3">
          <input
            type="text"
            className="h-full w-full rounded-l bg-white p-4"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="flex h-full items-center justify-center text-nowrap rounded-r border-l bg-white p-2 hover:bg-slate-200"
            onClick={() => searchPlaces(input)}
          >
            <Image
              src="/search.png"
              alt="search"
              width={30}
              height={30}
            ></Image>
          </button>
        </div>
        <div className="relative h-full w-full items-center overflow-y-auto overflow-x-hidden bg-scroll pl-3 pr-3">
          {searchListBoxArr ? searchListBoxArr : <></>}
        </div>
      </div>
      {isShowSearchResult ? (
        <SearchResultCard
          index={index}
          planDocId={planDocId}
          selectedPlace={selectedPlace}
          setIsShowSearchResult={setIsShowSearchResult}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchCard;
