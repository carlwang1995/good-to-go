import React, { useState, useEffect } from "react";
import ResultListBox from "./ResultListBox";
import PlaceInfoCard from "./PlaceInfoCard";
import Image from "next/image";
import textSearch from "@/libs/google/textSearch";
import { useMapMarkers } from "@/contexts/UseMapMarkers";
import { Loading } from "../../Loading";
import DestinationSwitcher from "./DestinationSwitcher";

type OpenHoursType = {
  openNow: boolean;
  period: object[];
  weekdayDescriptions: Array<string>;
};

interface PlaceInfoType {
  id: string;
  displayName: { text: string; languageCode: string };
  formattedAddress: string;
  location: { latitude: number; longitude: number };
  currentOpeningHours: OpenHoursType;
  rating: number;
  userRatingCount: number;
  photos: Array<{ name: string; heightPx: number; widthPx: number }>;
}

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
  destinationList,
  setDestinationList,
}: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  destinationList: string;
  setDestinationList: React.Dispatch<React.SetStateAction<string>>;
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
  const [message, setMessage] = useState("");

  const { setPlaceMarker } = useMapMarkers();

  // 搜尋景點
  const searchPlaces = async (destination: string, input: string) => {
    setIsLoading(true);
    setIsShowSearchResult(false);
    let result;
    try {
      if (destination && input) {
        result = await textSearch(destination + " " + input);
      } else if (!destination && input) {
        result = await textSearch(input);
      } else {
        setMessage("請輸入查詢資料");
      }
    } catch (e) {
      console.error(e);
    }

    if (result.places) {
      setResults(result.places);
      if (!destination) {
        setMessage(`以下是搜尋 「${input}」 的結果`);
      } else {
        setMessage(`以下是在 「${destination}」 搜尋 「${input}」 的結果`);
      }
    } else {
      if (!destination) {
        setMessage(`搜尋不到 「${input}」的相關結果`);
      } else {
        setMessage(`在 「${destination}」 搜尋不到 「${input}」的相關結果`);
      }
    }
    setIsLoading(false);
  };

  // 防抖 debounce
  const debounce = () => {
    let timeout: any;
    return (destination: string, input: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchPlaces(destination, input);
      }, 500);
    };
  };

  const debounceSearch = debounce();

  useEffect(() => {
    const newArr = [];
    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        newArr.push(
          <ResultListBox
            key={results[i].id}
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
      <div className="absolute left-0 top-0 z-[31] flex h-full w-[500px] flex-col bg-zinc-100 max-[980px]:w-full">
        <div className="flex max-h-16 min-h-16 w-full items-center bg-sky-800 p-3 max-[980px]:min-h-12">
          <span
            className="mr-3 min-w-7 hover:cursor-pointer"
            onClick={() => {
              setIsSearching(false);
              setIsShowSearchResult(false);
              setResults([]);
              setPlaceMarker(null);
            }}
          >
            <svg
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width={24}
              height={24}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 10H2m0 0l7-7m-7 7l7 7"
                ></path>
              </g>
            </svg>
          </span>
        </div>
        <div className="flex max-h-16 min-h-16 w-full items-center bg-blue-300 p-3">
          <input
            autoFocus
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                debounceSearch(destinationList, input === "" ? "景點" : input);
              }
            }}
            type="text"
            className="h-full w-full rounded-l bg-white p-4 outline-none"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="搜尋景點"
            value={input}
          />

          <div
            className={`flex h-full items-center justify-center bg-white px-2`}
          >
            {/* Clear Input Btn */}
            <span
              className={`hover:cursor-pointer ${input.length === 0 && "invisible"}`}
              onClick={() => setInput("")}
            >
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width={20}
                height={20}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#000000"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
          {/* Search Btn */}
          <button
            className="flex h-full items-center justify-center text-nowrap rounded-r bg-white p-2 transition hover:bg-blue-100"
            onClick={() => {
              debounceSearch(destinationList, input === "" ? "景點" : input);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div className="relative h-full w-full items-center overflow-y-auto overflow-x-hidden bg-scroll pl-3 pr-3">
          <div className="mt-2 flex w-full flex-wrap items-center text-lg">
            {message ? (
              message
            ) : (
              <DestinationSwitcher
                destinationName={destinationList}
                setDestinationName={setDestinationList}
              />
            )}
          </div>
          {searchListBoxArr.length > 0 && (
            <div className="flex w-full justify-end">
              <p
                onClick={() => {
                  setMessage("");
                  setSearchListBoxArr([]);
                  setIsShowSearchResult(false);
                  setPlaceMarker(null);
                }}
                className="text-base italic text-blue-700 hover:cursor-pointer hover:underline"
              >
                清除搜尋結果
              </p>
            </div>
          )}
          {searchListBoxArr.length > 0 && searchListBoxArr}
          {isLoading && (
            <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/30">
              <Loading widthPx={50} heightPx={50} />
            </div>
          )}
        </div>
      </div>
      {isShowSearchResult && (
        <PlaceInfoCard
          addDone={addDone}
          setAddDone={setAddDone}
          selectedPlace={selectedPlace}
          setIsSearching={setIsSearching}
          setIsShowSearchResult={setIsShowSearchResult}
        />
      )}
    </>
  );
};

export default SearchContent;
