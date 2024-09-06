import Header from "@/components/Header/Header";
import Turtorial from "@/components/Turtorial";
import Image from "next/image";
import { Alkatra, Mochiy_Pop_P_One } from "next/font/google";

const fontStyle = Alkatra({ weight: "700", subsets: ["latin"] });

Header;
export default function Home() {
  return (
    <div className="overflow-x-hidden">
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
          <div className="z-10 flex h-full w-[1100px] items-center px-4 max-[1100px]:w-full">
            <h2
              className={`${fontStyle.className} text-5xl font-bold text-gray-300 max-sm:text-4xl max-[400px]:text-3xl`}
            >
              Good to GO｜
            </h2>
            <h3 className="text-3xl font-bold text-gray-300 max-sm:text-2xl max-[400px]:text-xl">
              旅遊行程規劃
            </h3>
          </div>
        </div>
        <Turtorial />
      </main>
      <footer className="mt-4 flex h-[80px] w-full items-center justify-center bg-sky-950">
        <p className="font-bold text-white">Copyright © 2024 Good to GO</p>
      </footer>
    </div>
  );
}
