import Header from "@/components/Header/Header";
import Image from "next/image";

Header;
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center pt-[60px]">
        <div className="relative flex h-[calc(100dvh-60px)] w-full justify-center">
          <Image
            src="/banner/banner-4.jpg"
            alt="banner"
            fill
            priority
            className="absolute right-0 top-0 object-cover"
          />
          <div className="z-10 flex h-full w-[1100px] items-center px-4">
            <h2 className="text-4xl font-bold text-gray-300">
              Good to GO｜旅遊行程規劃
            </h2>
          </div>
        </div>
        <div className="flex w-full justify-center p-4">
          <h1 className="my-4 text-2xl font-bold text-sky-800">
            為旅遊輕鬆做準備
          </h1>
        </div>
      </main>
    </>
  );
}
