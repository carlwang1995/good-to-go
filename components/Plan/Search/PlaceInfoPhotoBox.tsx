import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlaceInfoPhotoItem from "./PlaceInfoPhotoItem";

const PlaceInfoPhotoBox = ({
  photos,
}: {
  photos: Array<string> | undefined;
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  useEffect(() => {
    setPhotoIndex(0);
  }, [photos]);
  return (
    <div className="flex h-fit w-full flex-col items-center bg-white shadow-md">
      <div className="relative flex h-[300px] w-full justify-center overflow-hidden">
        {photos && photos.length > 0 ? (
          <Image
            src={photos[photoIndex]}
            alt="place's photo"
            fill={true}
            sizes="(min-width:380px)"
            style={{ objectFit: "cover" }}
            priority={true}
            blurDataURL="/loading.gif"
          />
        ) : (
          <Image
            src="/picture.png"
            alt="place's photo"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
        )}
      </div>
      <div className="flex w-full justify-center p-2">
        {photos &&
          photos.length > 0 &&
          photos.map((url, index) => (
            <PlaceInfoPhotoItem
              key={index}
              number={index}
              photoUrl={url}
              photoIndex={photoIndex}
              setPhotoIndex={setPhotoIndex}
            />
          ))}
      </div>
    </div>
  );
};

export default PlaceInfoPhotoBox;
