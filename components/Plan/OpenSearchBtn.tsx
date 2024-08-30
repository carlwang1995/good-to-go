import React from "react";
const OpenSearchBtn = ({
  setIsSearching,
  setShowPlaceInfo,
}: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center pb-[40px]">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full border border-solid border-slate-500 bg-white p-2 transition hover:cursor-pointer hover:bg-slate-200"
        onClick={() => {
          setIsSearching(true);
          setShowPlaceInfo(false);
        }}
      >
        <p className="text-2xl text-slate-500">+</p>
      </button>
      <div className="text-slate-500">加入景點</div>
    </div>
  );
};

export default OpenSearchBtn;
