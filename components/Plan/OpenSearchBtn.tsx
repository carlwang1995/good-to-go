import React from "react";
const OpenSearchBtn = ({
  setIsSearching,
  setShowPlaceInfo,
}: {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPlaceInfo: (showPlaceInfo: boolean) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center pb-[40px]">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-700 bg-white p-2 transition hover:cursor-pointer hover:bg-blue-100"
        onClick={() => {
          setIsSearching(true);
          setShowPlaceInfo(false);
        }}
      >
        <p className="text-2xl text-blue-700">+</p>
      </button>
      <div className="text-blue-700">加入景點</div>
    </div>
  );
};

export default OpenSearchBtn;
