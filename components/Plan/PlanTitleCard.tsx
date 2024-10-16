import Link from "next/link";
import React from "react";

type TripType = {
  userId: string;
  tripName: string;
  destination: Array<string>;
  dates: Array<string>;
  startDate: string;
  endDate: string;
  photo: { fileName: string; photoUrl: string };
  privacy: boolean;
  createTime: string;
};

const PlanTitleCard = ({
  tripInfo,
  user,
  isEditable,
  setShowEditInput,
}: {
  tripInfo: TripType | undefined;
  user: string | boolean;
  isEditable: boolean;
  setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative z-10 bg-black/30">
      <div className="relative flex h-16 w-full items-center bg-black/60 p-3 max-[980px]:h-12">
        {user && (
          <button className="mr-3 min-w-7">
            <Link href="/trips">
              {/* Arrow Btn */}
              <svg
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={24}
                height={24}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    stroke="#ffffff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 10H2m0 0l7-7m-7 7l7 7"
                  ></path>
                </g>
              </svg>
            </Link>
          </button>
        )}
        <span className="mr-6 text-xl text-white max-sm:overflow-hidden max-sm:text-ellipsis max-sm:text-nowrap max-sm:text-lg">
          {tripInfo && tripInfo.tripName}
        </span>
        {isEditable && (
          // Edit Icon
          <span
            className="absolute right-2 hover:cursor-pointer"
            onClick={() => setShowEditInput(true)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V11C20 10.4477 20.4477 10 21 10C21.5523 10 22 10.4477 22 11V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H7Z"
                  fill="#ffffff"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.2156 2.82088C17.7412 2.29528 18.4541 2 19.1974 2C19.9407 2 20.6535 2.29528 21.1791 2.82088C21.7047 3.34648 22 4.05934 22 4.80265C22 5.54596 21.7047 6.25883 21.1791 6.78443L20.396 7.56757C20.0055 7.9581 19.3723 7.9581 18.9818 7.56757L16.4324 5.01824C16.0419 4.62771 16.0419 3.99455 16.4324 3.60402L17.2156 2.82088ZM15.0182 6.43245C14.6277 6.04192 13.9945 6.04192 13.604 6.43245L9.14269 10.8938C9.01453 11.0219 8.92362 11.1825 8.87966 11.3583L8.02988 14.7575C7.94468 15.0982 8.04453 15.4587 8.29291 15.7071C8.54129 15.9555 8.90178 16.0553 9.24256 15.9701L12.6417 15.1204C12.8175 15.0764 12.9781 14.9855 13.1062 14.8573L17.5676 10.396C17.9581 10.0055 17.9581 9.37231 17.5676 8.98179L15.0182 6.43245Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </span>
        )}
      </div>
      <div className="flex min-h-24 w-full flex-col items-center justify-center p-3 max-[980px]:min-h-16">
        <div className="w-full max-sm:text-sm">
          <span className="text-white">{tripInfo && tripInfo.startDate}</span>
          <span className="text-white"> - </span>
          <span className="text-white">{tripInfo && tripInfo.endDate}</span>
        </div>
        <div className="mt-1 w-full">
          <p className="overflow-hidden text-ellipsis text-nowrap text-white max-sm:text-sm">
            {tripInfo && tripInfo.destination.toString()}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 m-2 text-sm text-gray-300 max-sm:text-xs">
        {isEditable ? "編輯模式" : "檢視模式"}
      </div>
    </div>
  );
};

export default PlanTitleCard;
