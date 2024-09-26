import Header from "@/components/Header/Header";
import Image from "next/image";
import { Alkatra } from "next/font/google";
import StartupButton from "@/components/StartupButton";
import TurtorialCard from "@/components/TurtorialCard";

const fontStyle = Alkatra({ weight: "700", subsets: ["latin"] });

Header;
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center pt-[60px]">
        <section className="relative flex h-[calc(100dvh-60px)] w-full flex-col items-center justify-center">
          <Image
            src="/banner/banner-4.jpg"
            alt="banner"
            fill
            priority
            loading="eager"
            className="absolute right-0 top-0 object-cover"
          />
          <div className="z-10 flex w-[1100px] items-center px-4 max-[1100px]:w-full">
            <h2
              className={`${fontStyle.className} text-5xl font-bold text-gray-200 max-sm:text-4xl max-[400px]:text-3xl`}
            >
              Good to GO｜
            </h2>
            <h3 className="text-3xl font-bold text-gray-200 max-sm:text-2xl max-[400px]:text-xl">
              旅遊行程規劃
            </h3>
          </div>
          <div className="z-10 mt-4 flex h-fit w-[1100px] items-center justify-center px-4 max-[1100px]:w-full">
            <StartupButton />
          </div>
        </section>
        <section className="flex w-full items-center justify-center p-4">
          <Image
            src="/clipboard.png"
            alt="clipboard"
            width={32}
            height={32}
            className="mr-1 h-[32px]"
          />
          <h1 className="my-4 text-2xl font-bold text-sky-800">
            為旅遊輕鬆做準備
          </h1>
        </section>
        <TurtorialCard />
      </main>
      <footer className="mt-4 flex h-[80px] w-full items-center justify-center bg-sky-950">
        <p className="font-bold text-white">Copyright © 2024 Good to GO</p>
      </footer>
    </div>
  );
}
