import React from "react";
const OpenSearchBtn = ({
  setIsSearching,
  setShowPlaceInfo,
}: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaceInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-center pb-[40px]">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full border border-solid border-slate-500 bg-white p-2 hover:cursor-pointer hover:bg-slate-200"
        onClick={() => {
          setIsSearching(true);
          setShowPlaceInfo(false);
        }}
      >
        <p className="text-2xl text-slate-500">+</p>
      </button>
    </div>
  );
};

export default OpenSearchBtn;
