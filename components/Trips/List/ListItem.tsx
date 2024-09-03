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
      <div className="rounded-lg bg-white">
        <div className="relative rounded-lg shadow-lg transition hover:shadow-xl">
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
                priority={true}
                src={photoUrl}
                alt="background"
                fill={true}
                sizes="width:'320px'; height:'200px'"
                style={{ objectFit: "cover" }}
                className="absolute left-0 top-0 h-full w-full rounded-lg"
              />
              <div className="relative z-10 bg-white bg-white/80 px-3 py-2 text-xl font-bold">
                {tripName}
              </div>
              <div className="relative z-10 flex rounded-b-lg bg-white/80 px-3 pb-2">
                <div>{startDate}</div>
                <div className="mx-2">~</div>
                <div>{endDate}</div>
              </div>
            </div>
          </Link>
          <div
            onClick={() => setShowSetting(true)}
            className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:cursor-pointer hover:bg-white hover:shadow-lg"
          >
            <Image src="/menu.png" alt="setting icon" width={20} height={20} />
          </div>
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
      </div>
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
