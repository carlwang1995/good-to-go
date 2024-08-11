import React from "react";

const SearchResult = ({
  setIsShowSearchResult,
}: {
  setIsShowSearchResult: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-[500px] z-20 h-[calc(100%-50px)] w-[380px] bg-white">
      <div className="flex h-16 items-center justify-end">
        <div
          className="mr-2 p-3 hover:cursor-pointer hover:bg-slate-200"
          onClick={() => setIsShowSearchResult(false)}
        >
          關閉視窗
        </div>
      </div>
      <div className="h-72 w-full bg-slate-400"></div>
      <div className="p-3">
        <p className="text-2xl font-bold">台北小巨蛋</p>
        <p className="text-lg">台北市南京東路111號</p>
      </div>
      <div className="flex items-center justify-center">
        <button className="rounded border-[1px] border-solid border-black p-2 text-xl hover:cursor-pointer hover:bg-slate-200">
          + 加入行程
        </button>
      </div>
    </div>
  );
};

export default SearchResult;
