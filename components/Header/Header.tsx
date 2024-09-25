import React from "react";
import HeaderContent from "./HeaderContent";

const Header = () => {
  return (
    <nav className="fixed z-50 flex h-[60px] w-screen justify-center bg-white shadow-lg">
      <div className="relative mx-4 flex h-full w-[1100px] max-[1100px]:w-full max-sm:justify-center">
        <HeaderContent />
      </div>
    </nav>
  );
};

export default Header;
