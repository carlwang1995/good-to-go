import React, { useEffect, useState, useContext } from "react";
import get_directions from "@/libs/google/directions";
import { convertTimeString } from "@/libs/timeConvertor";
import TrafficModeSetting from "./TrafficModeSetting";
import { EditableContext } from "@/contexts/ContextProvider";
import { directionsData } from "@/constants";

interface PlaceType {
  id: number;
  placeId: string;
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  openTime: Array<string>;
  stayTime: string;
  trafficMode: string;
  photos: Array<string>;
}

interface TripType {
  startTime: string;
  places: Array<PlaceType>;
  lastEditTime: string;
}

type TrafficBoxProps = {
  number: number;
  trip: TripType;
  originId: string;
  destinationId: string;
  mode: string;
  handleTrafficTime: (
    number: string,
    originId: string,
    destinationId: string,
    duration: string,
  ) => void;
  handleTrafficRoute: (
    number: string,
    originId: string,
    destinationId: string,
    routeArr: Array<[]>,
  ) => void;
};

const TrafficBox = ({
  number,
  trip,
  originId,
  destinationId,
  mode,
  handleTrafficTime,
  handleTrafficRoute,
}: TrafficBoxProps) => {
  const [durationText, setDurationText] = useState<string>("--分鐘");
  const [distance, setDistance] = useState<string>("--公里");
  const [isShowModeSetting, setIsShowModeSetting] = useState<boolean>(false);
  const isEditable = useContext(EditableContext);
  if (isEditable === undefined) {
    throw new Error("Can't access MarkerContext.");
  }
  const blueCar = (
    <svg
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
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
        <title>car_fill</title>{" "}
        <g
          id="页面-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Transport" transform="translate(-288.000000, -48.000000)">
            <g id="car_fill" transform="translate(288.000000, 48.000000)">
              <path
                d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                id="MingCute"
                fillRule="nonzero"
              ></path>
              <path
                d="M5.55279,5.65836 C6.06096,4.64201 7.09975,4 8.23607,4 L15.7639,4 C16.9002,4 17.939,4.64201 18.4472,5.65836 L19.8326,8.4292 C20.0766,8.32868 20.3173,8.22126 20.5532,8.10535 C21.0471,7.85867 21.6475,8.05891 21.8944,8.55276 C22.1414,9.04674 21.9412,9.64741 21.4472,9.8944 C21.2061,10.0018 20.9645,10.1063 20.7217,10.2073 L21.6833,12.1305 C21.8916,12.5471 22,13.0064 22,13.4721 L22,16 C22,16.8885 21.6137,17.6868 21,18.2361 L21,19.5 C21,20.3284 20.3284,21 19.5,21 C18.6716,21 18,20.3284 18,19.5 L18,19 L6,19 L6,19.5 C6,20.3284 5.32843,21 4.5,21 C3.67157,21 3,20.3284 3,19.5 L3,18.2361 C2.38625,17.6868 2,16.8885 2,16 L2,13.4721 C2,13.0064 2.10844,12.5471 2.31672,12.1305 L3.27037,10.2232 C3.02889,10.1209 2.79023,10.0122 2.55528,9.89564 C2.06661,9.65198 1.86107,9.04179 2.10558,8.55276 C2.3525,8.05891 2.95292,7.85866 3.44683,8.10535 C3.68313,8.22152 3.92369,8.32893 4.1673,8.42934 L5.55279,5.65836 Z M9,14.5 C9,15.3284 8.32843,16 7.5,16 C6.67157,16 6,15.3284 6,14.5 C6,13.6716 6.67157,13 7.5,13 C8.32843,13 9,13.6716 9,14.5 Z M16.5,16 C17.3284,16 18,15.3284 18,14.5 C18,13.6716 17.3284,13 16.5,13 C15.6716,13 15,13.6716 15,14.5 C15,15.3284 15.6716,16 16.5,16 Z M7.34166,6.55279 C7.51105,6.214 7.85731,6 8.23608,6 L15.7639,6 C16.1427,6 16.489,6.214 16.6584,6.55279 L17.9274,9.09084 C16.3801,9.55496 14.295,9.99998 12,9.99998 C9.70508,9.99998 7.61997,9.55495 6.07263,9.09084 L7.34166,6.55279 Z"
                id="形状"
                fill="#3b82f6"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
  const blueBus = (
    <svg
      fill="#3b82f6"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#3b82f6"
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
        <path d="M488 128h-8V80c0-44.8-99.2-80-224-80S32 35.2 32 80v48h-8c-13.25 0-24 10.74-24 24v80c0 13.25 10.75 24 24 24h8v160c0 17.67 14.33 32 32 32v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h192v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h6.4c16 0 25.6-12.8 25.6-25.6V256h8c13.25 0 24-10.75 24-24v-80c0-13.26-10.75-24-24-24zM112 400c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm16-112c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h256c17.67 0 32 14.33 32 32v128c0 17.67-14.33 32-32 32H128zm272 112c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
      </g>
    </svg>
  );
  const blueWalk = (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="#3b82f6"
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
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7.617 8.712l3.205-2.328A1.995 1.995 0 0 1 12.065 6a2.616 2.616 0 0 1 2.427 1.82c.186.583.356.977.51 1.182A4.992 4.992 0 0 0 19 11v2a6.986 6.986 0 0 1-5.402-2.547l-.697 3.955 2.061 1.73 2.223 6.108-1.88.684-2.04-5.604-3.39-2.845a2 2 0 0 1-.713-1.904l.509-2.885-.677.492-2.127 2.928-1.618-1.176L7.6 8.7l.017.012zM13.5 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-2.972 13.181l-3.214 3.83-1.532-1.285 2.976-3.546.746-2.18 1.791 1.5-.767 1.681z"></path>{" "}
        </g>
      </g>
    </svg>
  );
  const blueBike = (
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
          d="M11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18H11ZM12 13H13C13 12.7348 12.8946 12.4804 12.7071 12.2929L12 13ZM8.5 9.5L7.8415 8.74742C7.6332 8.92968 7.50976 9.19011 7.50055 9.46672C7.49134 9.74334 7.59719 10.0114 7.79289 10.2071L8.5 9.5ZM12.5 6L13.2593 5.34921C13.0855 5.1465 12.8379 5.02169 12.5716 5.00257C12.3053 4.98345 12.0424 5.07161 11.8415 5.24742L12.5 6ZM18.5 11C19.0523 11 19.5 10.5523 19.5 10C19.5 9.44772 19.0523 9 18.5 9V11ZM8 17C8 18.6569 6.65685 20 5 20V22C7.76142 22 10 19.7614 10 17H8ZM5 20C3.34315 20 2 18.6569 2 17H0C0 19.7614 2.23858 22 5 22V20ZM2 17C2 15.3431 3.34315 14 5 14V12C2.23858 12 0 14.2386 0 17H2ZM5 14C6.65685 14 8 15.3431 8 17H10C10 14.2386 7.76142 12 5 12V14ZM13 18V13H11V18H13ZM12.7071 12.2929L9.20711 8.79289L7.79289 10.2071L11.2929 13.7071L12.7071 12.2929ZM9.1585 10.2526L13.1585 6.75258L11.8415 5.24742L7.8415 8.74742L9.1585 10.2526ZM11.7407 6.65079C12.2544 7.25009 13.2032 8.3069 14.3529 9.22044C15.4669 10.1056 16.9452 11 18.5 11V9C17.6548 9 16.6331 8.47777 15.5971 7.65456C14.5968 6.85976 13.7456 5.91657 13.2593 5.34921L11.7407 6.65079ZM22 17C22 18.6569 20.6569 20 19 20V22C21.7614 22 24 19.7614 24 17H22ZM19 20C17.3431 20 16 18.6569 16 17H14C14 19.7614 16.2386 22 19 22V20ZM16 17C16 15.3431 17.3431 14 19 14V12C16.2386 12 14 14.2386 14 17H16ZM19 14C20.6569 14 22 15.3431 22 17H24C24 14.2386 21.7614 12 19 12V14ZM16 3V5C17.1046 5 18 4.10457 18 3H16ZM16 3H14C14 4.10457 14.8954 5 16 5V3ZM16 3V1C14.8954 1 14 1.89543 14 3H16ZM16 3H18C18 1.89543 17.1046 1 16 1V3Z"
          fill="#3b82f6"
        ></path>
      </g>
    </svg>
  );
  // 真實資料
  // development
  // production
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && mode) {
      get_directions(originId, destinationId, mode)
        .then((direction) => {
          if (direction) {
            const { distance, duration, steps } = direction;
            const formattedTime = convertTimeString(duration.text);
            const routeArr = steps.map((step: any) => [
              [step.start_location.lat, step.start_location.lng],
              [step.end_location.lat, step.end_location.lng],
            ]);
            handleTrafficTime(
              String(number),
              originId,
              destinationId,
              formattedTime,
            );
            handleTrafficRoute(
              String(number),
              originId,
              destinationId,
              routeArr,
            );
            setDistance(distance.text);
            setDurationText(duration.text);
          } else {
            console.error("所在地無此交通方式!");
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [mode, destinationId, originId]);

  // 假的資料
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const { distance, duration } = directionsData;
      setDistance(distance.text);
      setDurationText(duration.text);
      const formattedTime = convertTimeString(duration.text);
      handleTrafficTime(String(number), originId, destinationId, formattedTime);
    }
  }, [mode, destinationId, originId]);

  return (
    <>
      <button
        onClick={() => {
          setIsShowModeSetting(true);
        }}
        className={`mt-[120px] flex h-[40px] w-full items-center justify-between transition ${isEditable && "hover:cursor-pointer hover:bg-blue-100"} max-sm:mt-[85px]`}
      >
        <div className="flex h-full items-center">
          <div className="ml-14 h-full border-l-2 border-dotted border-blue-400"></div>
          <div className="ml-[40px] pl-2 pr-2">
            {mode === "driving"
              ? blueCar
              : mode === "transit"
                ? blueBus
                : mode === "walking"
                  ? blueWalk
                  : blueBike}
          </div>
          <div className="pl-2 pr-2 text-blue-600 max-sm:text-sm">
            {distance},
          </div>
          <div className="pl-2 pr-2 text-blue-600 max-sm:text-sm">
            約 {durationText}
          </div>
        </div>
        {isEditable && <div className="mr-5 text-blue-500">&#10095;</div>}
      </button>
      {isShowModeSetting && isEditable && (
        <TrafficModeSetting
          number={number}
          trip={trip}
          currentMode={mode}
          setIsShowing={setIsShowModeSetting}
        />
      )}
    </>
  );
};

export default TrafficBox;
