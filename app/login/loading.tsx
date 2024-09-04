import { PageLoading } from "@/components/Loading";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <PageLoading widthPx={128} heightPx={128} />
    </div>
  );
};

export default Loading;
