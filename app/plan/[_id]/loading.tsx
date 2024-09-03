import LoadingUI from "@/components/Loading";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingUI widthPx={80} heightPx={80} />
    </div>
  );
};

export default Loading;
