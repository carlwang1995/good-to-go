import Image from "next/image";
import React from "react";

const PlaceInfoPhotoItem = ({
  number,
  photoUrl,
  photoIndex,
  setPhotoIndex,
}: {
  number: number;
  photoUrl: string;
  photoIndex: number;
  setPhotoIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      onClick={() => setPhotoIndex(number)}
      className={`relative mx-1 box-content flex h-[60px] w-[80px] items-center justify-center overflow-hidden border-2 border-solid transition hover:cursor-pointer ${number == photoIndex ? "border-blue-600" : "border-blue-100"}`}
    >
      <Image
        src={photoUrl}
        alt="place's photo"
        fill={true}
        sizes="(min-width:80px)"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default PlaceInfoPhotoItem;
