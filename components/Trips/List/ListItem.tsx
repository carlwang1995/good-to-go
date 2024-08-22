import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { DeleteContext } from "@/contexts/ContextProvider";
import UploadCard from "./UploadCard";
import { storage } from "@/config/firebase";
import { ref, listAll, deleteObject } from "firebase/storage";

type ListItemProps = {
  index: number;
  docId: string;
  tripName: string;
  startDate: string;
  endDate: string;
  photoName: string;
  photoUrl: string;
};

const ListItem = ({
  index,
  docId,
  tripName,
  startDate,
  endDate,
  photoName,
  photoUrl,
}: ListItemProps) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const context = useContext(DeleteContext);

  if (context === undefined || context === null) {
    throw new Error(
      "ChildComponent must be used within a DeleteContext.Provider",
    );
  }

  const deleteTrip = context;

  const deleteOldPhoto = async (oldPhoto: string) => {
    if (!oldPhoto || oldPhoto == "default") {
      return;
    }
    const desertRef = ref(storage, `images/${oldPhoto}`);
    try {
      await deleteObject(desertRef);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setShowDeleteBtn((pre) => !pre)}
        onMouseLeave={() => setShowDeleteBtn((pre) => !pre)}
        className="m-4 min-w-[30%] rounded-lg bg-white"
      >
        <div className="relative rounded-lg shadow-lg hover:shadow-xl">
          <Link href={`plan/${docId}`}>
            <div className="relative flex min-h-[200px] min-w-[320px] max-w-[320px] flex-col justify-end rounded-lg">
              <Image
                priority
                src={photoUrl}
                alt="background"
                width={300}
                height={300}
                className="absolute left-0 top-0 z-0 h-full w-full rounded-lg"
              ></Image>
              <div className="z-10 bg-white bg-white/80 px-3 py-2 text-xl font-bold">
                {tripName}
              </div>
              <div className="z-10 flex rounded-b-lg bg-white/80 px-3 pb-2">
                <div>{startDate}</div>
                <div className="mx-2">~</div>
                <div>{endDate}</div>
              </div>
            </div>
          </Link>
          {showDeleteBtn ? (
            <>
              <div className="absolute right-0 top-0 rounded rounded-tr-lg bg-slate-100/20 p-1 text-2xl hover:cursor-pointer hover:bg-slate-100/80 hover:font-bold">
                <Image
                  src="/trash-can.png"
                  alt="trash"
                  width={25}
                  height={25}
                  onClick={() => {
                    deleteTrip(docId);
                    deleteOldPhoto(photoName);
                  }}
                ></Image>
              </div>
              <div
                onClick={() => setShowUpload(true)}
                className="absolute right-10 top-0 rounded rounded-tr-lg bg-slate-100/20 p-1 text-2xl hover:cursor-pointer hover:bg-slate-100/80 hover:font-bold"
              >
                <Image
                  src="/upload.png"
                  alt="upload"
                  width={25}
                  height={25}
                ></Image>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {showUpload ? (
        <UploadCard
          docId={docId}
          setShowUpload={setShowUpload}
          oldPhotoName={photoName}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ListItem;
