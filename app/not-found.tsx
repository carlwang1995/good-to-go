import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex h-dvh w-dvw flex-col items-center justify-center">
      <Image src="/lost.png" alt="mountains" width={180} height={180} />
      <h1 className="mt-4 text-4xl font-bold text-sky-800">
        404 page not found
      </h1>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-sky-600 px-4 py-2 text-2xl text-white shadow-lg hover:bg-sky-700"
      >
        HOME
      </Link>
    </main>
  );
};

export default NotFound;
