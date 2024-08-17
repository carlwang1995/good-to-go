import Header from "@/components/Header/Header";

Header;
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex h-screen w-screen items-center justify-center pt-[60px]">
        <div className="my-10 w-[1100px] p-4 text-4xl font-bold">
          <h2>歡迎光臨，這裡是首頁</h2>
        </div>
      </main>
    </>
  );
}
