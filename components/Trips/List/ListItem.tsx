import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ListSetting from "./ListSetting";
import UploadCard from "./UploadCard";
import PrivacySettingCard from "./PrivacySettingCard";

type ListItemProps = {
  docId: string;
  tripName: string;
  dates: string[];
  startDate: string;
  endDate: string;
  photoName: string;
  photoUrl: string;
  privacy: boolean;
  destination: Array<string>;
};

const ListItem = ({
  docId,
  tripName,
  dates,
  startDate,
  endDate,
  photoName,
  photoUrl,
  privacy,
  destination,
}: ListItemProps) => {
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [showPravicy, setShowPravicy] = useState<boolean>(false);

  return (
    <>
      <li className="rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
        <div className="relative rounded-lg">
          <Link href={`plan/${docId}`}>
            <div className="relative z-10 flex min-h-[220px] w-full flex-col justify-end rounded-lg">
              <div className={`absolute left-0 top-0 z-10 rounded-tl-lg`}>
                <div
                  className={`m-2 w-12 rounded-lg ${privacy ? "bg-green-900/70" : "bg-gray-800/70"} ${privacy ? "text-green-500" : "text-gray-400"} text-center`}
                >
                  {privacy ? "公開" : "私人"}
                </div>
              </div>
              <Image
                src={photoUrl}
                alt="background"
                fill={true}
                sizes="width:'320px'; height:'200px'"
                style={{ objectFit: "cover" }}
                className="absolute left-0 top-0 h-full w-full rounded-lg"
              />
              <div className="relative bg-white bg-white/90 px-3 py-2 text-xl font-bold text-sky-800">
                {tripName}
              </div>
              <div className="relative flex rounded-b-lg bg-white/90 px-3 pb-2">
                <div>{startDate}</div>
                <div className="mx-2">-</div>
                <div>{endDate}</div>
              </div>
            </div>
            <div className="absolute right-0 top-0 z-10 h-full w-full rounded-lg transition hover:bg-white/30"></div>
          </Link>

          <button
            onClick={() => setShowSetting(true)}
            className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:cursor-pointer hover:bg-white hover:shadow-lg"
          >
            {/* Setting Icon */}
            <svg
              fill="#000000"
              viewBox="0 0 32 32"
              enable-background="new 0 0 32 32"
              id="Glyph"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
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
                  d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
                  id="XMLID_294_"
                ></path>
                <path
                  d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
                  id="XMLID_295_"
                ></path>
                <path
                  d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
                  id="XMLID_297_"
                ></path>
              </g>
            </svg>
          </button>
          {showSetting && (
            <ListSetting
              docId={docId}
              photoName={photoName}
              setShowSetting={setShowSetting}
              setShowUpload={setShowUpload}
              setShowPravicy={setShowPravicy}
            />
          )}
        </div>
      </li>
      {showUpload && (
        <UploadCard
          docId={docId}
          oldPhotoName={photoName}
          setShowUpload={setShowUpload}
        />
      )}
      {showPravicy && (
        <PrivacySettingCard
          setShowPravicy={setShowPravicy}
          docId={docId}
          currentPrivacy={privacy}
        />
      )}
    </>
  );
};

export default ListItem;
