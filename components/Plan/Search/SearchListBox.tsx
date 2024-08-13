import React, { useContext } from "react";
import { ShowSearchResultContext } from "@/app/trips/[_id]/page";

type SearchListProps = {
  name: string;
  address: string;
};

const SearchList: React.FC<SearchListProps> = ({
  name,
  address,
}: SearchListProps) => {
  const setIsShowSearchResult: any = useContext(ShowSearchResultContext);

  return (
    <div
      className="mb-4 mt-4 flex rounded border border-solid bg-white shadow-lg hover:cursor-pointer"
      onClick={() => setIsShowSearchResult(true)}
    >
      <div className="m-2 flex">
        <div className="bg-slaborder h-14 w-14 rounded bg-slate-300"></div>
        <div className="ml-2 flex h-full flex-col justify-center">
          <p className="font-bold">{name}</p>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
