import React, { useState, useEffect, useContext } from "react";
import ResultListBox from "./ResultListBox";
import PlaceInfoCard from "./PlaceInfoCard";
import Image from "next/image";
import textSearch from "@/libs/google/textSearch";
import { DestinationContext } from "@/contexts/ContextProvider";

type PlaceInfoType = {
  id: string;
  displayName: { text: string; languageCode: string };
  formattedAddress: string;
  location: { latitude: number; longitude: number };
};

type PlaceType = {
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
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
  const searchPlaces = async (destination: string, input: string) => {
    if (input) {
      let result = await textSearch(destination + " " + input);
      setResults(result.places);
    } else {
      alert("請輸入查詢資料");
    }
  };
  const destinationName = useContext(DestinationContext);

  if (!destinationName) {
    throw new Error("SearchContent.tsx不是DestinationContext的子組件。");
  }

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
            className="h-full w-full rounded-l bg-white p-4"
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
        <div className="relative h-full w-full items-center overflow-y-auto overflow-x-hidden bg-scroll pl-3 pr-3">
          {searchListBoxArr.length > 0 ? (
            <div className="mt-2 text-lg">
              以下是在<span className="font-bold">「{destinationName}」</span>
              搜尋
              {input === "" ? (
                <span>景點後</span>
              ) : (
                <span className="font-bold">「{input}」</span>
              )}
              的結果:
            </div>
          ) : (
            <></>
          )}
          {searchListBoxArr.length > 0 ? (
            searchListBoxArr
          ) : (
            <div className="mt-2 text-lg">
              開始在<span className="font-bold">「{destinationName}」</span>
              探索吧！
            </div>
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
