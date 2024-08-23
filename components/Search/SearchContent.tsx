import React, { useState, useEffect, useContext } from "react";
import ResultListBox from "./ResultListBox";
import PlaceInfoCard from "./PlaceInfoCard";
import Image from "next/image";
import textSearch from "@/libs/google/textSearch";
import { DestinationContext, MarkerContext } from "@/contexts/ContextProvider";

type OpenHoursType = {
  openNow: boolean;
  period: object[];
  weekdayDescriptions: Array<string>;
};

type PlaceInfoType = {
  id: string;
  displayName: { text: string; languageCode: string };
  formattedAddress: string;
  location: { latitude: number; longitude: number };
  currentOpeningHours: OpenHoursType;
  rating: number;
  userRatingCount: number;
  photos: Array<{ name: string; heightPx: number; widthPx: number }>;
};

type PlaceType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openNow: boolean;
  openTime: Array<string>;
  rating: number;
  ratingCount: number;
  photos: Array<{ name: string; heightPx: number; widthPx: number }>;
};

const SearchContent = ({
  setIsSearching,
}: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<Array<PlaceInfoType>>([]);
  const [searchListBoxArr, setSearchListBoxArr] = useState<
    Array<React.JSX.Element>
  >([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null);
  const [addDone, setAddDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [destinationName, setDestinationName] = useState("");

  // 搜尋景點
  const searchPlaces = async (destination: string, input: string) => {
    setIsLoading(true);
    if (input) {
      const result = await textSearch(destination + " " + input);
      if (result) {
        setResults(result.places);
      } else {
        throw new Error("Nothing return from textSearch API.");
      }
    } else {
      alert("請輸入查詢資料");
    }
    setIsLoading(false);
  };
  const destinationArr = useContext(DestinationContext);
  const { setPlaceLatLng } = useContext(MarkerContext);

  if (!destinationArr) {
    throw new Error("SearchContent.tsx不是DestinationContext的子組件。");
  }
  useEffect(() => {
    if (destinationArr) {
      setDestinationName(destinationArr[0]);
    }
  }, []);

  useEffect(() => {
    const newArr = [];
    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        newArr.push(
          <ResultListBox
            key={i}
            placeId={results[i].id}
            name={results[i].displayName.text}
            address={results[i].formattedAddress}
            location={results[i].location}
            openNow={results[i].currentOpeningHours?.openNow}
            openTime={results[i].currentOpeningHours?.weekdayDescriptions}
            rating={results[i].rating}
            ratingCount={results[i].userRatingCount}
            photos={results[i].photos}
            setAddDone={setAddDone}
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
              setPlaceLatLng(null);
            }}
          >
            ←
          </span>
        </div>
        <div className="flex max-h-16 min-h-16 w-full items-center bg-slate-400 p-3">
          <input
            autoFocus
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                searchPlaces(destinationName, input === "" ? "景點" : input);
              }
            }}
            type="text"
            className="h-full w-full rounded-l bg-white p-4 outline-none"
            onChange={(e) => {
              setInput(e.target.value);
              setSearchListBoxArr([]);
            }}
            placeholder="搜尋景點"
          />
          <button
            className="flex h-full items-center justify-center text-nowrap rounded-r border-l bg-white p-2 hover:bg-slate-200"
            onClick={() =>
              searchPlaces(destinationName, input === "" ? "景點" : input)
            }
          >
            <Image
              src="/search.png"
              alt="search"
              width={30}
              height={30}
            ></Image>
          </button>
        </div>
        <div className="relative h-full max-w-[500px] items-center overflow-y-auto overflow-x-hidden bg-scroll pl-3 pr-3">
          {searchListBoxArr.length > 0 ? (
            <div className="mt-2 flex w-full flex-wrap items-center text-lg">
              <span>以下是在</span>
              <span className="font-bold">「{destinationName}」</span>
              <span>搜尋</span>
              {input === "" ? (
                <span>景點後</span>
              ) : (
                <span className="font-bold">「{input}」</span>
              )}
              <span>的結果</span>
            </div>
          ) : (
            <></>
          )}
          {searchListBoxArr.length > 0 ? (
            searchListBoxArr
          ) : (
            <div className="mt-2 text-lg">
              在
              {destinationArr.length > 1 ? (
                <select
                  value={destinationName}
                  onChange={(e) => setDestinationName(e.target.value)}
                  className="mx-1 rounded-md border border-solid border-slate-500"
                >
                  {destinationArr.map((location, index) => {
                    return (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <span className="mx-1 font-bold">「{destinationArr[0]}」</span>
              )}
              盡情探索吧！
            </div>
          )}
          {isLoading ? (
            <div className="mt-4 flex w-full justify-center">
              <Image
                src="/loading.gif"
                alt="loading"
                width={50}
                height={50}
              ></Image>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isShowSearchResult ? (
        <PlaceInfoCard
          addDone={addDone}
          setAddDone={setAddDone}
          selectedPlace={selectedPlace}
          setIsShowSearchResult={setIsShowSearchResult}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchContent;
