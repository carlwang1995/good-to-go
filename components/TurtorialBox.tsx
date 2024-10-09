import Image from "next/image";

type TurtorialBoxProps = {
  title: string;
  imageUrl: string;
  msg: string;
};

const TurtorialBox = ({ title, imageUrl, msg }: TurtorialBoxProps) => {
  return (
    <section>
      <div className="flex items-center">
        <h2 className="mr-4 text-nowrap text-3xl font-bold italic text-sky-800">
          {title}
        </h2>
        <hr className="mt-2 w-full border border-sky-800" />
      </div>
      <div className="flex w-full max-sm:flex-col max-sm:items-center">
        <div className="relative mx-2 my-4 h-[300px] min-w-[420px] shadow-lg max-[430px]:h-[240px] max-[430px]:min-w-[336px]">
          <Image
            loading="lazy"
            unoptimized={true}
            src={`${imageUrl}`}
            alt="create-trip"
            fill
            className="object-cover"
            sizes="height:300px"
          />
        </div>
        <div className="mx-2 my-4 flex h-[300px] w-1/2 flex-col justify-center max-[900px]:w-full max-sm:h-full">
          <p className="m-2 mb-6 text-xl text-sky-700">{msg}</p>
        </div>
      </div>
    </section>
  );
};

export default TurtorialBox;
