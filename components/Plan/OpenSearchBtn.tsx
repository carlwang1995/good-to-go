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
        style={{ boxShadow: "0px 0px 10px gray" }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 transition duration-200 hover:cursor-pointer"
        onClick={() => {
          setIsSearching(true);
          setShowPlaceInfo(false);
        }}
      >
        <p className="text-2xl text-blue-800">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 12H20M12 4V20"
                stroke="#006eff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </p>
      </button>
      <div
        onClick={() => {
          setIsSearching(true);
          setShowPlaceInfo(false);
        }}
        className="pt-2 text-base text-blue-400 transition-all hover:cursor-pointer hover:font-bold"
      >
        加入景點
      </div>
    </div>
  );
};

export default OpenSearchBtn;
